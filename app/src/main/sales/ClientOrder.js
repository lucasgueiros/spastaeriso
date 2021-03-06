import {SufixOptionsList,StandaloneDateField,CheckboxField,MultipleComponentSelect,RestrictOptionsList,InListRelationView,RadioComponentSelect,OptionSelectField,DateTimeFieldWithNowButton,StandaloneDateTimeFieldWithNowButton,TextField,NumberField,LinkSelect,StandaloneTextField,ListRelationView,StandaloneLinkSelect,StandaloneNumberField,Navigator,NavigatorRelationView} from '../../old_generics/all.js';
import React,{useState,useEffect} from 'react';
import {Transaction} from '../accounting/Transaction.js';

const { REACT_APP_API_BASE_URL: baseUrl} = process.env;

export function ClientOrderNavigator(props) {

  const [data,setData] = useState(new Date().toISOString().substring(0,10));
  return (
  <div>
    Data:
    <input type="date" value={data} onChange={(e) => setData(e.target.value)}/>
    <br/>
    <h2>Pedidos</h2>
    <Navigator {...props} theData={data} entity="clientOrders" view={<ClientOrder/>} sufix={'/search/findByServeDate?serveDate=' + data}/>
  </div>
);}

export function ClientOrder(props) {
  const [contatos,setContatos] = useState([]);

  const fetchContatos = () => {
    if(props.entity._client){
      props.http.get(props.entity._client._links.contacts.href).then((r) => setContatos(r.data._embedded.contacts), (e) => console.log(e));
    }
  };

  useEffect(()=> fetchContatos(),[props.entity]);
  return (
    <>
      <SelecionarCliente {...props}/><br/>

      <h3>Contatos</h3>
      {
        contatos.map(c => <> - {c.name} - {c.contact} <br/></>)
      }
      <button onClick={(e) => fetchContatos()}>Atualizar</button>
      <AddContato {...props} fetchContatos={fetchContatos}/>

      <StandaloneTextField {...props} property="comments" label="Comentários"/>
      <StandaloneDateField {...props} property="serveDate" label="Data da entrega" default={props.theData}/>

      <StandaloneLinkSelect {...props} property="clerk" label="Atendente" options="people"/>

      <h3>Eventos</h3>
      <ListRelationView {...props} property="events" row={<OrderEvent/>}>
        <th>Data e hora</th>
        <th>Status</th>
        <th>Comentários</th>
      </ListRelationView>

      <h3>Previsão de pagamento</h3>
      <StandaloneLinkSelect {...props} property="forecastPaymentModality" label="Forma de pagamento" options="transactionModalities"/>
      <StandaloneNumberField {...props} property="forecastChangeTo" label="Troco para"/>

      <h3>Pagamento</h3>
      <ListRelationView {...props} property="payments" row={<Transaction/>} >
        <th>Data</th>
        <th>Modalidade</th>
        <th colspan="2">Entradas</th>
        <th>Comentários</th>
      </ListRelationView>

      <h3>Itens</h3>
      <ListRelationView {...props} property="items" row={<OrderItem/>}>
        <th>#</th>
        <th>Produto</th>
        <th>Quantidade</th>
        <th>Comentários</th>
        <th></th>
        <th></th>
        <th></th>
      </ListRelationView>

      <h4>Descontos</h4>
      <ListRelationView {...props} property="modifiers" row={<OrderPriceModifier/>}>
        <th>Descrição</th>
        <th>Valor</th>
        <th>% ?</th>
      </ListRelationView>

      <h3>Entregas</h3>
      <AddEndereco {...props}/>
      <RestrictOptionsList {...props} key={props.entity._links ? props.entity._links.self.href : ""} property="items" options="orderItems" identifier="of_order" projection="withId">
        <RestrictOptionsList {...props} key={props.entity.client} key2={props.entity} relation="client" property="addresses" options="addresses" identifier="of_client">
          <NavigatorRelationView {...props}  property="deliveries" view={<DeliveryOrder/>} />
        </RestrictOptionsList>
      </RestrictOptionsList>

      <StandaloneTextField {...props} property="comments" label="Comentários"/>

      <h3>Resumo</h3>
      <Resumo {...props}/>

    </>
  );
}

const Resumo = (props) => {
  const [primeiraParte, setPrimeiraParte] = useState('');
  const [segundaParte, setSegundaParte] = useState('');
  const [maps, setMaps] = useState('');

  let Resuminho = (props) => <p style={{'white-space': 'pre-line'}}>
      {primeiraParte}
      <a href={maps} target="_blank" >Abrir no Google Maps</a><br/>
      {segundaParte}
    </p>;
  if(primeiraParte == '' || segundaParte == '' || maps == '') {
    Resuminho = (props) => <></>;
  }

  return <>
      <Resuminho/>
      <button onClick={async () => {
        let theResumo = 'Pedido no ' + (props.entity._links.self.href.match("[\s\S]+?\/([0-9]+)$")[1]) + '\n\n';
        theResumo = theResumo + 'Cliente: ' + props.entity._client.name + '\n';
        let endereco = props.entity.deliveries[0]._deliveryAddress;
        let bairro = (await props.http.get(endereco._links.neighborhood.href)).data.name;
        theResumo = theResumo + 'Endereço de entrega: ' + endereco.street + ', ' + endereco.number + ', ' + endereco.complement + ', ' + bairro + '\n';
        theResumo = theResumo + 'Comentários: ' + endereco.comments + '\n';

        // URL do Google Maps
        const enderecoCompleto = endereco.street + ', ' + endereco.number + ', ' + endereco.complement + ', ' + bairro + ', Garanhuns, PE';
        setPrimeiraParte(theResumo);
        setMaps('https://www.google.com/maps/search/?api=1&query=' + enderecoCompleto.replaceAll(' ','+'));
        theResumo = '';
        let subtotal = 0;
        for(let i=0;i < props.entity.items.length; i++) {
          let product = (await props.http.get(props.entity.items[i].product)).data;
          let subtotalItem = product.price * props.entity.items[i].quantity;
          theResumo = theResumo + product.name + ' - ' + subtotalItem + '\n';
          subtotal = subtotal + subtotalItem;
        }
        theResumo = theResumo + 'Subtotal - R$' + subtotal + '\n';
        let subtotalEntregas = 0;
        for(let i=0;i < props.entity.deliveries.length; i++){
          let entrega = props.entity.deliveries[i];
          subtotalEntregas += entrega.deliveryPrice;
        }
        theResumo = theResumo + 'Frete - ' + subtotalEntregas + '\n';

        let subtotalDescontos = 0;
        for(let i=0;i < props.entity.modifiers.length; i++){
          let desconto = props.entity.modifiers[i];
          if(desconto.percentage) {
            subtotalDescontos += (subtotal * (desconto.quantity/100));
          } else {
            subtotalDescontos += desconto.quantity;
          }
        }
        theResumo = theResumo + 'Descontos - ' + subtotalDescontos + '\n';
        let total = subtotal + subtotalEntregas - subtotalDescontos;
        theResumo = theResumo + 'Total - ' + total + '\n';
        setSegundaParte(theResumo);
      }}>Resumir</button>
      <button onClick={() => {navigator.clipboard.writeText(primeiraParte + '\nMaps: ' + maps + '\n' + segundaParte)}}>Copiar resumo para WhatsApp</button><br/>
  </>;
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

const SelecionarCliente = (props) => {
  const [nomeSelecionado,setNomeSelecionado] = useState((props.entity._client ? props.entity._client.name : 'Nenhum') || 'Nenhum');
  const [nome,setNome] = useState('');
  const [message, setMessage] = useState('');

  const setCliente = (cliente) => {
    setNomeSelecionado(cliente.name);
    props.onChange({
      target: {
        name: 'client',
        value: cliente._links.self.href,
      }
    });
    props.onChange({
      target: {
        name: '_client',
        value: cliente,
      }
    });
  };

  useEffect(() => {
    if(props.addOptionsList) {
      props.addOptionsList('people', 'name');
    }
  },[]);

  if(!props.editing) {
    return <>Cliente: {nomeSelecionado}<br/></>;
  }
  if(props.optionsLists == undefined || props.optionsLists.contactChannels == undefined){
    return <>Carregando...</>;
  }

  //let distance = props.optionsLists.people.map((s) => editDistance(s.name, nome));
  let clientes = props.optionsLists.people.sort((c1,c2) => editDistance(c1.name,nome) - editDistance(c2.name,nome));
  let addButton = <></>;

  return <>
    Cliente selecionado: {nomeSelecionado}<br/>
    Pesquisar: <input name="nome" value={nome} onChange={(e) => {
      setNome(e.target.value)
    }} /><br/>
    {clientes.map((c,i) =>{
        if(i>9) return <></>;
        return <> - {c.name} <button onClick={(e) => setCliente(c)}>Selecionar</button><br/></>;
      })
    }
    <button onClick={(event) => props.http.post('/people',{name: nome}).then((response) => {
      setMessage('Criado com sucesso');
      setCliente(response.data);
    },(error) => setMessage(error))}>Adicionar</button>

  </>;
}

const AddEndereco = (props) => {
  const [show, setShow] = useState(false);

  // endereco basico
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [reference, setReference] = useState('');

  // Option for Neighborhood
  useEffect(() => {
    if(props.addOptionsList) {
      props.addOptionsList('neighborhoods', 'name');
    }
  }, []);

  if(!props.editing) {
    return <></>
  }
  if(!show) {
    return <div><button onClick={(e) => setShow(true)}>Novo endereço</button></div>;
  }
  if(props.optionsLists == undefined || props.optionsLists.addresses == undefined){
    return <>Carregando...</>;
  }
  return <div>
    <label htmlFor="street">Rua</label>
    <input name="street" type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
    <br/>
    <label htmlFor="neighborhood">Bairro</label>
    <select
      value={neighborhood}
      onChange={(e) => setNeighborhood(e.target.value)}>
      {props.optionsLists.neighborhoods.map((entity, key) =>
        <option key={key} value={entity._links.self.href}>
          {entity.name}
        </option>
      )}
    </select>
    <br/>
    <label htmlFor="number">No</label>
    <input name="number" type="text" value={number} onChange={(e) => setNumber(e.target.value)} />
    <br/>
    <label htmlFor="complement">Complemento</label>
    <input name="complement" type="text" value={complement} onChange={(e) => setComplement(e.target.value)} />
    <br/>
    <label htmlFor="reference">Ponto de Referência</label>
    <input name="reference" type="text" value={reference} onChange={(e) => setReference(e.target.value)} />
    <br/>
    <button onClick={(e) => {
      // salvar o endereço isolado
      props.http.post('/addresses', {
        street: street,
        neighborhood: neighborhood,
        number: number,
        complement: complement,
        reference: reference,
      }).then((r) => {
        const url = r.data._links.self.href;
        // recuperar a lista de endereços do Cliente
        props.http.get(props.entity._client._links.addresses.href)
          .then((r) => {
            const urls = [...r.data._embedded.addresses.map((a) => a._links.self.href),url];
            const clientUrl = props.entity._client._links.self.href;
            props.http.patch(clientUrl, {addresses: urls}).then((r) => {
              setShow(false);
            }, (e) => {
              console.log(e);
            })
          }, (e) => console.log(e))
      }, (e) => {
        console.log(e);
      });
    }}>Salvar endereço</button>
  </div>;
}

const AddContato = (props) => {
  const [show, setShow] = useState(false);

  // endereco basico
  const [name, setName] = useState('Principal');
  const [contact, setContact] = useState('');
  const [channel, setChannel] = useState(baseUrl + '/contactChannels/43');

  // Option for Channel
  useEffect(() => {
    if(props.addOptionsList) {
      props.addOptionsList('contactChannels', 'name');
    }
  }, []);

  if(!props.editing) {
    return <></>
  }
  if(!show) {
    return <div><button onClick={(e) => setShow(true)}>Novo contato</button></div>;
  }
  if(props.optionsLists == undefined || props.optionsLists.contactChannels == undefined){
    return <>Carregando...</>;
  }
  return <div>
    <label htmlFor="name">Marcador</label>
    <input name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
    <br/>
    <label htmlFor="contact">Contato</label>
    <input name="contact" type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
    <br/>
    <label htmlFor="channel">Canal</label>
    <select
      value={channel}
      onChange={(e) => setChannel(e.target.value)}>
      {props.optionsLists.contactChannels.map((entity, key) =>
        <option key={key} value={entity._links.self.href}>
          {entity.name}
        </option>
      )}
    </select>
    <br/>
    <button onClick={(e) => {
      // salvar o endereço isolado
      props.http.post('/contacts', {
        name: name,
        contact: contact,
        channel: channel
      }).then((r) => {
        const url = r.data._links.self.href;
        // recuperar a lista de contatos do Cliente
        props.http.get(props.entity._client._links.contacts.href)
          .then((r) => {
            const urls = [...r.data._embedded.contacts.map((a) => a._links.self.href),url];
            const clientUrl = props.entity._client._links.self.href;
            props.http.patch(clientUrl, {contacts: urls}).then((r) => {
              setShow(false);
              props.fetchContatos();
            }, (e) => {
              console.log(e);
            })
          }, (e) => console.log(e))
      }, (e) => {
        console.log(e);
      });
    }}>Salvar contato</button>
  </div>;
}

export function SimplerOrderItem (props) {return (
  <>
      {props.children}
      <td>
        <LinkSelect {...props} property="product" options="products"/>
      </td>
      <td>
        <NumberField {...props} property="quantity"/>
      </td>
      <td>
        <TextField {...props} property="comments"/>
      </td>
  </>
)}

export function OrderItem (props) {
  return (
  <>
    <tr>
      {props.children}
      <td>
        {props.entity.id}
      </td>
      <td>
        <LinkSelect {...props} property="product" options="products"/>
      </td>
      <td>
        <NumberField {...props} property="quantity"/>
      </td>
      <td>
        <TextField {...props} property="comments"/>
      </td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th>Subitens</th>
      <th>Produto</th>
      <th>Quantidade</th>
      <th>Comentários</th>
    </tr>
    <InListRelationView {...props} property="subItems" before="3" after="3" view={<SimplerOrderItem/>}/>
    <tr>
      <th></th>
      <th></th>
      <th></th>
      <th></th>

      <th>Eventos</th>
      <th>Data e hora</th>
      <th>Status</th>
      <th>Comentários</th>
    </tr>
    <InListRelationView {...props} property="events" before="3" after="3" view={<OrderItemEvent/>}/>
  </>
  );
}

export function OrderEvent(props) {return (
  <tr>
    {props.children}
    <td>
      <DateTimeFieldWithNowButton {...props} property="datetime"/>
    </td>
    <td>
      <OptionSelectField {...props} property="status">
        <option value="STARTED">Iniciado</option>
        <option value="COMPLETED">Completo</option>
        <option value="CANCELLED">Cancelado</option>
        <option value="UNCANCELLED">Descancelado</option>
        <option value="APPROVED">Aprovado</option>
        <option value="REJECTED">Rejeitado</option>
        <option value="STARTED_PREPARING">Preparando</option>
      </OptionSelectField>
    </td>
    <td>
      <NumberField {...props} property="comments"/>
    </td>
  </tr>
);}

export function OrderItemEvent(props) {return (
  <>
    {props.children}
    <td>
      <DateTimeFieldWithNowButton {...props} property="datetime"/>
    </td>
    <td>
      <OptionSelectField {...props} property="status">, , ,
        <option value="UNREADY">Não preparado</option>
        <option value="PREPARING">Preparando</option>
        <option value="READY">Pronto</option>
        <option value="CANCELLED">Cancelado</option>
      </OptionSelectField>
    </td>
    <td>
      <NumberField {...props} property="comments"/>
    </td>
  </>
);}

export function DeliveryOrder (props) {
  const [deliveryman,setDeliveryman] = useState("");
  const [message,setMessage] = useState("");
  let fetch = <button onClick={(e) => props.fetchAgain_addresses_of_client()}>Atualizar lista de endereços</button>;
  if(!props.editing) {
    fetch=<></>;
  }
  return (
  <div>
    {fetch}
    <br/>
    Identificador: #{props.entity.id}
    <StandaloneNumberField {...props} property="index" label="Posição"/>

    Endereço de entrega:

    <RadioComponentSelect {...props} property="deliveryAddress" view={<SimplerAddress/>} options="addresses" restricted="of_client" separator={<br/>} useDefault={true}/>
    <label htmlFor={props.prefix + 'deliveryPrice'}>Valor de entrega: </label>
    <input
    id="deliveryPriceInput"
    name={props.prefix + 'deliveryPrice'}
    step="any"
    type="number" value={props.entity.deliveryPrice == null ? '' : props.entity.deliveryPrice} onChange={props.onChange} readOnly={!props.editing}></input>
    <button onClick={() => {
      props.http.get(props.entity.deliveryAddress)
      .then(
        (r1) => props.http.get(r1.data._links.neighborhood.href)
                  .then(
                    (r2) =>  props.http.get('deliveryPricesByNeighborhood/search/findFirstByNeighborhoodOrderByDateDesc?neighborhood='+r2.data._links.self.href)
                              .then(
                                (r) => props.onChange({target: { type: 'number', value: r.data.price , name: props.prefix + 'deliveryPrice'}}))
                  )
      )

    }}>Calcular</button>

    <StandaloneDateTimeFieldWithNowButton {...props} property="calculatedDeliveryTime" label="Tempo de entrega calculado"/>
    <StandaloneDateTimeFieldWithNowButton {...props} property="forecastedDeliveryTime" label="Tempo de entrega previsto"/>
    <StandaloneDateTimeFieldWithNowButton {...props} property="requestedDeliveryTime" label="Tempo de entrega solicitado"/>

    <ListRelationView {...props} property="events" row={<DeliveryOrderEvent/>}>
      <th>Data e hora</th>
      <th>Status</th>
      <th>Comentários</th>
    </ListRelationView>

    <MultipleComponentSelect {...props}
      key={props.entity}
      property="items"
      view={<SimplestOrderItem/>}
      options="orderItems"
      restricted="of_order"
      separator={<br/>}
      selectAllButton="Selecionar todos"
      />
    <SufixOptionsList {...props} options="deliverymen" identifier="withPersonOnly" projection="withPersonOnly">
      <StandaloneLinkSelect {...props}
        entity={{deliveryman: deliveryman}}
        property="deliveryman"
        label="Entregador"
        options="deliverymen"
        restricted="withPersonOnly"
        editing={true}
        onChange={e => setDeliveryman(e.target.value)}
        nameGen={(deliveryman) => deliveryman.person.name}/>
    </SufixOptionsList>
    <button onClick={(e) => {
      var today = new Date();
      today.setHours(today.getHours()-3);
      today = today.toJSON();
      props.http.post("deliveryEvents", {
        datetime: today,
        status: 'EXITED',
        comments: ''
      }).then((r) => {
        props.http.post("deliveries", {
          events: [r.data._links.self.href],
          deliveryman: deliveryman,
          date: new Date().toISOString().substring(0,10),
          comment: '',
          orders: [props.entity._links.self.href],
        }).then((r1) => setMessage("Evento registrado"), e=> console.log(e));
      }, e => console.log(e));
    }}>Saiu para entrega</button>
    {message}
  </div>
);}

export class SimplestOrderItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: "?"
    };
  }

  componentDidMount() {
    this.props.http(this.props.entity._links.product.href).then((response)=> {
      this.setState({
        product: response.data.name
      });
    }, (error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <>
        {this.props.children} {this.props.entity.quantity}x {this.state.product} #{this.props.entity.id}
        <br/>
      </>
    );
  }
}

export function SimplerAddress (props) {
  return (
    <><br/>{props.children}{props.entity.street}, {props.entity.number}, {props.entity.neighborhood}</>
  );
}

export function DeliveryOrderEvent (props){return (
  <tr>
    {props.children}
    <td>
      <DateTimeFieldWithNowButton {...props} property="datetime"/>
    </td>
    <td>
      <OptionSelectField {...props} property="status">
        <option value="REQUESTED">Requisitado</option>
        <option value="APPROVED">Aprovado</option>
        <option value="COMMUNICATED">Comunicado</option>
        <option value="ACCEPTED">Aceito</option>
        <option value="CONFIRMED">Confirmado</option>
        <option value="CREATED">Criado</option>
        <option value="READY">Pronot</option>
        <option value="ARRIVIED">Entregue</option>
      </OptionSelectField>
    </td>
    <td>
      <NumberField {...props} property="comments"/>
    </td>
  </tr>
);}

export function OrderPriceModifier(props){return (
  <tr>
    {props.children}
    <td><TextField {...props} property="description"/></td>
    <td><NumberField {...props} property="quantity"/></td>
    <td><CheckboxField {...props} property="percentage"/></td>
  </tr>

);}
