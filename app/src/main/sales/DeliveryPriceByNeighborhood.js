import {ListView,LinkSelect,DateField,NumberField} from '../../generics/all.js';

export function DeliveryPricesByNeighborhoodListView (props){return (<>
  <h3>Preços de entrega por bairro</h3>
  <ListView {...props} entity="deliveryPricesByNeighborhood" view={<DeliveryPricesByNeighborhood/>}>
    <th>Bairro</th>
    <th>Data</th>
    <th>Preço</th>
  </ListView>
</>)}
export function DeliveryPricesByNeighborhood (props) {return (<>
  <tr>
    {props.children}
    <td>
      <LinkSelect {...props} property="neighborhood" options="neighborhoods" />
    </td>
    <td>
      <DateField {...props} property="date"/>
    </td>
    <td>
      <NumberField {...props} property="price"/>
    </td>
  </tr>
</>);}
