import React from 'react';

export class NavigatorRelationView extends React.Component {

  state = {
    index: 0
  }

  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.entity[this.props.property] == null ) {
      return <p>Carregando</p>;
    }
    let removeButton = <></>, addButton = <></>;
    if(this.props.editing) {
      addButton = <button onClick={() => this.props.addToManyRelation(this.props.prefix + this.props.property)}>Adicionar</button>;
      removeButton = <><button onClick={() => {
        let selecteds = new Array(this.props.entity[this.props.property].length);
        selecteds.fill(false);
        selecteds[this.state.index] = true;
        this.props.removeToManyRelation(this.props.prefix + this.props.property, selecteds);
      }

      }>Remover</button></>;
    }
    return (
      <>
        {React.cloneElement(this.props.view, {...this.props,
          entity: this.props.entity[this.props.property][this.state.index] || {},
          prefix: this.props.prefix + this.props.property + "." + this.state.index + ".",
        })}
        <button
            disabled={this.state.index == 0}
            onClick={() => this.setState({index: this.state.index-1})}>
          Anterior
        </button>
        {addButton}
        {removeButton}
        <button
            disabled={this.state.index == this.props.entity[this.props.property].length - 1}
            onClick={() => this.setState({index: this.state.index+1})}>
          Próximo
        </button>
        <br/>
      </>
    );
  }

}
