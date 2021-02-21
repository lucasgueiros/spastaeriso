import {ListView,LinkSelect,NumberField,TextField,DateTimeField} from '../../../generics/all.js';

export function InventoryMovementListView (props) {
  return (
    <ListView entity="inventoryMovements" view={<InventoryMovement/>}>
      <th>Data</th>
      <th>Insumo</th>
      <th>Qtd.</th>
      <th>Qtd. Conf.</th>
      <th>U.</th>
      <th>Comentários</th>
    </ListView>
  );
}

export function InventoryMovement (props) {
  return (
    <tr>
      {props.children}
      <td>
        <DateTimeField {...props} property="date"/>
      </td>
      <td>
        <LinkSelect {...props} property="input" options="inputs"/>
      </td>
      <td>
        <div>
          <NumberField {...props} property="quantity" />
        </div>
      </td>
      <td>
        <div>
          <NumberField {...props} property="checkedBalance" />
        </div>
      </td>
      <td>
        <div>
          <LinkSelect {...props} property="unit" options="units"/>
        </div>
      </td>
      <td>
        <div>
          <TextField {...props} property="comment" />
        </div>
      </td>
    </tr>
  );
}
