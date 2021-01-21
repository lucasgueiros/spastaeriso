import './SimplerInput.css';
import React from 'react';

class SimplerInput extends React.Component {

  render () {
    return (
      <div class-name="simpler">
        <input
          name={this.props.prefix + "name"}
          type="text"
          value={this.props.entity.name || ''}
          onChange={this.props.onChange}
          readOnly={!this.props.editing}
          list="inputs-datalist"></input>
      </div>
    );
  }

}

export default SimplerInput;
