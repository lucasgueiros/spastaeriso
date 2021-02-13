import React from 'react';
import SimplerLinkSelect from '../../../../generics/SimplerLinkSelect.js';

class Item extends React.Component {

  render () {
    return (
      <>
        <td>
          <SimplerLinkSelect
            entity={this.props.entity.input || ''}
            prefix={this.props.prefix + "input"}
            onChange={this.props.onChange}
            editing={this.props.editing}
            optionsList={this.props.optionsLists.inputs || []}/>
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
              optionsList={this.props.optionsLists.units || []}/>
          </div>
        </td>
        <td>
          <div>
            <input name={this.props.prefix + "comment"} type="text" value={this.props.entity.comment || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
          </div>
        </td>
      </>
    );
  }
}

export default Item;
