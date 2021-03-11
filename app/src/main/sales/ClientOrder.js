import {InListRelationView,RadioComponentSelect,OptionSelectField,DateTimeFieldWithNowButton,StandaloneDateTimeFieldWithNowButton,TextField,NumberField,LinkSelect,StandaloneTextField,ListRelationView,StandaloneLinkSelect,StandaloneNumberField,Navigator,NavigatorRelationView} from '../../generics/all.js';

import {Transaction} from '../accounting/Transaction.js';

export function ClientOrderNavigator(props) {return (
  <div>
    <Navigator {...props}  entity="clientOrders" view={<ClientOrder/>}/>
  </div>
);}

export function ClientOrder(props) {
  return (
    <>
      <StandaloneLinkSelect {...props} property="client" label="Cliente" options="people"/>
      <StandaloneTextField {...props} property="comments" label="Comentários"/>

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
        <th>Produto</th>
        <th>Quantidade</th>
        <th>Comentários</th>
      </ListRelationView>

      <h3>Entregas</h3>
      <NavigatorRelationView {...props} property="deliveries" view={<DeliveryOrder/>}/>

      <StandaloneTextField {...props} property="comments" label="Comentários"/>


    </>
  );
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
        <LinkSelect {...props} property="product" options="products"/>
      </td>
      <td>
        <NumberField {...props} property="quantity"/>
      </td>
      <td>
        <TextField {...props} property="comments"/>
      </td>
    </tr>
    <tr>
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

export function DeliveryOrder (props) {return (
  <div>
    <StandaloneNumberField {...props} property="index" label="Posição"/>

    Endereço de entrega:
    <RadioComponentSelect {...props} property="deliveryAddress" view={<SimplerAddress/>} options="addresses" separator={<br/>}/>

    <StandaloneNumberField {...props} property="deliveryPrice" label="Valor da entrega"/>

    <StandaloneDateTimeFieldWithNowButton {...props} property="calculatedDeliveryTime" label="Tempo de entrega calculado"/>
    <StandaloneDateTimeFieldWithNowButton {...props} property="forecastedDeliveryTime" label="Tempo de entrega previsto"/>
    <StandaloneDateTimeFieldWithNowButton {...props} property="requestedDeliveryTime" label="Tempo de entrega solicitado"/>

    <ListRelationView {...props} property="events" row={<DeliveryOrderEvent/>}>
      <th>Data e hora</th>
      <th>Status</th>
      <th>Comentários</th>
    </ListRelationView>

  </div>
);}

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
