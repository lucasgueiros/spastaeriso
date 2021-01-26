import './TransactionListView.css';
import React from 'react';
import ListView from '../../../generics/ListView.js';
import TransactionCrud from './TransactionCrud.js';
import SimplerTransaction from './SimplerTransaction.js';
import axios from 'axios';

class TransactionListView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      typesOptionsList: [{}],
      modalitiesOptionsList: [{}],
      accountsOptionsList: [{}],
      editing: false,
      entity: {},
    }
    this.updateOptionsLists = this.updateOptionsLists.bind(this);
    this.adicionar = this.adicionar.bind(this);
    this.salvar = this.salvar.bind(this);
    this.addEntry = this.addEntry.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.transactionCrud = new TransactionCrud();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // dividindo o nome para encontrar subobjetos
    const names = name.split(".");

    let entity = {...this.state.entity};
    let entityHierarchy = [entity];

    let i = 0;
    let finished = false;
    while(i >= 0) {
      if(!finished && i === names.length - 1) { // então chegamos ao último
        entityHierarchy[i][names[i]] = value;
        finished = true;
        i--;
      } else if (!finished) {
        if(Array.isArray(entityHierarchy[i][names[i]])) {
          entityHierarchy[i+1] = [...entityHierarchy[i][names[i]]];
        } else {
          entityHierarchy[i+1] = {...entityHierarchy[i][names[i]]};
        }
        i++;
      } else {
        entityHierarchy[i][names[i]] = entityHierarchy[i+1];
        i--;
      }
    }

    this.setState({entity});
  }

  componentDidMount() {
    this.updateOptionsLists()
  }

  updateOptionsLists() {
    axios.get("transactionTypes")
      .then((response) => {
        this.setState({
            typesOptionsList: response.data._embedded.transactionTypes,
        })
      }, (error) => {
        console.log(error);
      });
    axios.get("transactionModalities")
      .then((response) => {
        this.setState({
            modalitiesOptionsList: response.data._embedded.transactionModalities,
        })
      }, (error) => {
        console.log(error);
      });
    axios.get("accounts")
      .then((response) => {
        this.setState({
            accountsOptionsList: response.data._embedded.accounts,
        })
      }, (error) => {
        console.log(error);
      });
  }

  adicionar() {
    this.setState({
      editing: true,
      entity: {
        entries:[
          {},{}
        ]
      }
    });
  }

  salvar() {
    this.transactionCrud.postOperation(this.state.entity);
  }

  addEntry() {
    let entries = [...this.state.entity.entries];
    entries.push({});
    let entity = {
      ...this.state.entity,
      entries: entries
    };
    this.setState({entity});
  }

  render() {
    let editing = <></>;
    if(this.state.editing) {
      editing = (
        <>
        <SimplerTransaction
          typesOptionsList={this.state.typesOptionsList}
          modalitiesOptionsList={this.state.modalitiesOptionsList}
          accountsOptionsList={this.state.accountsOptionsList}
          editing={true}
          entity={this.state.entity}
          onChange={this.handleInputChange}
          prefix={""} />
        <button onClick={() => this.salvar()}>Salvar</button>
        <button onClick={() => this.addEntry()}>Adicionar entrada</button>
        </>
      );
    }
    return (
      <>
        <h3>Transações</h3>
        <table>
          <ListView
            crud={this.transactionCrud}
            colspan={6}
            noEditControls={true}>
            <SimplerTransaction
              typesOptionsList={this.state.typesOptionsList}
              modalitiesOptionsList={this.state.modalitiesOptionsList}
              accountsOptionsList={this.state.accountsOptionsList} />
          </ListView>
          <button onClick={() => this.adicionar()}>Adicionar</button>
          {editing}
        </table>
      </>
    );
  }

}

export default TransactionListView;
