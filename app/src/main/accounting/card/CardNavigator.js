import React from 'react';
import Card from './Card.js';
import Navigator from '../../../generics/Navigator.js';
import CardCrud from './CardCrud.js';
import axios from 'axios';

class CardNavigator extends React.Component {
  render() {
    return (
      <div className="card-navigator">
        <Navigator crud={new CardCrud()} optionsLists={['accounts']}>
          <Card prefix="" />
        </Navigator>
      </div>
    );
  }

}

export default CardNavigator;
