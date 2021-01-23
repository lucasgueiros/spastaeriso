import './Purchase.css';
import React from 'react';
import Provider from '../provider/Provider.js';
import Transaction from '../../finances/transaction/Transaction.js';
import PurchaseItem from './item/PurchaseItem.js';
import axios from 'axios';

function PurchaseItems(props) {
  if(typeof props.items.map !== "function") {
    return "";
  }
  const items = props.items;
  const listItems = items.map((item,index) =>
    <PurchaseItem
      key={index}
      entity={item}
      prefix={"items."+index+"."}
      editing={true}
      onChange={props.onChange}
      unitsOptionsList={props.unitsOptionsList}
      inputOptionsList={props.inputOptionsList}
      accountsOptionsList={props.accountsOptionsList}
    />
  );
  return listItems;
}

class Purchase extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      unitsOptionsList: [],
      inputOptionsList: []
    }
    this.updateOptionsLists = this.updateOptionsLists.bind(this);
  }

  componentDidMount () {
    this.updateOptionsLists();
  }

  updateOptionsLists () {
    axios.get("units").then( (response) => {
      this.setState({
        unitsOptionsList: response.data._embedded.units,
      });
    }, (error) => {
      console.log(error);
    });
    axios.get("inputs").then( (response) => {
      this.setState({
        inputOptionsList: response.data._embedded.inputs,
      });
    }, (error) => {
      console.log(error);
    });
    axios.get("accounts").then( (response) => {
      this.setState({
        accountsOptionsList: response.data._embedded.units,
      });
    }, (error) => {
      console.log(error);
    });
    axios.get("profile/transactions").then( (response) => {
      const fields = response.data.alps.descriptor.descriptor;
      let options = [];
      let i;
      for(i=0; i < fields.length;i++) {
        if(fields[i].name === "type") {
          options = fields[i].doc.value.split(", ");
          break;
        }
      }
      this.setState({
        transactionModalitiesOptionsList: options,
      });
    }, (error) => {
      console.log(error);
    });
  }

  render () {
    let updateOptionsListsButton = '';
    if(this.props.editing) {
      updateOptionsListsButton = <button onClick={() => this.updateOptionsLists()}>Atualizar opções</button>
    }


    return (
      <div class-name="purchase">
        <Provider
          entity={this.props.entity.provider || {}}
          prefix="provider."
          editing={this.props.editing}
          onChange={this.props.onChange}/>
        <Transaction
          entity={this.props.entity.transaction || {}}
          prefix="transaction."
          editing={this.props.editing}
          onChange={this.props.onChange}/>
        <div>
          <label htmlFor="nfe.accessCode">NFC-e: </label>
          <input name="nfe.accessCode" type="text" value={this.props.entity.nfe ? this.props.entity.nfe.accessCode : ''} readOnly={true}></input>
        </div>
        <div>
          <label htmlFor="additionalValue">Valor extra: </label>
          <input name="additionalValue" type="numeric" value={this.props.entity.additionalValue || 0} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>
        <table>
          <thead>
            <tr>
              <th>Insumo</th>
              <th>Qtd</th>
              <th>Uni</th>
              <th>Desc</th>
              <th>Marca</th>
              <th>R$/u</th>
            </tr>
          </thead>
          <tbody>
            <PurchaseItems
              items={this.props.entity.items || {}}
              onChange={this.props.onChange}
              unitsOptionsList={this.state.unitsOptionsList}
              inputOptionsList={this.state.inputOptionsList}
              accountsOptionsList={this.state.accountsOptionsList}/>
          </tbody>
        </table>
        {updateOptionsListsButton}
      </div>
    );
  }
}

export default Purchase;
