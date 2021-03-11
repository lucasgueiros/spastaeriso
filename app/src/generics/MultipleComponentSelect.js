import React from 'react';

export default class MultipleComponentSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      options: this.props.options
    }
    this.onChange = this.onChange.bind(this);
    if(props.restricted) {
      this.state.options = props.options + "_" + props.restricted;
    }
    if(props.addOptionsList && this.state.options && this.props.optionsLists[this.state.options] == undefined) {
      props.addOptionsList(props.options, this.props.nameField);
    }
  }

  onChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const checked = target.checked;

    this.props.manyToManyChange(this.props.prefix + this.props.property, value, checked);
  }

  render() {
    if(this.props.optionsLists == undefined || this.props.optionsLists[this.state.options] == undefined){
      return <>Carregando...</>;
    }

    let options = this.props.optionsLists[this.state.options];
    let selecteds = Array(options.length+1).fill(false);
    //selecteds.fill(false,0,options.length+1);

    if(this.props.entity[this.props.property] == null) {
      selecteds[options.length] = true;
    } else {
      for(let i = 0; i < options.length ; i++) {
        if(this.props.entity[this.props.property].includes(options[i]._links.self.href)){
          selecteds[i] = true;
        }
      }
    }

    return (
      <>
      {options.map((entity, index) =>
        React.cloneElement(this.props.view, {...this.props,
        entity: entity || {},
        children: (
            <input
              type="checkbox"
              name={this.props.prefix + this.props.property}
              checked={selecteds[index]}
              value={options[index]._links.self.href}
              onChange={this.onChange}/>
        ),
        prefix: this.props.prefix + this.props.property + "."})
      )}
      {this.props.separator}
      </>
    );
  }

}
