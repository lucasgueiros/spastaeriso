import './PurchaseItem.css';
import React from 'react';
import {RelationView,LinkSelect,NumberField,TextField} from '../../../../generics/all.js';
import InventoryMovement from '../../inventory/InventoryMovement.js';

function SimplerInventoryMovement (props) {
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

class PurchaseItem extends React.Component {

  render () {
    return (
      <>
        <RelationView {...this.props} property="inventoryMovement" view={<SimplerInventoryMovement/>}/>
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
        <td>
          <div>
            <input name="subtotal" type="number" value={this.props.entity.pricePerUnit * this.props.entity.quantity} readOnly={true}></input>
          </div>
        </td>
      </>
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
