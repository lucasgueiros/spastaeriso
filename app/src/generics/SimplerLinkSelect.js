import './SimplerLinkSelect.css';
import React from 'react';

class SimplerLinkSelect extends React.Component {
  render () {

    return (
        <select
          name={this.props.prefix}
          value={this.props.entity || 'none'}
          onChange={this.props.onChange}
          disabled={!this.props.editing} >
          {this.props.optionsList.map((entity, key) =>
            <option key={key} value={entity._links.self.href || "none"}>{entity[this.props.nameField || 'name']}</option>
          )}
          <option key={-1} value={"none"}>Nenhuma</option>
        </select>
    );
  }

}

export default SimplerLinkSelect;
