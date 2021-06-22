import React from 'react';
import {StandaloneLinkSelect, StandaloneNumberField,StandaloneTextField,StandaloneCheckboxField,Navigator} from '../../../old_generics/all.js';

export function PurchaseProductNavigator (props) {
  return (
    <Navigator {...props}  entity="purchaseProducts" view={<PurchaseProduct/>}/>
  );
}

export class PurchaseProduct extends React.Component {


    constructor(props) {
      super(props);
      this.state = {message: ""};
      this.apply = this.apply.bind(this);
    }

    apply (link) {
      this.props.http.get(link + "/apply").then((response) => {
        this.setState({message: "Sucesso!"});
      }, (error) => {
        this.setState({message: "Erro!"});
      });
    }

  render () {
    return (
      <div class-name="purchaseProduct">
        <h4>Produto em NFCe</h4>

        <StandaloneTextField {...this.props} property="declaredInput" label="Insumo declarado" />
        <StandaloneTextField {...this.props} property="declaredUnit" label="Unidade declarada" />
        <StandaloneCheckboxField {...this.props} property="keepUnit" label="Manter a unidade declarada?" />
        <StandaloneNumberField {...this.props} property="ratio" label="Razão"/>
        <StandaloneTextField {...this.props} property="brand" label="Marca" />
        <StandaloneLinkSelect {...this.props} property="unit" options="units" label="Unidade" nameField="symbol"/>
        <StandaloneLinkSelect {...this.props} property="input" options="inputs" label="Insumo"/>
        <button disabled={this.props.editing} onClick={() => this.apply(this.props.entity._links.self.href)}>Aplicar</button>
        {this.state.message}

      </div>
    );
  }
}
