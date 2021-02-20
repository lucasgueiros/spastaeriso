import React from 'react';

class ListRelationView extends React.Component {

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
    let propsitems = this.props.entity[this.props.property] || [];
    if(typeof propsitems.map !== "function") {
      return "";
    }
    let items = [...propsitems];
    let removeButton = <></>, addButton = <></>;
    if(this.props.editing) {
      addButton = <button onClick={() => this.props.addToManyRelation(this.props.prefix + this.props.property)}>Adicionar</button>;
      removeButton = <><button onClick={() => this.removeSelecteds()}>Remover</button><br/></>;
    } else if(this.props.index){
      items = items.sort(this.compare);
    }
    const listItems = items.map((item,index) =>
      <>

        {React.cloneElement(this.props.row, {...this.props,
          key: index,
          entity: item,
          prefix: this.props.prefix + this.props.property + "." + index + ".",
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
      </>
    );
    return (
      <>
        <table>
          <thead>
            <tr>
              <th></th>
              {this.props.children}
            </tr>
          </thead>
          <tbody>
            {listItems}
          </tbody>
        </table>
        {addButton}
        {removeButton}
      </>
    );
  }

}
export default ListRelationView;
