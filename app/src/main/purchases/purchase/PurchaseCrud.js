import axios from 'axios';
import BasicCrud from '../../../generics/BasicCrud.js';
import TransactionCrud from '../../accounting/transaction/TransactionCrud.js';
import PurchaseItemCrud from './item/PurchaseItemCrud.js';
import NfeCrud from './nfe/NfeCrud.js';

class PurchaseCrud extends BasicCrud{

  constructor () {
    super("purchases");
    this.transactionCrud = new TransactionCrud();
    this.providerCrud = new BasicCrud("providers");
    this.itemCrud = new PurchaseItemCrud();
    this.nfeCrud = new NfeCrud("nFeXmls","nFeXmlProjection");
  }

  async getOperation () {
    let purchases = await super.getOperation();
    for(let i =0; i < purchases.length; i++) {
      let purchase = {...purchases[i]};
      purchase = await this.providerCrud.getRelationOperation("provider",purchase, true);
      purchase = await this.transactionCrud.getRelationOperation("transaction",purchase);
      //purchase = await this.nfeCrud.getRelationOperation("nfe",purchase);
      purchase = await this.itemCrud.getToManyRelationOperation("items",purchase);
      purchases[i] = purchase;
    }
    return purchases;
  }

  async postOperation (entityToSave) {
    if(entityToSave.nfe !== undefined){
      entityToSave = await this.nfeCrud.postRelationOperation("nfe",entityToSave);
    }
    // tente recupear por CNPJ
    /*await axios.get("/providers/search/findByCnpj?cnpj="+entityToSave.provider.cnpj)
      .then((response) => {
        entityToSave = {
          ...entityToSave,
          provider: response.data._links.self.href,
        };
      }, async (error) => {
        entityToSave = await this.providerCrud.postRelationOperation("provider",entityToSave);
      });*/
    entityToSave = await this.transactionCrud.postRelationOperation("transaction",entityToSave);
    entityToSave = await this.itemCrud.postToManyRelationOperation("items",entityToSave);
    return super.postOperation(entityToSave);
  }

  async patchOperation (url, entityToSave) {
    entityToSave = await this.nfeCrud.patchRelationOperation("nfe",entityToSave);
    //entityToSave = await this.providerCrud.patchRelationOperation("provider",entityToSave);
    entityToSave = await this.transactionCrud.patchRelationOperation("transaction",entityToSave);
    entityToSave = await this.itemCrud.patchToManyRelationOperation("items",entityToSave);
    return super.patchOperation(url, entityToSave);
  }
}

export default PurchaseCrud;
