import './SimplerUnit.css';
import React from 'react';

class SimplerUnit extends React.Component {

  render () {
    return (
      <div class-name="simpler-unit">
        <input
          name={this.props.prefix + "name"}
          type="text"
          value={this.props.entity.name || ''}
          onChange={this.props.onChange}
          readOnly={!this.props.editing}
          list="units-datalist"></input>
      </div>
    );
  }

}

export default SimplerUnit;
