import React from 'react';
import SimplerLinkSelect from '../../../generics/SimplerLinkSelect.js';

class Entry extends React.Component {

  render() {
    return (
      <>
        <td>
          <SimplerLinkSelect
            entity={this.props.entity.account || ""}
            prefix={this.props.prefix+"account"}
            onChange={this.props.onChange}
            editing={this.props.editing}
            optionsList={this.props.accountsOptionsList}/>
        </td>
        <td>
          <input
            name={this.props.prefix + "value"}
            type="number"
            value={this.props.entity.value}
            onChange={this.props.onChange}
            readOnly={!this.props.editing}></input>
        </td>
      </>
    );
  }

}

export default Entry;
