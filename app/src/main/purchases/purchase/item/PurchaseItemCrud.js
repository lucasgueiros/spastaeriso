import axios from 'axios';
import BasicCrud from '../../../../generics/BasicCrud.js';
import InventoryMovemmentCrud from '../../inventory/InventoryMovemmentCrud.js';
import React from 'react';

class PurchaseItemCrud extends BasicCrud{

  constructor () {
    super("purchaseItems");
    this.inventoryMovemmentCrud = new InventoryMovemmentCrud();
    this.unitCrud = new BasicCrud("units");
    // nfe, provider, items, transaction
  }

  async postRelationOperation (index, relationName, entityToSave) {
    const unit = await axios.get("/units/search/findByNameIgnoreCase?name="+entityToSave[relationName][index].unit.name);
    entityToSave[relationName][index].inventoryMovement.unit = unit.data._links.self.href;
    entityToSave[relationName][index] = await this.inventoryMovemmentCrud.postRelationOperation("inventoryMovement",entityToSave[relationName][index]);
    const r = {
      ...entityToSave[relationName][index],
      unit: unit.data._links.self.href,
    };
    entityToSave[relationName][index] = r;
    const result = await super.postRelationOperation(index, entityToSave[relationName])
    entityToSave = {
      ...entityToSave,
      [relationName]: result
    }
    return entityToSave;
  }

  async putOperation (setEntities, url, entityToSave) {
    super.putOperation(setEntities, url, entityToSave);
  }
}

export default PurchaseItemCrud;
