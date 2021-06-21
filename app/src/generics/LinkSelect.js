import './SimplerLinkSelect.css';
import React from 'react';

export default class LinkSelect extends React.Component {

  constructor(props) {
    super(props);
    if(props.addOptionsList && props.options) {
      props.addOptionsList(props.options, this.props.nameField);
    }
    this.state = {
      options: props.restricted ? (props.options + '_' + props.restricted) : props.options,
    };
  }

  render() {
    if(this.props.optionsLists == undefined || this.props.optionsLists[this.state.options] == undefined){
      return <>Carregando...</>;
    }
    let none = <></>;
    if(!this.props.notNull) {
      none = <option key={this.props.optionsLists[this.state.options].length} value={"none"}>Nenhuma</option>
    }
    if((!this.props.entity[this.props.property]) && this.props.default) {
      this.props.onChange({
        target: {
          value: this.props.default,
          name: this.props.prefix + this.props.property,
        }
      });
    }
      return (
          <select
            name={this.props.prefix + this.props.property}
            value={this.props.entity[this.props.property] || 'none'}
            onChange={this.props.onChange}
            disabled={!this.props.editing}
            multiple={this.props.multiple}>
            {this.props.optionsLists[this.state.options].map((entity, key) =>
              <option key={key} value={entity._links.self.href || "none"}>
                {this.props.nameGen ? this.props.nameGen(entity) : entity[this.props.nameField || 'name']}
              </option>
            )}
            {none}
          </select>
      );
  }

}
