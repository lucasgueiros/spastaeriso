import React from 'react';

export default class SufixOptionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
    if(props.addOptionsList && props.options) {
      props.addOptionsList(props.options, this.props.nameField);
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount () {
    let url = "";
    url = "/" + this.props.options;

      if(this.props.projection) {
        url = url + "?projection="+this.props.projection;
      }
      this.props.http.get(url).then((response) => {
        this.setState({list: response.data._embedded[this.props.options]});
      }, (error) => {
        console.log(error);
      })
  }

  render () {
    return (
      <>
        {
          React.cloneElement(this.props.children, {optionsLists: {...this.props.optionsLists,
              [this.props.options + "_" + this.props.identifier]: this.state.list}
          })
        }
      </>
    );
  }

}
