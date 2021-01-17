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

    this.setEntities = this.setEntities.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
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
        entityHierarchy[i+1] = {...entityHierarchy[i][names[i]]};
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
    this.props.crud.getOperation(this.setEntities, this.setEntities);
  }

  setEntities(entities) {
    if(entities.length !== 0 ) {
      this.setState({
        entities: entities,
        creating: false,
        editing: false,
      });
    }
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
    return (
      <>
      <button onClick={this.prev} disabled={this.state.entity_index === 0}>Anterior</button>
      <button onClick={this.save}>Salvar</button>
      <button onClick={this.cancel}>Descartar</button>
      <button onClick={this.remove}>Apagar</button>
      <button onClick={this.create}>Novo</button>
      <button onClick={this.edit}>Editar</button>
      <button onClick={this.next} disabled={this.state.entity_index === this.state.entities.length - 1}>Próximo</button>
      </>
    );
  }

  render () {
    //{this.renderEntityRepresentation(this.state.entities[this.state.entity_index], this.state.editing)}
    return (
      <div className="Navigator">
        {React.cloneElement(this.props.children, {
          entity: this.state.entities[this.state.entity_index],
          editing: this.state.editing,
          onChange: this.handleInputChange
         })}
        {this.renderButtons()}
      </div>
    );
  }

  save () {
    const entityToSave = { ...this.state.entities[this.state.entity_index]};
    if(this.state.creating) {
      this.props.crud.postOperation(this.setEntities, entityToSave);
    } else {
      const url = this.state.entities[this.state.entity_index]._links.self.href;
      this.props.crud.putOperation(this.setEntities, url, entityToSave);
    }
  }

  remove() {
    const url = this.state.entities[this.state.entity_index]._links.self.href;
    this.props.crud.deleteOperation(this.setEntities, url);
  }

}

export default Navigator;
