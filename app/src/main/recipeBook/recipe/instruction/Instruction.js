import React from 'react';
import SimplerLinkSelect from '../../../../generics/SimplerLinkSelect.js';

class Instruction extends React.Component {

  render () {
    return (
      <tr>
        {this.props.children}
        <td>
          <div>
            <input
              name={this.props.prefix + "index"}
              type="number"
              value={this.props.entity.index}
              onChange={this.props.onChange}
              readOnly={!this.props.editing}></input>
          </div>
        </td>
        <td>
          <div>
            <input
              name={this.props.prefix + "text"}
              type="text"
              value={this.props.entity.text || ''}
              onChange={this.props.onChange}
              readOnly={!this.props.editing}></input>
          </div>
        </td>
      </tr>
    );
  }
}

export default Instruction;
