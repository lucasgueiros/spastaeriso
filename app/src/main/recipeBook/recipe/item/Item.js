import React from 'react';
import {LinkSelect} from '../../../../old_generics/all.js';

class Item extends React.Component {

  render () {
    return (
      <tr>
        {this.props.children}
        <td>
          <LinkSelect {...this.props} property="input" options="inputs"/>
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
            <LinkSelect {...this.props} property="unit" options="units" nameField="symbol"/>
          </div>
        </td>
        <td>
          <div>
            <input name={this.props.prefix + "comment"} type="text" value={this.props.entity.comment || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
          </div>
        </td>
      </tr>
    );
  }
}

export default Item;
