import axios from 'axios';
import BasicCrud from '../../../generics/BasicCrud.js';

class AccountCrud extends BasicCrud{

  constructor () {
    super("accounts");
  }

  async getOperation (setEntities) {
    let accounts = await super.getOperationNoSetEntities();
    for(let i =0; i < accounts.length; i++) {
      let account = {...accounts[i]};
      account = await super.getRelationOperation("motherAccount",account);
      accounts[i] = account;
    }
    setEntities(accounts);
  }
}

export default AccountCrud;
