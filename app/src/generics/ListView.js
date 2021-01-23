import './ListView.css';
import React from 'react';

class ListView extends React.Component {

  state = {
    entities: [{}]
  };

  componentDidMount () {
    this.props.crud.getOperation(this.setEntities, this.setEntities);
  }

  setEntities(entities) {
    if(entities.length !== 0 ) {
      this.setState({
        entities: entities,
        creating: false,
        editing: false,
      });
    }
  }


  render() {
    return (
      <>
        <h1>ListView</h1>
      </>
    );
  }

}

export default ListView;
