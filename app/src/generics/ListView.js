import './ListView.css';
import React from 'react';
import axios from 'axios';

class ListView extends React.Component {

  constructor(props) {
    super(props);
    this.adicionar = this.adicionar.bind(this);
    this.salvar = this.salvar.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  state = {
    entities: [{}],
    fetchingData: true,
    editing: [false],
  };

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
    this.props.crud.getOperation().then(
      (r) => {
        this.setEntities(r);
        this.setState({
          fetchingData: false,
        });
      }
    );
  }

  setEntities(entities) {
    if(entities.length !== 0 ) {
      this.setState({
        entities: entities,
        editing: new Array(entities.length).fill(false)
      });
    }
  }

  adicionar() {
    let entities = [...this.state.entities];
    let editing = [...this.state.editing];
    entities.push({});
    editing.push(true);
    this.setState({
      entities: entities,
      editing: editing
    });
  }

  salvar() {
    for(let i=0;i<this.state.editing.length;i++) {
      if(this.state.editing[i]) {
        this.props.crud.postOperation(this.state.entities[i]);
      }
    }
  }

  render() {
    if(this.state.fetchingData) {
      return <h3>Carregando...</h3>
    }
    let listEntities = "";

      listEntities = this.state.entities.map ((entity,index) =>
        <>
          {React.cloneElement(this.props.children, {
            entity: entity,
            editing: this.state.editing[index],
            onChange: this.handleInputChange,
            prefix: "" + index + "."
           })}
        </>);

    return (
      <tbody>
        {listEntities}
        <tr>
         <td colspan={this.props.colspan || 20}>
           <button onClick={() => this.adicionar()}>
             Adicionar
           </button>
           <button onClick={() => this.salvar()}>
             Salvar
           </button>
         </td>
        </tr>
      </tbody>
    );
  }

}

export default ListView;
