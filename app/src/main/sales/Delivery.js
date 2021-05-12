import {ListRelationView,TextField, NumberField, CheckboxField, FilterOptionsList,StandaloneDateField,MultipleComponentSelect,Events,SufixOptionsList,StandaloneTextareaField,StandaloneLinkSelect} from '../../generics/all.js';

function filterByDate(o, date) {
  let r = false;
  if(o.calculatedDeliveryTime) {
    let sliced = o.calculatedDeliveryTime.slice(0,10);
    if(date == sliced) {
      r = true;
    }
  }
  if (!r && o.forecastedDeliveryTime) {
    let sliced = o.forecastedDeliveryTime.slice(0,10);
    if(date == sliced) {
      r = true;
    }
  }
  if (!r && o.requestedDeliveryTime) {
    let sliced = o.requestedDeliveryTime.slice(0,10);
    if(date == sliced) {
      r = true;
    }
  }
  return r;

}

export function Delivery (props) {return (
  <>
    <SufixOptionsList {...props} options="deliverymen" identifier="withPersonOnly" projection="withPersonOnly">
      <StandaloneLinkSelect {...props} property="deliveryman" label="Entregador" options="deliverymen" restricted="withPersonOnly" nameGen={(deliveryman) => deliveryman.person.name}/>
    </SufixOptionsList>

    <StandaloneDateField {...props} property="date" label="Data"/>

    <Events {...props} property="events">
      <option value="CALLED">Chamado</option>
      <option value="EXITED">Saiu</option>
      <option value="CAME_BACK">Retornou</option>
    </Events>

    <h4>Pedidos</h4>

    <SufixOptionsList {...props} options="deliveryOrders" projection="withId" identifier="withId">
      <FilterOptionsList {...props} options="deliveryOrders_withId" filter={(o) => filterByDate(o,props.entity.date)} identifier="onDate">
        <MultipleComponentSelect {...props}
          key={props.entity}
          property="orders"
          view={<SimplestDeliveryOrder/>}
          options="deliveryOrders"
          restricted="withId_onDate"
          separator={<br/>}
          />
      </FilterOptionsList>
    </SufixOptionsList>

    <h4>Descontos</h4>
    <ListRelationView {...props} property="modifiers" row={<OrderPriceModifier/>}>
      <th>Valor</th>
      <th>% ?</th>
      <th>Inclui frete?</th>
      <th>Descrição</th>
    </ListRelationView>

    <StandaloneTextareaField {...props} property="comment" label="Comentários"/>
  </>
);}

export function SimplestDeliveryOrder(props) {return (
  <>{props.children}#{props.entity.id}</>
);}

export function OrderPriceModifier(props){return (
  <tr>
    {props.children}
    <td><NumberField {...props} property="quantity"/></td>
    <td><CheckboxField {...props} property="percentage"/></td>
    <td><CheckboxField {...props} property="applyOnDeliveryFee"/></td>
    <td><TextField {...props} property="description"/></td>
  </tr>

);}
