import React from 'react';

export default class RadioComponentSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      options: this.props.options
    }
    if(props.restricted) {
      this.state.options = props.options + "_" + props.restricted;
    }
    if(props.addOptionsList && this.state.options && this.props.optionsLists[this.state.options] == undefined) {
      props.addOptionsList(props.options, this.props.nameField);
    }
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
        if(options[i]._links.self.href === this.props.entity[this.props.property]){
          selecteds[i] = true;
        }
      }
    }

    if(!this.props.editing) {
      if(this.props.entity[this.props.property] == null) {
        return <>Nenhum{this.props.separator}</>;
      } else {

        let entity = null;
        for(let i = 0; i < options.length; i++ ){
          if(selecteds[i]) {
            entity = options[i];
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

    if(this.props.useDefault && !(selecteds.reduce((a,b) => a || b))) {
      this.props.onChange((e) => {
        return {target: {
          type: 'radio',
          checked: true,
          name: this.props.prefix + this.props.property
        }}
      });
    }

    let none = <></>;
    if(!this.props.notNull) {
      none =<> <input
                type="radio"
                name={this.props.prefix + this.props.property}
                checked={selecteds[options.length]}
                key={options.length}
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
      {options.map((entity, index) =>
        React.cloneElement(this.props.view, {...this.props,
        entity: entity || {},
        children: (
            <input
              type="radio"
              name={this.props.prefix + this.props.property}
              checked={selecteds[index]}
              value={options[index]._links.self.href}
              onChange={this.props.onChange}/>
        ),
        prefix: this.props.prefix + this.props.property + "."})
      )}
      {this.props.separator}
      </>
    );
  }

}
