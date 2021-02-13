import BasicCrud from '../../../../generics/BasicCrud.js';

class ItemCrud extends BasicCrud{

  constructor () {
    super("items");
    this.unitCrud = new BasicCrud("units");
    this.inputCrud = new BasicCrud("inputs");
  }

  async getRelationWithIndexOperation(index, relationName, entity) {
    let item = {...entity[relationName][index]};
    item = await this.unitCrud.getRelationOperation("unit",item,true);
    item = await this.inputCrud.getRelationOperation("input",item,true);
    entity[relationName][index] = item;
    return entity;
  }

}

export default ItemCrud;
