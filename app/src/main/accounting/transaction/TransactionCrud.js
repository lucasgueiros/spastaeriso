import axios from 'axios';
import BasicCrud from '../../../generics/BasicCrud.js';
import EntryCrud from '../entry/EntryCrud.js';

class TransactionCrud extends BasicCrud{

  constructor () {
    super("transactions");
    this.accountCrud = new BasicCrud("accounts");
    this.typeCrud = new BasicCrud("transactionTypes");
    this.modalityCrud = new BasicCrud("transactionModalities");
    this.entryCrud = new EntryCrud();
  }

  async getOperation() {
    let transactions = await super.getOperation();
    let i = 0;
    for(; i < transactions.length; i++ ){
      transactions[i] = await this.typeCrud.getRelationOperation("type",transactions[i]);
      transactions[i] = await this.modalityCrud.getRelationOperation("modality",transactions[i]);
      transactions[i] = await this.entryCrud.getToManyRelationOperation("entries",transactions[i]);
    }
    return transactions;
  }

  async getRelationOperation (relationName, entity) {
    let toReturn = await super.getWithUrlOperation(entity._links[relationName].href);
    toReturn = await this.accountCrud.getRelationOperation("account",toReturn);
    entity = {
      ...entity,
      [relationName]: toReturn,
    }
    return entity;
  }

  async postOperation (setEntities, entityToSave) {
    entityToSave = await this.accountCrud.postRelationOperation("account",entityToSave);
    super.postOperation(setEntities, entityToSave);
  }

  async postRelationOperation(relationName, entityToSave) {
    const account = await axios.get("/accounts/search/findByNameIgnoreCase?name="+entityToSave[relationName].account.name);
    if(account) {
      entityToSave = {
        ...entityToSave,
        [relationName]: {
          ...entityToSave[relationName],
          account: account.data._links.self.href
        }
      };
    } else {
      entityToSave = await this.accountCrud.postRelationOperation("account",entityToSave[relationName]);
    }
    return await super.postRelationOperation(relationName, entityToSave);
  }

  async putOperation (setEntities, url, entityToSave) {
    entityToSave = await this.accountCrud.putRelationOperation("account",entityToSave);
    super.putOperation(setEntities, url, entityToSave);
  }
}

export default TransactionCrud;
