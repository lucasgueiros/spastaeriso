import './SimplerUnit.css';
import React from 'react';
import axios from 'axios';

class SimplerUnit extends React.Component {
  render () {
    return (
      <div class-name="simpler-unit">
        <select
          name={this.props.prefix + "href"}
          value={this.props.entity.href || ''}
          onChange={this.props.onChange}
          readOnly={!this.props.editing}>
          {this.props.unitsOptionsList.map((unit, key) =>
            <option key={key} value={unit._links.self.href}>{unit.name}</option>
          )}
        </select>
      </div>
    );
  }

}

export default SimplerUnit;
