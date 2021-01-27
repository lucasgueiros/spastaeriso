import React from 'react';
import './AccountNavigator.css';
import Account from './Account.js';
import Navigator from '../../../generics/Navigator.js';
import BasicCrud from '../../../generics/BasicCrud.js';
import AccountCrud from './AccountCrud.js';
import axios from 'axios';

class AccountNavigator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      accountOptionsList: []
    };
    this.updateOptionsLists = this.updateOptionsLists.bind(this);
  }

  componentDidMount () {
    this.updateOptionsLists();
  }

  updateOptionsLists () {
    axios.get("accounts").then( (response) => {
      this.setState({
        accountOptionsList: response.data._embedded.accounts,
      });
    }, (error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="account-navigator">
        <Navigator crud={new AccountCrud()}>
          <Account prefix="" accountOptionsList={this.state.accountOptionsList}/>
        </Navigator>
      </div>
    );
  }

}

export default AccountNavigator;
