import './Navigator.css';
import React from 'react';
import axios from 'axios';

class Navigator extends React.Component {

  state = {
    entities: [{}],
    entity_index: 0,
    entities_saved: [],
    entities_index_saved: [],
    editing: false,
    creating: false,
    fetchingData: true,
    optionsLists: {},
  };

  constructor (props) {
    super(props);

    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.create = this.create.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
    this.cancel = this.cancel.bind(this);
    this.edit = this.edit.bind(this);

    this.renderButtons = this.renderButtons.bind(this);
    this.fetchData = this.fetchData.bind(this);

    this.fetchOptions = this.fetchOptions.bind(this);
    this.updateOptionsLists = this.updateOptionsLists.bind(this);
    this.addToManyRelation = this.addToManyRelation.bind(this);
    this.removeToManyRelation = this.removeToManyRelation.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // dividindo o nome para encontrar subobjetos
    const names = name.split(".");

    let index = this.state.entity_index;
    let entities = [...this.state.entities];
    let entity = {...entities[index]};
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

    entities[index] = entity;
    this.setState({entities});
  }

  componentDidMount () {
    this.fetchData();
    this.updateOptionsLists();
  }

  fetchData() {
    this.setState({
      fetchingData: true
    });
    this.props.crud.getOperation().then(
      (entities) => {
        if(entities.length === 0) {
          entities = [{}];
        }
        this.setState({
          entities: entities,
          creating: false,
          editing: false,
          fetchingData: false,
        });
      }
    );
  }

  cancel() {

  }

  create () {
    const entities_saved = [...this.state.entities];
    const entity_index_saved = this.state.entity_index.valueOf();
    this.setState({
      creating: true,
      editing: true,
      entities_saved: entities_saved,
      entity_index: 0,
      entity_index_saved: entity_index_saved,
      entities: [{}],
    });
  }

  edit () {
    const entity = {...this.state.entities[this.state.entity_index]};
    this.setState({
      editing: true,
      entity_saved: entity,
    });
  }

  next() {
    if(this.state.entity_index < this.state.entities.length) {
      this.setState({ entity_index : this.state.entity_index + 1});
    }
  }

  prev() {
    if(this.state.entity_index > 0) {
      this.setState({ entity_index : this.state.entity_index - 1});
    }
  }

  renderButtons () {
    let buttons =
      <>
      <button onClick={this.prev} disabled={this.state.entity_index === 0}>Anterior</button>
      <button onClick={this.save}>Salvar</button>
      <button onClick={this.cancel}>Descartar</button>
      <button onClick={this.remove}>Apagar</button>
      <button onClick={this.create}>Novo</button>
      <button onClick={this.edit}>Editar</button>
      <button onClick={this.next} disabled={this.state.entity_index === this.state.entities.length - 1}>Próximo</button>
      </> ;
    if(this.props.showUpdateOptionsListsButton || this.props.showUpdateOptionsListsButton == undefined) {
      buttons = <> {buttons} <button onClick={() => this.updateOptionsLists()}>Atualizar opções</button> </>;
    }
    return buttons;
  }

  render () {
    if(this.state.fetchingData) {
      return <h3>Carregando...</h3>;
    }
    return (
      <div className="navigator">
        {React.cloneElement(this.props.children, {
          entity: this.state.entities[this.state.entity_index],
          editing: this.state.editing,
          onChange: this.handleInputChange,
          datalist: this.props.datalist,
          optionsLists: this.state.optionsLists,
          addToManyRelation: this.addToManyRelation,
          removeToManyRelation: this.removeToManyRelation
         })}
        {this.renderButtons()}
      </div>
    );
  }

  async save () {
    const entityToSave = { ...this.state.entities[this.state.entity_index]};
    if(this.state.creating) {
      await this.props.crud.postOperation(entityToSave);
      this.fetchData();
    } else {
      const url = this.state.entities[this.state.entity_index]._links.self.href;
      await this.props.crud.patchOperation(url, entityToSave);
      this.fetchData();
    }
  }

  async remove() {
    const url = this.state.entities[this.state.entity_index]._links.self.href;
    await this.props.crud.deleteOperation(url);
    this.fetchData();
  }

  async updateOptionsLists() {
    let optionsLists = [];
    if(this.props.optionsLists !== undefined) {
      optionsLists = this.props.optionsLists;
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

  addToManyRelation(name) {
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

  removeToManyRelation (name) {
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
      if(!finished && i === names.length - 2) { // então chegamos ao último
        let relation = [];
        if(entityHierarchy[i][names[i]] !== undefined) {
          relation = [...entityHierarchy[i][names[i]]];
        }
        relation.splice(names[i+1],1);
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

}

export default Navigator;
