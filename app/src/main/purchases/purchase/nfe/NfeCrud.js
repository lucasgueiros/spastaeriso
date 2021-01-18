import axios from 'axios';
import BasicCrud from '../../../../generics/BasicCrud.js';

class PurchaseCrud extends BasicCrud{

  constructor () {
    super("purchases");
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
    entityToSave = await super.putRelationOperation(url, "responsavelTecnico", entityToSave);
    entityToSave = await super.putRelationOperation(url, "endereco", entityToSave);
    super.putOperation(setEntities, url, entityToSave);
  }
}

export default PurchaseCrud;
