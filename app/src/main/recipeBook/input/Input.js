import './Input.css';
import './InputAux.js';
import React from 'react';
//import InputPrice from './price/InputPrice.js';

class Input extends React.Component {

  render () {
    return (
      <div class-name="input">
        <div>
          <label htmlFor="name">Nome: </label>
          <input name="name" type="text" value={this.props.entity.name || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>
        <div>
          <label htmlFor="comment">Comentários: </label>
          <input name="comment" type="text" value={this.props.entity.comment || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>

      </div>
    );
  }

}

export default Input;
