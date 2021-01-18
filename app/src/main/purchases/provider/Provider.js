import './Provider.css';
import React from 'react';
//import InputPrice from './price/InputPrice.js';

class Provider extends React.Component {

  render () {
    return (
      <div class-name="provider">
      <div>
        <label htmlFor={this.props.prefix + 'name'}>Estabelecimento: </label>
        <input name={this.props.prefix + 'name'} type="text" value={this.props.entity.name || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
      </div>
      <div>
        <label htmlFor={this.props.prefix + 'cnpj'}>CNPJ do Estabelecimento: </label>
        <input name={this.props.prefix + 'cnpj'} type="text" value={this.props.entity.cnpj || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
      </div>
      <div>
        <label htmlFor={this.props.prefix + 'comment'}>Comentários sobre o Estabelecimento: </label>
        <input name={this.props.prefix + 'comment'} type="text" value={this.props.entity.comment || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
      </div>

      </div>
    );
  }

}

export default Provider;
