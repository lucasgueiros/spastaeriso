import React, {useState} from 'react';
import {
  Notifier,
  Datatable,
  useResource,
  GenDetails,
  Details,
  useSingleResource,
  TextField,
  YearField,
  StandaloneField,
  RelationSubform,
  ToManyRelationSubform,
  NumberField,
  StandaloneTextField,
  StandaloneYearField,
  Row,
  Cell,
  Table,
  ToManyRelationTable
} from '../../generics/all.js';

const pedidosComEntregas = {
  name: 'clientOrders',
    singular: 'Pedido',
    sufix: '',
    id: (e) => e.id,
    columns: [
      {
        type: 'oneToMany',
        property: 'deliveries',
        name: 'deliveryOrders',
        sufix: '',
        columns: []
      },
      {
        type: 'manyToOne',
        property: 'client',
        name: 'people',
        sufix: '',
        columns: []
      },
      {
        type: 'oneToMany',
        property: 'items',
        name: 'orderItems',
        sufix: '',
        columns: [
          {
            type: 'manyToOneLink',
            property: 'product',
            name: 'products',
            sufix: '',
            columns: [

            ]
          },
        ]
      },
      {
        type: 'manyToOne',
        property: 'forecastPaymentModality',
        name: 'transactionModalities',
        sufix: '',
        columns: [],
      },
      {
        type: 'oneToMany',
        property: 'payments',
        name: 'genericTransactions',
        sufix: '',
        columns: [],
      },
      {
        type: 'oneToMany',
        property: 'events',
        name: 'orderEvents',
        sufix: '',
        columns: [],
      }
    ]
};
// ### | HH:MM | NOME DO CLIENTE  | ENDEREÇO                    | PEDIDO       | PAG.    | ESTADO
const datatable = [
  {
    header: '###',
    render: ({p}) => <>{'data'}</>,
  },
  {
    header: 'Entrega',
    render: ({entity}) => <>{entity.deliveries[0].forecastedDeliveryTime.slice(11,15)}</>
  },
  {
    header: 'Nome',
    render: ({entity}) => <>{entity.client ? entity.client.name : '???'}</>
  },
  {
    header: 'Endereço',
    render: ({entity}) => <>{'data'}</>
  },
  {
    header: 'Pedido',
    render: ({entity}) => <>{'data'}</>
  },
  {
    header: 'Pagamento',
    render: ({entity}) => <>{'data'}</>
  },
];

export const ClientOrderSimplified = (props) => {
  const [data,setData] = useState(new Date().toISOString().substring(0,10));

  //let { id } = useParams();
  const [fetching, entities, dispatch, action] = useResource(props.http, pedidosComEntregas);
  //const [singleEntity, singleDispatch, readOnly, method] = useSingleResource(auth.http, id, resource, dispatch);

  return <div>
    <h3> Pedidos</h3>
    Data:
    <input type="date" value={data} onChange={(e) => setData(e.target.value)}/>
    <br/>
    <Datatable
        fetching={fetching}
        entities={entities}
        dispatch={dispatch}
        description={datatable} />
  </div>;
}
