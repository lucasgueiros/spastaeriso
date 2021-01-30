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
            entity={this.props.entity.input || ''}
            prefix={this.props.prefix + "input"}
            onChange={this.props.onChange}
            editing={this.props.editing}
            optionsList={this.props.optionsLists.inputs}/>
        </td>
        <td>
          <div>
            <input
              name={this.props.prefix + "quantity"}
              type="number"
              value={this.props.entity.quantity || {}}
              onChange={this.props.onChange}
              readOnly={!this.props.editing}></input>
          </div>
        </td>
        <td>
          <div>
            <SimplerLinkSelect
              entity={this.props.entity.unit || ''}
              prefix={this.props.prefix + "unit"}
              onChange={this.props.onChange}
              editing={this.props.editing}
              optionsList={this.props.optionsLists.units}/>
          </div>
        </td>
        <td>
          <div>
            <input name={this.props.prefix + "comment"} type="text" value={this.props.entity.comment || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
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
