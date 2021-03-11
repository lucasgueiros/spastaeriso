import './Navigator.css';
import React from 'react';

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
    message: ""
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
    this.manyToManyChange = this.manyToManyChange.bind(this);

    this.addOptionsList = this.addOptionsList.bind(this);
    this.optionsListsNames = [];

    if(this.props.entity) {
      this.crud = this.props.crudFactory.get(this.props.entity);
    } else {
      this.crud = this.props.crud;
    }

  }

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
        let originalValue = entityHierarchy[i][names[i]];
        let newValue;
        if (originalValue == null || typeof originalValue[Symbol.iterator] !== 'function') {
          newValue = [];
        } else {
          newValue = [...entityHierarchy[i][names[i]],];
        }
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
        if(value === "none") {
          entityHierarchy[i][names[i]] = "";
        } else {
          entityHierarchy[i][names[i]] = value;
        }

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
    if(this.state.isToShow) {
      this.fetchData(this.props.toShow);
      this.setState({isToShow: false});
    } else  {
      this.fetchData();
    }
    this.updateOptionsLists();
  }

  fetchData(toShow) {
    this.setState({
      fetchingData: true
    });
    this.crud.getOperation().then(
      (entities) => {
        if(entities.length === 0) {
          entities = [{}];
        }
        let toShowIndex = 0;
        if(toShow) {
          for(let i=0; i < entities.length; i++) {
            if(entities[i]._links.self.href === toShow) {
              toShowIndex = i;
            }
          }
        }
        this.setState({
          entities: entities,
          creating: false,
          editing: false,
          fetchingData: false,
          entity_index: toShowIndex,
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
    let theChild = <></>;
    if(this.props.children) {
      theChild = React.cloneElement(this.props.children, { ...this.props,
        entity: this.state.entities[this.state.entity_index],
        editing: this.state.editing,
        onChange: this.handleInputChange,
        datalist: this.props.datalist,
        optionsLists: this.state.optionsLists,
        addToManyRelation: this.addToManyRelation,
        removeToManyRelation: this.removeToManyRelation,
        manyToManyChange: this.manyToManyChange,
        addOptionsList: this.addOptionsList,

        prefix: this.props.prefix ? this.props.prefix : "",
      });
    } else {
      theChild = React.cloneElement(this.props.view, { ...this.props,
        entity: this.state.entities[this.state.entity_index],
        editing: this.state.editing,
        onChange: this.handleInputChange,
        datalist: this.props.datalist,
        optionsLists: this.state.optionsLists,
        addToManyRelation: this.addToManyRelation,
        removeToManyRelation: this.removeToManyRelation,
        addOptionsList: this.addOptionsList,
        manyToManyChange: this.manyToManyChange,
        prefix: this.props.prefix ? this.props.prefix : "",
      });
    }
    return (
      <div className="navigator">
        {theChild}
        {this.renderButtons()}
        <p>{this.state.message}</p>
      </div>
    );
  }

  async save () {
    const entityToSave = { ...this.state.entities[this.state.entity_index]};
    if(this.state.creating) {
      let response = await this.crud.postOperation(entityToSave);
      if(response._ok) {
        this.setState({message: "Cadastrado com sucesso."});
        this.fetchData(response._links.self.href);
      } else {
        this.setState({message: "Erro ao cadastrar.", entity_index: 0});
      }

    } else {
      const url = this.state.entities[this.state.entity_index]._links.self.href;
      let response = await this.crud.patchOperation(url, entityToSave);
      if(response._ok) {
        this.setState({message: "Alterado com sucesso.", entity_index: 0});
        this.fetchData(response._links.self.href);
      } else {
        this.setState({message: "Erro ao alterar.", entity_index: 0});
        console.log(response.error);
        this.fetchData();
      }
    }
  }

  async remove() {
    const url = this.state.entities[this.state.entity_index]._links.self.href;
    let response = await this.crud.deleteOperation(url);
    if(response._ok) {
      this.setState({message: "Removido com sucesso.", entity_index: 0});
      this.fetchData();
    } else {
      this.setState({message: "Erro ao remover.", entity_index: 0});
      this.fetchData();
    }
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
      await this.props.http.get(name)
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


}

export default Navigator;
