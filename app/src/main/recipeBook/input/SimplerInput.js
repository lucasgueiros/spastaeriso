import './SimplerInput.css';
import React from 'react';
import axios from 'axios';

class SimplerInput extends React.Component {

  state = {
    datalist: [],
  };

  componentDidMount () {
    axios.get("inputs").then( (response) => {
      this.setState({
        datalist: response.data._embedded.inputs,
      });
    }, (error) => {
      console.log(error);
    })
  }

  render () {
    return (
      <div class-name="simpler">
        <input
          name={this.props.prefix + "name"}
          type="text"
          value={this.props.entity.name || ''}
          onChange={this.props.onChange}
          readOnly={!this.props.editing}
          list="inputs-datalist"></input>
        <datalist id="inputs-datalist">
          {this.state.datalist.map((input, key) =>
            <option key={key} value={input.name} />
          )}
        </datalist>

      </div>
    );
  }

}

export default SimplerInput;
