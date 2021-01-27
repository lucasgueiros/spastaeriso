import axios from 'axios';
import BasicCrud from '../../../generics/BasicCrud.js';

class AccountCrud extends BasicCrud{

  constructor () {
    super("accounts");
  }

  async getOperation () {
    let accounts = await super.getOperation();
    for(let i =0; i < accounts.length; i++) {
      let account = {...accounts[i]};
      account = await super.getRelationOperation("motherAccount",account, true);
      accounts[i] = account;
    }
    return accounts;
  }
}

export default AccountCrud;
