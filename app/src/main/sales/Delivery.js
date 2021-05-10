import {FilterOptionsList,StandaloneDateField,MultipleComponentSelect,Events,SufixOptionsList,StandaloneTextareaField,StandaloneLinkSelect} from '../../generics/all.js';

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

    <StandaloneTextareaField {...props} property="comment" label="Comentários"/>
  </>
);}

export function SimplestDeliveryOrder(props) {return (
  <>{props.children}#{props.entity.id}</>
);}
