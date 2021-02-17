import RelationView from './RelationView.js';
import React from 'react';
export default class InListRelationView extends React.Component {

  state = {
    selecteds: [],
    index: ''
  }

  constructor(props) {
    super(props);
    this.state.index = props.index;
    this.compare = this.compare.bind(this);
  }

  compare( a, b) {
    let index = this.state.index;
    if ( a[index] < b[index] ){
      return -1;
    }
    if ( a[index] > b[index] ){
      return 1;
    }
    return 0;
  }

  handleSelectedChange(event, index) {
    const checked = event.target.checked;
    let selecteds = [...this.state.selecteds];
    selecteds[index] = checked;
    this.setState({selecteds});
  }

  removeSelecteds () {
    this.props.removeToManyRelation(this.props.prefix + this.props.property, this.state.selecteds);
    this.setState({selecteds: []});
  }


  render() {
    let items;
    if(this.props.entity == undefined || this.props.property == undefined || this.props.entity[this.props.property] == undefined) {
      if(this.props.editing) {
        items = [];
      } else {
        return (<>Carregando</>);
      }

    } else {
      items = this.props.entity[this.props.property];
    }

    let before = [], after = [];
    for(let i = 0; i < this.props.before; i++ ){
      before.push(<td></td>);
    }
    for(let i = 0; i < this.props.after; i++ ){
      after.push(<td></td>);
    }

    let addButton =<></>, removeButton = <></>;
    if(this.props.editing) {
      addButton = <button onClick={() => this.props.addToManyRelation(this.props.prefix + this.props.property)}>Adicionar</button>;
      removeButton = <><button onClick={() => this.removeSelecteds()}>Remover</button><br/></>;
    } else if(this.props.index){
      items = items.sort(this.compare);
    }

    let rendered = items.map((entity,index) => {
        return (

            <tr key={index}>
              {before}
              <td>
                <input
                  type="checkbox"
                  name={index + "._selected"}
                  checked={this.state.selecteds[index]}
                  onChange={(event) => this.handleSelectedChange(event,index)}>
                </input>
              </td>
              {React.cloneElement(this.props.view, {...this.props,
                entity: entity || {},
                prefix: this.props.prefix + this.props.property + "." + index + "."})}
              {after}
            </tr>);

        });

    return (
      <>
        {rendered}
        <tr>
          {before}
          <td>{addButton}{removeButton  }</td>
          {after}
        </tr>

      </>
    );
  }

}
