import React from 'react';

export default class RestrictOptionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    }
    if(props.addOptionsList && props.options) {
      props.addOptionsList(props.options, this.props.nameField);
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.fetchAgain = this.fetchAgain.bind(this);
  }

  componentDidMount () {
    let url = "";
    if(this.props.entity._links){
      if(this.props.relation) {
        url = this.props.entity[this.props.relation] + "/" + this.props.property;
      } else {
        url = this.props.entity._links[this.props.property].href.replace("{?projection}","");
      }
      if(this.props.projection) {
        url = url + "?projection="+this.props.projection;
      }
      this.props.http.get(url).then((response) => {
        this.setState({list: response.data._embedded[this.props.options]});
      }, (error) => {
        console.log(error);
      })
    }
  }

  fetchAgain() {
    let url = "";
    if(this.props.entity._links){
      if(this.props.relation) {
        url = this.props.entity[this.props.relation] + "/" + this.props.property;
      } else {
        url = this.props.entity._links[this.props.property].href.replace("{?projection}","");
      }
      if(this.props.projection) {
        url = url + "?projection="+this.props.projection;
      }
      this.props.http.get(url).then((response) => {
        this.setState({list: response.data._embedded[this.props.options]});
      }, (error) => {
        console.log(error);
      })
    }
  }

  render () {
    return (
      <>
        {
          React.cloneElement(this.props.children, {['fetchAgain' + "_" + this.props.options + "_" + this.props.identifier]: this.fetchAgain, optionsLists: {...this.props.optionsLists,
              [this.props.options + "_" + this.props.identifier]: this.state.list}
          })
        }
      </>
    );
  }

}
