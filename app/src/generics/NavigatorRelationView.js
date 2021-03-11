import React from 'react';

export class NavigatorRelationView extends React.Component {

  state = {
    index: 0
  }

  constructor(props) {
    super(props);
  }

  render() {

    let removeButton = <></>, addButton = <></>;
    if(this.props.editing) {
      addButton = <button onClick={() => this.props.addToManyRelation(this.props.prefix + this.props.property)}>Adicionar</button>;
      if(this.props.entity[this.props.property] !== null ) {
        removeButton = <><button onClick={() => {
          let selecteds = new Array(this.props.entity[this.props.property].length);
          selecteds.fill(false);
          selecteds[this.state.index] = true;
          this.props.removeToManyRelation(this.props.prefix + this.props.property, selecteds);
        }

        }>Remover</button></>;
      }
    }

    if (this.props.entity[this.props.property] == null || this.props.entity[this.props.property].length === 0) {
      return <><p>Nenhum(a)</p>
      {addButton}
      </>
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
            disabled={this.state.index == this.props.entity[this.props.property].length - 1 || this.props.entity[this.props.property].length == 0}
            onClick={() => this.setState({index: this.state.index+1})}>
          Próximo
        </button>
        <br/>
      </>
    );
  }

}
