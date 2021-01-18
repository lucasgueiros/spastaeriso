import axios from 'axios';
import BasicCrud from '../../../../generics/BasicCrud.js';
import InventoryMovemmentCrud from '../../inventory/InventoryMovemmentCrud.js';

class PurchaseItemCrud extends BasicCrud{

  constructor () {
    super("purchaseItems");
    this.inventoryMovemmentCrud = new InventoryMovemmentCrud();
    this.unitCrud = new BasicCrud("units");
    // nfe, provider, items, transaction
  }

  async postOperation (setEntities, entityToSave) {
    super.postOperation(setEntities, entityToSave);
  }

  async putOperation (setEntities, url, entityToSave) {
    super.putOperation(setEntities, url, entityToSave);
  }
}

export default PurchaseItemCrud;
