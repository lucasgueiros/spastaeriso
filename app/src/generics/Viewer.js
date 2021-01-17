import './Viewer.css';
import React from 'react';
import axios from 'axios';

class Viewer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      entity: {},
      creating: false,
      editing: false,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount () {
    //if(this.props.url !== '') {
      this.refresh();
    //}
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let entity = {
      ...this.state.entity,
      [name]: value,
    };
    this.setState({entity});
  }

  refresh () {
    axios.get(this.props.url)
      .then( (response) => {
        this.setState({
          entity: response.data,
          creating: false,
          editing: false,
        });
      }, (error) => {
        console.log(error);
      });
  }

  render () {
    const Entity =  this.props.entityComponent;
    return (
      <div className="Viewer">
        <Entity
          entity={this.state.entity}
          editing={this.props.editing}
          creating={this.props.creating}
          onChange={this.handleInputChange}/>
      </div>
    );
  }

}

export default Viewer;
