import axios from 'axios';
import BasicCrud from '../../../generics/BasicCrud.js';

class TransactionCrud extends BasicCrud{

  constructor () {
    super("transactions");
    this.accountCrud = new BasicCrud("accounts");
  }

  async postOperation (setEntities, entityToSave) {
    entityToSave = await this.accountCrud.postRelationOperation("account",entityToSave);
    super.postOperation(setEntities, entityToSave);
  }

  async putOperation (setEntities, url, entityToSave) {
    entityToSave = await this.accountCrud.putRelationOperation("account",entityToSave);
    super.putOperation(setEntities, url, entityToSave);
  }
}

export default TransactionCrud;
