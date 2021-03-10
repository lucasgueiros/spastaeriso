import {PurchaseItem} from './Purchase';
import {ListView,NumberField} from '../../../generics/all.js';

export function PurchaseItemStatement (props) {
  return (
    <ListView {...props} entity="purchaseItems" view={<PurchaseItem/>}>
      <th>Data</th>
      <th>Insumo</th>
      <th>Qtd</th>
      <th>Uni</th>
      <th>Desc</th>
      <th>Marca</th>
      <th>R$/u</th>
      <th>Subtotal</th>
      <th>Preço médio</th>
    </ListView>
  );
}
