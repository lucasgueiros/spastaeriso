import './SimplerLinkSelect.css';
import React from 'react';

class SimplerLinkSelect extends React.Component {
  render () {
    return (
      <div class-name="simpler-link-select">
        <select
          name={this.props.prefix + "href"}
          value={this.props.entity.href || ''}
          onChange={this.props.onChange}
          readOnly={!this.props.editing}>
          {this.props.optionsList.map((entity, key) =>
            <option key={key} value={entity._links.self.href}>{entity[this.props.nameField || 'name']}</option>
          )}
        </select>
      </div>
    );
  }

}

export default SimplerLinkSelect;
