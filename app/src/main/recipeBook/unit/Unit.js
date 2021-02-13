import './Unit.css';
import React from 'react';

class Unit extends React.Component {
  render () {
    return (
      <div class-name="simpler-unit">
        <div>
          <label htmlFor="name">Nome: </label>
          <input name="name" type="text" value={this.props.entity.name || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>
        <div>
          <label htmlFor="quantity">Grandeza: </label>
          <select name="quantity" value={this.props.entity.quantity || ''} onChange={this.props.onChange} disabled={!this.props.editing}>
            <option value="VOLUME">Volume</option>
            <option value="WEIGHT">Peso</option>
            <option value="TIME">Tempo</option>
            <option value="NON_CONVERTIBLE">Outros</option>

          </select>
        </div>
        <div>
          <label htmlFor="favorite">Favorita? </label>
          <input name="favorite" type="checkbox" checked={this.props.entity.favorite || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>
      </div>
    );
  }

}

export default Unit;
