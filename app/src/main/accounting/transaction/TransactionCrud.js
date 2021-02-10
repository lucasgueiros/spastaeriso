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

  async getMyRelationsOperation(transaction) {
    transaction = await this.typeCrud.getRelationOperation("type",transaction, true);
    transaction = await this.modalityCrud.getRelationOperation("modality",transaction, true);
    transaction = await this.entryCrud.getToManyRelationOperation("entries",transaction);
    return transaction;
  }

  async getOperation() {
    let transactions = await super.getOperation();
    let i = 0;
    for(; i < transactions.length; i++ ){
      transactions[i] = await this.typeCrud.getRelationOperation("type",transactions[i], true);
      transactions[i] = await this.modalityCrud.getRelationOperation("modality",transactions[i], true);
      transactions[i] = await this.entryCrud.getToManyRelationOperation("entries",transactions[i]);
    }
    return transactions;
  }

  async getRelationOperation (relationName, entity) {
    let toReturn = await super.getWithUrlOperation(entity._links[relationName].href);
    toReturn = await this.typeCrud.getRelationOperation("type",toReturn, true);
    toReturn = await this.modalityCrud.getRelationOperation("modality",toReturn, true);
    toReturn = await this.entryCrud.getToManyRelationOperation("entries",toReturn);
    entity = {
      ...entity,
      [relationName]: toReturn,
    }
    return entity;
  }

  async postOperation (entity) {
    entity = await this.entryCrud.postToManyRelationOperation("entries",entity);
    return await super.postOperation(entity);
  }

  async postRelationOperation(relationName, entityToSave) {
    let relation = await this.entryCrud.postToManyRelationOperation("entries",entityToSave[relationName]);
    entityToSave = {
      ...entityToSave,
      [relationName]: relation
    };
    return await super.postRelationOperation(relationName, entityToSave);
  }

  async patchOperation (url, entity) {
    entity = await this.entryCrud.patchToManyRelationOperation("entries",entity);
    return await super.patchOperation(url, entity);
  }
}

export default TransactionCrud;
