import {ListView,LinkSelect,NumberField,TextField,DateField} from '../../../generics/all.js';

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

export default function InventoryMovement (props) {
  return (
    <tr>
      {props.children}
      <td>
        <DateField {...props} property="date"/>
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
          <NumberField {...props} property="checkedQuantity" />
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

/*
<SimplerLinkSelect
  entity={this.props.entity.input || ''}
  prefix={this.props.prefix + "input"}
  onChange={this.props.onChange}
  editing={this.props.editing}
  optionsList={this.props.optionsLists.inputs}/>
  <SimplerLinkSelect
    entity={this.props.entity.unit || ''}
    prefix={this.props.prefix + "unit"}
    onChange={this.props.onChange}
    editing={this.props.editing}
    optionsList={this.props.optionsLists.units}/>
  */
