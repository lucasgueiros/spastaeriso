import React from 'react';

export default class MultipleLinkSelect extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    if(props.addOptionsList && props.options) {
      props.addOptionsList(props.options);
    }
  }

  onChange(event) {
    const target = event.target;
    const value = target.checked;
    const name = target.name;

    this.props.manyToManyChange(this.props.prefix + this.props.property, name, value);

  }

  render () {
    if(this.props.optionsLists == undefined || this.props.optionsLists[this.props.options] == undefined){
      return <>Carregando...</>;
    }

    let value = this.props.entity[this.props.property];

    return (
      <>
        {
          this.props.optionsLists[this.props.options].map((entity, key) =>
            <div>
              <input
                name={entity._links.self.href}
                type="checkbox"
                checked={value.includes(entity._links.self.href)}
                onChange={this.onChange}/> {entity[this.props.nameField || 'name']}
            </div>)
        }
      </>);
  }

}
