import './TransactionListView.css';
import React from 'react';
import ListView from '../../../generics/ListView.js';
import TransactionCrud from './TransactionCrud.js';
import SimplerTransaction from './SimplerTransaction.js';
import axios from 'axios';

class TransactionListView extends React.Component {

  constructor(props) {
    super(props);
    this.transactionCrud = new TransactionCrud();
  }

//transactionTypes, transactionModalities, accounts
  render() {
    return (
      <>
        <h3>Transações</h3>
        <table>
          <ListView entity="genericTransactions" view={<SimplerTransaction/>} />
        </table>
      </>
    );
  }

}

export default TransactionListView;
