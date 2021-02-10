import './PurchaseProduct.css';
import React from 'react';
import SimplerLinkSelect from '../../../../generics/SimplerLinkSelect.js';
import axios from 'axios';

class PurchaseProduct extends React.Component {


    constructor(props) {
      super(props);
      this.state = {message: ""};
      this.apply = this.apply.bind(this);
    }

    apply (link) {
      axios.get(link + "/apply").then((response) => {
        this.setState({message: "Sucesso!"});
      }, (error) => {
        this.setState({message: "Erro!"});
      });
    }

  render () {
    return (
      <div class-name="purchaseProduct">
        <h4>Produto em NFCe</h4>

        <div>
          <label htmlFor="declaredInput">Insumo declarado: </label>
          <input name="declaredInput" type="text" value={this.props.entity.declaredInput || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>

        <div>
          <label htmlFor="declaredUnit">Unidade declarada: </label>
          <input name="declaredUnit" type="text" value={this.props.entity.declaredUnit || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>

        <div>
          <label htmlFor="keepUnit">Manter a unidade declarada? </label>
          <input name="keepUnit" type="checkbox" checked={this.props.entity.keepUnit || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>

        <div>
          <label htmlFor="ratio">Razão: </label>
          <input name="ratio" type="number" value={this.props.entity.ratio || 0} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>

        <div>
          <label htmlFor="brand">Marca: </label>
          <input name="brand" type="text" value={this.props.entity.brand || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>
        <div>
          <label htmlFor="unit">Unidade: </label>
          <SimplerLinkSelect
            entity={this.props.entity.unit || ""}
            prefix={this.props.prefix + "unit"}
            onChange={this.props.onChange}
            editing={this.props.editing}
            optionsList={this.props.optionsLists.units || []}/>
        </div>
        <div>
          <label htmlFor="input">Insumo: </label>
          <SimplerLinkSelect
            entity={this.props.entity.input || ""}
            prefix={this.props.prefix + "input"}
            onChange={this.props.onChange}
            editing={this.props.editing}
            optionsList={this.props.optionsLists.inputs || []}/>
        </div>
        <button disabled={this.props.editing} onClick={() => this.apply(this.props.entity._links.self.href)}>Aplicar</button>
        {this.state.message}

      </div>
    );
  }
}

export default PurchaseProduct;
