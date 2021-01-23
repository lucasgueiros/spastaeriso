import './ListView.css';
import React from 'react';

class ListView extends React.Component {

  state = {
    entities: [{}]
  };

  componentDidMount () {
    this.props.crud.getOperation().then(
      (r) => {
        this.setEntities(r);
      }
    );
  }

  setEntities(entities) {
    if(entities.length !== 0 ) {
      this.setState({
        entities: entities,
      });
    }
  }


  render() {
    const listEntities = this.state.entities.map ((entity,index) =>
      <>
        {React.cloneElement(this.props.children, {
          entity: entity,
          editing: this.state.editing,
          onChange: this.handleInputChange
         })}
      </>);
    return (
      <tbody>
        {listEntities}
      </tbody>
    );
  }

}

export default ListView;
