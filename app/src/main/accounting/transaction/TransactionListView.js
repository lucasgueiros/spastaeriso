import './TransactionListView.css';
import React from 'react';
import ListView from '../../../generics/ListView.js';
import BasicCrud from '../../../generics/BasicCrud.js';
import SimplerTransaction from './SimplerTransaction.js';

class TransactionListView extends React.Component {

  render() {
    return (
      <>
        <ListView crud={new BasicCrud("transactions")}>
          <SimplerTransaction/>
        </ListView>
      </>
    );
  }

}

export default TransactionListView;
