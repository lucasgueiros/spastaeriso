import {MultipleComponentSelect,Events,SufixOptionsList,StandaloneTextareaField,StandaloneLinkSelect} from '../../generics/all.js';

export function Delivery (props) {return (
  <>
    <SufixOptionsList {...props} options="deliverymen" identifier="withPersonOnly" projection="withPersonOnly">
      <StandaloneLinkSelect {...props} property="deliveryman" label="Entregador" options="deliverymen" restricted="withPersonOnly" nameGen={(deliveryman) => deliveryman.person.name}/>
    </SufixOptionsList>

    <Events {...props} property="events">
      <option value="CALLED">Chamado</option>
      <option value="EXITED">Saiu</option>
      <option value="CAME_BACK">Retornou</option>
    </Events>

    <h4>Pedidos</h4>
    <SufixOptionsList {...props} options="deliveryOrders" projection="withId" identifier="withId">
      <MultipleComponentSelect {...props}
        key={props.entity}
        property="orders"
        view={<SimplestDeliveryOrder/>}
        options="deliveryOrders"
        restricted="withId"
        separator={<br/>}
        />
    </SufixOptionsList>

    <StandaloneTextareaField {...props} property="comment" label="Comentários"/>
  </>
);}

export function SimplestDeliveryOrder(props) {return (
  <>{props.children}#{props.entity.id}</>
);}
