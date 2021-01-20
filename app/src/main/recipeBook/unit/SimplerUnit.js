import './SimplerUnit.css';
import React from 'react';
import axios from 'axios';

class SimplerUnit extends React.Component {

  state = {
    datalist: [],
  };

  componentDidMount () {
    axios.get("units").then( (response) => {
      this.setState({
        datalist: response.data._embedded.units,
      });
    }, (error) => {
      console.log(error);
    })
  }

  render () {
    return (
      <div class-name="simpler-unit">
        <input
          name={this.props.prefix + "name"}
          type="text"
          value={this.props.entity.name || ''}
          onChange={this.props.onChange}
          readOnly={!this.props.editing}
          list="units-datalist"></input>
        <datalist id="units-datalist">
          {this.state.datalist.map((unit, key) =>
            <option key={key} value={unit.name} />
          )}
        </datalist>

      </div>
    );
  }

}

export default SimplerUnit;
