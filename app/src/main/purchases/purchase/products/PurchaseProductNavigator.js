import React from 'react';
import './PurchaseProductNavigator.css';
import PurchaseProduct from './PurchaseProduct.js';
import Navigator from '../../../../generics/Navigator.js';
import PurchaseProductCrud from './PurchaseProductCrud.js';
import axios from 'axios';

class PurchaseProductNavigator extends React.Component {

  render() {
    return (
      <div className="account-navigator">
        <Navigator crud={new PurchaseProductCrud()} optionsLists={['inputs','units']}>
          <PurchaseProduct prefix="">

          </PurchaseProduct>
        </Navigator>
      </div>
    );
  }

}

export default PurchaseProductNavigator;
