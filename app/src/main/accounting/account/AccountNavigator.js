import React from 'react';
import './AccountNavigator.css';
import Account from './Account.js';
import Navigator from '../../../generics/Navigator.js';
import BasicCrud from '../../../generics/BasicCrud.js';
import AccountCrud from './AccountCrud.js';
import axios from 'axios';

class AccountNavigator extends React.Component {
  render() {
    return (
      <div className="account-navigator">
        <Navigator crud={new AccountCrud()}>
          <Account prefix="" />
        </Navigator>
      </div>
    );
  }

}

export default AccountNavigator;
