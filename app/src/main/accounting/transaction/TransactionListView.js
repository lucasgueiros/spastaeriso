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
      entities: [],
      fetchingData: true,
      typesOptionsList: [{}],
      modalitiesOptionsList: [{}],
      accountsOptionsList: [{}],
      editing: false,
      entity: {},
    }
    this.updateOptionsLists = this.updateOptionsLists.bind(this);
    this.adicionar = this.adicionar.bind(this);
    this.salvar = this.salvar.bind(this);
    this.apagar = this.apagar.bind(this);
    this.addEntry = this.addEntry.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.transactionCrud = new TransactionCrud();
    this.handleSelectedChange = this.handleSelectedChange.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  handleSelectedChange(event, index) {
    const checked = event.target.checked;
    let selecteds = [...this.state.selecteds];
    selecteds[index] = checked;
    this.setState({selecteds});
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

  componentDidMount () {
    this.updateOptionsLists()
    this.refresh();
  }

  refresh() {
    this.transactionCrud.getOperation().then(
      (r) => {
        this.setEntities(r);
        this.setState({
          fetchingData: false,
          selecteds: new Array(r.length).fill(false)
        });
      }
    );
  }

  setEntities(entities) {
    if(entities.length !== 0 ) {
      this.setState({
        entities: entities
      });
    }
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

  modificar() {

  }

  apagar() {
    for(let i = 0; i < this.state.selecteds.length; i++ ) {
      if(this.state.selecteds[i]) {
        this.transactionCrud.deleteOperation(this.state.entities[i]._links.self.href);
        this.refresh();
      }
    }
  }

  salvar() {
    this.transactionCrud.postOperation(this.state.entity);
    this.refresh();
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
    /*if(this.state.fetchingData) {
      return <h3>Carregando...</h3>
    }
    let listEntities = "";

    listEntities = this.state.entities.map ((entity,index) =>
      <>
        <SimplerTransaction
          typesOptionsList={this.state.typesOptionsList}
          modalitiesOptionsList={this.state.modalitiesOptionsList}
          accountsOptionsList={this.state.accountsOptionsList}
          editing={false}
          entity={entity}
          prefix={"" + index + "."}>
          <td>
            <input
              type="checkbox"
              name={index + "._selected"}
              value={entity._selected}
              onChange={(event) => this.handleSelectedChange(event,index)}>
            </input>
          </td>
        </SimplerTransaction>
      </>);
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
    }*/
    return (
      <>
        <h3>Transações</h3>
        <table>
          <ListView crud={this.transactionCrud}>
          <SimplerTransaction
            typesOptionsList={this.state.typesOptionsList}
            modalitiesOptionsList={this.state.modalitiesOptionsList}
            accountsOptionsList={this.state.accountsOptionsList}/>
          </ListView>
        </table>
      </>
    );
  }

}

export default TransactionListView;
