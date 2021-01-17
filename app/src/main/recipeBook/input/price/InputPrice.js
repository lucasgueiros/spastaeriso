import './InputPrice.css';
import React from 'react';

class InputPrice extends React.Component {

  render () {
    return (
      <div class-name="input-price">
        <div>
          <label htmlFor="price.priceByUnit">Preço por unidade: </label>
          <input name="price.priceByUnit" type="numeric" value={this.props.entity.priceByUnit || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>
        <div>
          <label htmlFor="price.unit">Unidade: </label>
          <input name="price.unit" type="text" value={this.props.entity.unit || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>
        <div>
          <label htmlFor="price.date">Data: </label>
          <input name="price.date" type="localdate" value={this.props.entity.date || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>
      </div>
    );
  }

}

export default InputPrice;
