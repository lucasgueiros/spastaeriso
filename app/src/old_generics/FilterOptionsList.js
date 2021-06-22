import React from 'react';

export class FilterOptionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
    /*if(props.addOptionsList && props.options) {
      props.addOptionsList(props.options, this.props.nameField);
    }*/
  }

  render () {
    let url = "";
    let list = [];
    if(this.props.filter && this.props.options){
      let size = this.props.optionsLists[this.props.options].length;
      for(let i=0; i < size; i++) {
        let o = this.props.optionsLists[this.props.options][i];
        if(this.props.filter(o)) {
          list.push(o);
        }
      }
    }
    return (
      <>
        {
          React.cloneElement(this.props.children, {optionsLists: {...this.props.optionsLists,
              [this.props.options + "_" + this.props.identifier]: list}
          })
        }
      </>
    );
  }

}
