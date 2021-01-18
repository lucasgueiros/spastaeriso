import './Provider.css';
import React from 'react';
//import InputPrice from './price/InputPrice.js';

class Provider extends React.Component {

  render () {
    return (
      <div class-name="provider">
      <div>
        <label htmlFor={this.props.prefix + 'modality'}>Modalidade: </label>
        <input name={this.props.prefix + 'modality'} type="text" value={this.props.entity.modality || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
      </div>

      </div>
    );
  }

}

export default Provider;
