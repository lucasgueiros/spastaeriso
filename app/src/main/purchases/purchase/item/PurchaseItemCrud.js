import BasicCrud from '../../../../generics/BasicCrud.js';
import InventoryMovemmentCrud from '../../inventory/InventoryMovemmentCrud.js';

class PurchaseItemCrud extends BasicCrud{

  constructor () {
    super("purchaseItems");
    this.inventoryMovemmentCrud = new InventoryMovemmentCrud();
    this.unitCrud = new BasicCrud("units");
    // nfe, provider, items, transaction
  }

  async getRelationsWithIndexOperation(index, relationName, entity) {
    let item = {...entity[relationName][index]};
    item = await this.unitCrud.getRelationOperation("unit",item);
    item = await this.inventoryMovemmentCrud.getRelationOperation("inventoryMovement",item);
    entity[relationName][index] = item;
    return entity;
  }

  async postRelationOperation (index, relationName, entityToSave) {
    //const unit = await axios.get("/units/search/findByNameIgnoreCase?name="+entityToSave[relationName][index].unit.name);
    entityToSave[relationName][index].inventoryMovement.unit = entityToSave[relationName][index]._links.unit.href;
    entityToSave[relationName][index] = await this.inventoryMovemmentCrud.postRelationOperation("inventoryMovement",entityToSave[relationName][index]);
    const r = {
      ...entityToSave[relationName][index],
      unit: entityToSave[relationName][index]._links.unit.href,
    };
    entityToSave[relationName][index] = r;
    const result = await super.postRelationOperation(index, entityToSave[relationName])
    entityToSave = {
      ...entityToSave,
      [relationName]: result
    }
    return entityToSave;
  }

  async patchOperation (setEntities, url, entityToSave) {
    super.patchOperation(setEntities, url, entityToSave);
  }
}

export default PurchaseItemCrud;
