import {Navigator,ListRelationView,StandaloneTextField,StandaloneDateField} from '../../../generics/all.js';
import {InventoryMovement} from './InventoryMovement.js';

export function ProducedProductNavigator (props) {
  return (
    <Navigator {...props}  entity="pruducedProducts" view={<ProducedProduct/>} />
  );
}

export default function ProducedProduct (props) {
  return (
    <>
      <StandaloneDateField {...props} property="date" label="Data"/>
      <ListRelationView {...props} property="movements" row={<InventoryMovement/>}>
        <th>Data</th>
        <th>Insumo</th>
        <th>Qtd.</th>
        <th>Qtd. Conf.</th>
        <th>U.</th>
        <th>Comentários</th>
      </ListRelationView>
      <StandaloneTextField {...props} property="comment" label="Comentáiros"/>
    </>
  );
}

/*

  */
