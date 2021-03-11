import React from 'react';

export default class RadioComponentSelect extends React.Component {

  constructor(props) {
    super(props);
    if(props.addOptionsList && props.options) {
      props.addOptionsList(props.options, this.props.nameField);
    }
  }

  render() {
    if(this.props.optionsLists == undefined || this.props.optionsLists[this.props.options] == undefined){
      return <>Carregando...</>;
    }

    let selecteds = [];
    selecteds.fill(false,0,this.props.optionsLists[this.props.options].length+1);

    if(this.props.entity[this.props.property] == null) {
      selecteds[this.props.optionsLists[this.props.options].length] = true;
    } else {
      for(let i = 0; i < this.props.optionsLists[this.props.options].length ; i++) {
        if(this.props.optionsLists[this.props.options][i]._links.self.href = this.props.entity[this.props.property]){
          selecteds[i] = true;
        }
      }
    }

    if(!this.props.editing) {
      if(this.props.entity[this.props.property] == null) {
        return <>Nenhum{this.props.separator}</>;
      } else {

        let entity = null;
        for(let i = 0; i < this.props.optionsLists[this.props.options].length; i++ ){
          if(selecteds[i]) {
            entity = this.props.optionsLists[this.props.options][i];
          }
        }
        return (
          <>
          {
            React.cloneElement(this.props.view, {...this.props,
            entity: entity || {},
            prefix: this.props.prefix + this.props.property + ".",})
          }
          {this.props.separator}
          </>
        );
      }
    }

    let none = <></>;
    if(!this.props.notNull) {
      none =<> <input
                type="radio"
                name={this.props.prefix + this.props.property}
                checked={selecteds[this.props.optionsLists[this.props.options].length]}
                key={this.props.optionsLists[this.props.options].length}
                value={"none"}
                onChange={this.props.onChange}
                />
                Nenhum
                {this.props.separator}
                </>
    }



    return (
      <>
      {none}
      {this.props.optionsLists[this.props.options].map((entity, index) =>
        React.cloneElement(this.props.view, {...this.props,
        entity: entity || {},
        children: (
            <input
              type="radio"
              name={this.props.prefix + this.props.property}
              checked={selecteds[index]}
              value={this.props.optionsLists[this.props.options][index]._links.self.href}
              onChange={this.props.onChange}/>
        ),
        prefix: this.props.prefix + this.props.property + "."})
      )}
      {this.props.separator}
      </>
    );
  }

}
