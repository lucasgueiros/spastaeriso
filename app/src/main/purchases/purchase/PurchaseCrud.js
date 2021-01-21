import axios from 'axios';
import BasicCrud from '../../../generics/BasicCrud.js';
import TransactionCrud from '../../finances/transaction/TransactionCrud.js';
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

  async getOperation (setEntities) {
    let purchases = await super.getOperationNoSetEntities();
    for(let i =0; i < purchases.length; i++) {
      let purchase = {...purchases[i]};
      purchase = await this.providerCrud.getRelationOperation("provider",purchase);
      purchase = await this.transactionCrud.getRelationOperation("transaction",purchase);
      purchase = await this.nfeCrud.getRelationOperation("nfe",purchase);
      let items = await super.getWithUrlOperation(purchase._links.items.href);
      purchase = {...purchase, items: items._embedded.purchaseItems};
      for(let j =0; j < purchase.items.length; j++) {
        purchase = await this.itemCrud.getRelationsWithIndexOperation(j,"items",purchase);
      }
      purchases[i] = purchase;
    }
    setEntities(purchases);
  }

  async postOperation (setEntities, entityToSave) {
    entityToSave = await this.nfeCrud.postRelationOperation("nfe",entityToSave);
    // tente recupear por CNPJ
    await axios.get("/providers/search/findByCnpj?cnpj="+entityToSave.provider.cnpj)
      .then((response) => {
        entityToSave = {
          ...entityToSave,
          provider: response.data._links.self.href,
        };
      }, async (error) => {
        entityToSave = await this.providerCrud.postRelationOperation("provider",entityToSave);
      });
    entityToSave = await this.transactionCrud.postRelationOperation("transaction",entityToSave);
    let items = [...entityToSave.items];
    for(let i =0; i < items.length; i++) {
      entityToSave = await this.itemCrud.postRelationOperation(i,"items",entityToSave);
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
