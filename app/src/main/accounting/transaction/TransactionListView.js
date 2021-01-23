import './TransactionListView.css';
import React from 'react';
import ListView from '../../../generics/ListView.js';
import TransactionCrud from './TransactionCrud.js';
import SimplerTransaction from './SimplerTransaction.js';
import axios from 'axios';

class TransactionListView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      typesOptionsList: [{}],
      modalitiesOptionsList: [{}],
    }
    this.updateOptionsLists = this.updateOptionsLists.bind(this);
  }

  componentDidMount() {
    this.updateOptionsLists()
  }

  updateOptionsLists() {
    axios.get("transactionTypes")
      .then((response) => {
        this.setState({
            typesOptionsList: response.data._embedded.transactionTypes,
        })
      }, (error) => {
        console.log(error);
      });
    axios.get("transactionModalities")
      .then((response) => {
        this.setState({
            modalitiesOptionsList: response.data._embedded.transactionModalities,
        })
      }, (error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <>
        <h3>Transações</h3>
        <table>
          <ListView crud={new TransactionCrud()}>
            <SimplerTransaction
              typesOptionsList={this.state.typesOptionsList}
              modalitiesOptionsList={this.state.modalitiesOptionsList}/>
          </ListView>
        </table>
      </>
    );
  }

}

export default TransactionListView;
