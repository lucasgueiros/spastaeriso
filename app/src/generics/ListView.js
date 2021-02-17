import './ListView.css';
import React from 'react';
import axios from 'axios';
import CrudFactory from './CrudFactory.js';

class ListView extends React.Component {

  constructor(props) {
    super(props);
    this.adicionar = this.adicionar.bind(this);
    this.salvar = this.salvar.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectedChange = this.handleSelectedChange.bind(this);
    this.addToManyRelation = this.addToManyRelation.bind(this);
    this.modify = this.modify.bind(this);
    this.fetchOptions = this.fetchOptions.bind(this);
    this.updateOptionsLists = this.updateOptionsLists.bind(this);
    this.updating = false;

    this.addToManyRelation = this.addToManyRelation.bind(this);
    this.removeToManyRelation = this.removeToManyRelation.bind(this);
    this.manyToManyChange = this.manyToManyChange.bind(this);
    this.addOptionsList = this.addOptionsList.bind(this);
    this.optionsListsNames = [];

    if(this.props.entity) {
      this.crud = CrudFactory.get(this.props.entity);
    } else {
      this.crud = this.props.crud;
    }
  }

  state = {
    entities: [],
    fetchingData: true,
    editing: [],
    creating: [],
    selecteds: [],
    optionsLists: {},
  };

  // vai dar problema
  manyToManyChange(name, value, add) {
    const names = name.split(".");

    let index = this.state.entity_index;
    let entities = [...this.state.entities];
    let entity = {...entities[index]};
    let entityHierarchy = [entity];

    let i = 0;
    let finished = false;
    while(i >= 0) {
      if(!finished && i === names.length - 1) { // então chegamos ao último
        let newValue = [...entityHierarchy[i][names[i]],];
        if(add) {
          newValue.push(value);
        } else {
          let j = newValue.indexOf(value);
          newValue.splice(j,1);
        }
        entityHierarchy[i][names[i]] = newValue;
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

    entities[index] = entity;
    this.setState({entities});
  }

  removeToManyRelation (name, selecteds) {
    let names = name.split(".");

    //const index = names[0];
    //names.splice(0,1);
    let index = this.state.entity_index;
    let entity = {...this.state.entities[index]};
    let entityHierarchy = [entity];

    let i = 0;
    let finished = false;
    if(names.length===0) {
      return;
    }
    while(i >= 0) {
      if(!finished && i === names.length - 1) { // então chegamos ao último
        let relation = [];
        if(entityHierarchy[i][names[i]] !== undefined) {
          relation = [...entityHierarchy[i][names[i]]];
        }
        for(let j = relation.length; j >= 0; j--) {
          if(selecteds[j]) {
            relation.splice(j,1);
          }
        }
        entityHierarchy[i][names[i]] = relation;
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
    let entities = [...this.state.entities];
    entities[index] = entity;
    this.setState({entities});
  }


  addOptionsList(name) {
    this.optionsListsNames.push(name);
    this.updateOptionsLists()
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
    let names = name.split(".");

    const index = names[0];
    names.splice(0,1);
    let entity = {...this.state.entities[index]};
    let entityHierarchy = [entity];

    let i = 0;
    let finished = false;
    if(names.length===0) {
      return;
    }
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
    let entities = [...this.state.entities];
    entities[index] = entity;
    this.setState({entities});
  }

  componentDidMount () {
    this.fetchData();
    this.updateOptionsLists();
  }

  fetchData() {
    this.setState({
      fetchingData: true,
    });
    this.crud.getOperation().then(
      (r) => {
        this.setState({
          entities: r,
          fetchingData: false,
          editing: new Array(r.length).fill(false),
          selecteds: new Array(r.length).fill(false),
          creating: new Array(r.length).fill(false),
        });
      }
    );
  }

  apagar() {
    for(let i = 0; i < this.state.selecteds.length; i++ ) {
      if(this.state.selecteds[i]) {
        this.crud.deleteOperation(this.state.entities[i]._links.self.href);
        this.fetchData();
      }
    }
  }

  adicionar() {
    let entities = [...this.state.entities];
    let editing = [...this.state.editing];
    let selecteds = [...this.state.selecteds];
    let creating = [...this.state.creating];
    creating.push(true);
    entities.push({});
    editing.push(true);
    selecteds.push(true);
    this.setState({
      entities: entities,
      editing: editing,
      selecteds: selecteds,
      creating: creating
    });
  }

  salvar() {
    for(let i=0;i<this.state.editing.length;i++) {
      if(this.state.creating[i] && this.state.editing[i]) {
        this.crud.postOperation(this.state.entities[i]);
      } else if (this.state.editing[i]) {
        this.crud.patchOperation(this.state.entities[i]._links.self.href, this.state.entities[i]);
      }
    }
    this.fetchData();
  }

  modify() {
    let editing = [...this.state.editing];
    for(let i=0;i<this.state.selecteds.length;i++) {
      if(this.state.selecteds[i]) {
        editing[i] = true;
      }
    }
    this.setState({editing: editing});
  }


  addToManyRelation(name) {
    let names = name.split(".");

    const index = names[0];
    names.splice(0,1);
    let entity = {...this.state.entities[index]};
    let entityHierarchy = [entity];

    let i = 0;
    let finished = false;
    if(names.length===0) {
      return;
    }
    while(i >= 0) {
      if(!finished && i === names.length - 1) { // então chegamos ao último
        let relation = [];
        if(entityHierarchy[i][names[i]] !== undefined) {
          relation = [...entityHierarchy[i][names[i]]];
        }
        relation.push({});
        entityHierarchy[i][names[i]] = relation;
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
    let entities = [...this.state.entities];
    entities[index] = entity;
    this.setState({entities});
  }

  async updateOptionsLists() {
    let optionsLists = [];
    if(this.props.optionsLists !== undefined) {
      optionsLists = this.props.optionsLists;
    } else {
      optionsLists = this.optionsListsNames;
    }
    this.fetchOptions(optionsLists).then((r) => {
      this.setState({
        optionsLists: r,
      });
    });
  }

  async fetchOptions(names) {
    let r = {};
    for(let i =0 ;i<names.length;i++) {
      let ri = [];
      let name = names[i];
      await axios.get(name)
        .then((response) => {
          ri = response.data._embedded[name];
        }, (error) => {
          console.log(error);
        });
      r[name] = ri;
    }
    return r;
  }

  render() {
    if(this.state.fetchingData) {
      return <h3>Carregando...</h3>
    }
    let listEntities = "";

      listEntities = this.state.entities.map ((entity,index) =>
        <>
          {React.cloneElement(this.props.view, {
            key: index,
            entity: entity,
            editing: this.state.editing[index],
            onChange: this.handleInputChange,
            prefix: "" + index + ".",
            addToManyRelation: this.addToManyRelation,
            removeToManyRelation: this.removeToManyRelation,
            manyToManyChange: this.manyToManyChange,
            addOptionsList: this.addOptionsList,
            optionsLists: this.state.optionsLists,
            children: (
              <td>
                <input
                  type="checkbox"
                  name={index + "._selected"}
                  checked={this.state.selecteds[index]}
                  onChange={(event) => this.handleSelectedChange(event,index)}>
                </input>
              </td>
            )
           })}
        </>);
    return (
      <table>
        <thead>
          <th></th>
          {this.props.children}
        </thead>
        <tbody>
          {listEntities}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="100">
              <button onClick={() => this.adicionar()}>Adicionar</button>
              <button onClick={() => this.apagar()}>Apagar</button>
              <button onClick={() => this.salvar()}>Salvar</button>
              <button onClick={() => this.modify()}>Alterar</button>
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }

}

export default ListView;
