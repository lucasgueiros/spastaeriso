import {LinkSelect,NumberField,TextField} from '../../../generics/all.js';

export default function InventoryMovement (props) {
  return (
    <>
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
          <LinkSelect {...props} property="unit" options="units"/>
        </div>
      </td>
      <td>
        <div>
          <TextField {...props} property="comment" />
        </div>
      </td>
    </>
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
