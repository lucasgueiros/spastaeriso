import {OptionSelectField,DateTimeFieldWithNowButton,StandaloneDateTimeFieldWithNowButton,TextField,NumberField,LinkSelect,StandaloneTextField,ListRelationView,StandaloneLinkSelect,StandaloneNumberField,Navigator} from '../../generics/all.js';

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

      <h3>Eventos</h3>
      <ListRelationView {...props} property="events" row={<OrderEvent/>}>
        <th>Data e hora</th>
        <th>Statu</th>
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


    </>
  );
}

export function OrderItem (props) {return (
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
