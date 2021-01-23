import './PurchaseItem.css';
import React from 'react';
import SimplerLinkSelect from '../../../../generics/SimplerLinkSelect.js';
import SimplerUnit from '../../../recipeBook/unit/SimplerUnit.js';

class PurchaseItem extends React.Component {

  render () {
    return (
      <tr class-name="purchase-item">
        <td>
          <SimplerLinkSelect
            entity={this.props.entity.inventoryMovement._links.input || {}}
            prefix={this.props.prefix + "inventoryMovement._links.input."}
            onChange={this.props.onChange}
            editing={this.props.editing}
            optionsList={this.props.inputOptionsList}/>
        </td>
        <td>
          <div>
            <input
              name={this.props.prefix + "inventoryMovement.quantity"}
              type="number"
              value={this.props.entity.inventoryMovement ? this.props.entity.inventoryMovement.quantity || {} : {}}
              onChange={this.props.onChange}
              readOnly={!this.props.editing}></input>
          </div>
        </td>
        <td>
          <div>
            <SimplerUnit
              entity={this.props.entity._links.unit || {}}
              prefix={this.props.prefix + "_links.unit"}
              onChange={this.props.onChange}
              editing={this.props.editing}
              unitsOptionsList={this.props.unitsOptionsList}/>
          </div>
        </td>
        <td>
          <div>
            <input name={this.props.prefix + "description"} type="text" value={this.props.entity.description || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
          </div>
        </td>
        <td>
          <div>
            <input name={this.props.prefix + "brand"} type="text" value={this.props.entity.brand || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
          </div>
        </td>
        <td>
          <div>
            <input name={this.props.prefix + "pricePerUnit"} type="number" value={this.props.entity.pricePerUnit || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
          </div>
        </td>
      </tr>
    );
  }
}

//
//<input
//name={this.props.prefix + "unit.name"}
//type="text"
//value={this.props.entity.unit.name || ''}
//onChange={this.props.onChange}
//readOnly={!this.props.editing} />

export default PurchaseItem;
