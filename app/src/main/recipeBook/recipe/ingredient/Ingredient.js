import React from 'react';
import SimplerLinkSelect from '../../../../generics/SimplerLinkSelect.js';
import Item from '../item/Item.js';

class Ingredient extends React.Component {

  render () {
    return (
      <>
        <td>
          <div>
            <input
              name={this.props.prefix + "index"}
              type="number"
              value={this.props.entity.index || {}}
              onChange={this.props.onChange}
              readOnly={!this.props.editing}></input>
          </div>
        </td>
        <Item
          entity={this.props.entity}
          prefix={this.props.prefix}
          editing={this.props.editing}
          onChange={this.props.onChange}
          optionsLists={this.props.optionsLists}/>
      </>
    );
  }
}

export default Ingredient;
