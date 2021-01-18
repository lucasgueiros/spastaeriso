import axios from 'axios';
import BasicCrud from '../../../generics/BasicCrud.js';
import TransactionCrud from '../../finances/transaction/TransactionCrud.js';
import PurchaseItemCrud from './item/PurchaseItemCrud.js';

class PurchaseCrud extends BasicCrud{

  constructor () {
    super("purchases");
    this.transactionCrud = new TransactionCrud();
    this.providerCrud = new BasicCrud("providers");
    //this.itemCrud = new PurchaseItemCrud();
    this.nfeCrud = new BasicCrud("nfes");
    // nfe, provider, items, transaction
  }

  async postOperation (setEntities, entityToSave) {
    entityToSave = await this.nfeCrud.postRelationOperation("nfe",entityToSave);
    entityToSave = await this.providerCrud.postRelationOperation("provider",entityToSave);
    entityToSave = await this.transactionCrud.postRelationOperation("transaction",entityToSave);
    entityToSave = {
      ...entityToSave,
      items: []
    }
    super.postOperation(setEntities, entityToSave);
  }

  async putOperation (setEntities, url, entityToSave) {
    entityToSave = await this.nfeCrud.putRelationOperation("nfe",entityToSave);
    entityToSave = await this.providerCrud.putRelationOperation("provider",entityToSave);
    entityToSave = await this.transactionCrud.putRelationOperation("transaction",entityToSave);
    entityToSave = {
      ...entityToSave,
      items: []
    }
    super.putOperation(setEntities, url, entityToSave);
  }
}

export default PurchaseCrud;
