import BasicCrud from '../../../../old_generics/BasicCrud.js';

class WorkingTimeCrud extends BasicCrud{

  constructor () {
    super("functionaryWorkingTimes");
    this.functionaryFunctionCrud = new BasicCrud("functionaryFunctions");
  }

  async getRelationWithIndexOperation(index, relationName, entity) {
    let item = {...entity[relationName][index]};
    item = await this.functionaryFunctionCrud.getRelationOperation("functionaryFunction",item,true);
    entity[relationName][index] = item;
    return entity;
  }

}

export default WorkingTimeCrud;
