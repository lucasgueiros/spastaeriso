import axios from 'axios';
import React from 'react';


class Datalist extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      datalist: [],
      updater: 0
    }
  }
  render() {
    if(this.state.updater < this.props.updater) {
      axios.get(this.props.name).then( (response) => {
        this.setState({
          datalist: response.data._embedded[this.props.name],
        });
        this.setState({
          updater: this.props.updater
        });
      }, (error) => {
        console.log(error)
      });
    }
    return (
      <datalist id={this.props.name + "-datalist"}>
        {this.state.datalist.map((entity, key) =>
          <option key={key} value={entity[this.props.propertyName]} />
        )}
      </datalist>
    );
  }

}

export default Datalist;
