import './Card.css';
import React from 'react';
import SimplerLinkSelect from '../../../generics/SimplerLinkSelect.js';

class Card extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div class-name="Card">
        <div>
          <label htmlFor="description">Descrição: </label>
          <input name="description" type="text" value={this.props.entity.description || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>
        <div>
          <label htmlFor="account">Conta: </label>
          <SimplerLinkSelect
            entity={this.props.entity.account || ""}
            prefix={this.props.prefix + "account"}
            onChange={this.props.onChange}
            editing={this.props.editing}
            optionsList={this.props.optionsLists.accounts || []}/>
        </div>
        <div>
          <label htmlFor="cnpj">CNPJ do fornecedor: </label>
          <input name="cnpj" type="text" value={this.props.entity.cnpj || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>
        <div>
          <label htmlFor="favorite">Favorito? </label>
          <input name="favorite" type="checkbox" checked={this.props.entity.favorite || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>

      </div>
    );
  }

}

export default Card;
