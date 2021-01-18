import './PurchaseItem.css';
import React from 'react';
import SimplerInput from '../../../recipeBook/input/SimplerInput.js';

class PurchaseItem extends React.Component {

  render () {
    return (
      <tr class-name="purchase-item">
        <td>
          <SimplerInput
            entity={this.props.entity.inventoryMovement.input || {}}
            prefix={this.props.prefix + "inventoryMovement.input."}
            onChange={this.props.onChange}
            editing={this.props.editing}/>
        </td>
        <td>
          <div>
            <input
              name={this.props.prefix + "inventoryMovement.quantity"}
              type="number"
              value={this.props.entity.inventoryMovement.quantity || 0}
              onChange={this.props.onChange}
              readOnly={!this.props.editing}></input>
          </div>
        </td>
        <td>
          <div>
            <input name={this.props.prefix + "unit.name"} type="text" value={this.props.entity.unit.name || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
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

export default PurchaseItem;
