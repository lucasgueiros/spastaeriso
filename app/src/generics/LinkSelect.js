import './SimplerLinkSelect.css';
import React from 'react';

export default class LinkSelect extends React.Component {

  constructor(props) {
    super(props);
    if(props.addOptionsList && props.options) {
      props.addOptionsList(props.options);
    }
  }

  render() {
    if(this.props.optionsLists == undefined || this.props.optionsLists[this.props.options] == undefined){
      return <>Carregando...</>;
    }
    let none = <></>;
    if(this.props.notNull) {
      none = <option key={-1} value={"none"}>Nenhuma</option>
    }
      return (
          <select
            name={this.props.prefix + this.props.property}
            value={this.props.entity[this.props.property] || 'none'}
            onChange={this.props.onChange}
            disabled={!this.props.editing}
            multiple={this.props.multiple}>
            {this.props.optionsLists[this.props.options].map((entity, key) =>
              <option key={key} value={entity._links.self.href || "none"}>{entity[this.props.nameField || 'name']}</option>
            )}
            {none}
          </select>
      );
  }

}
