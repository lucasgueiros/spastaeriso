import React from 'react';
import SimplerLinkSelect from '../../../../generics/SimplerLinkSelect.js';
import {LinkSelect} from '../../../../generics/all.js';

class Item extends React.Component {

  render () {
    return (
      <>
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
            <LinkSelect {...this.props} property="unit" options="units"/>
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
