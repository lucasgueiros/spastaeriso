import axios from 'axios';
import BasicCrud from '../../../old_generics/BasicCrud.js';

class InventoryMovemmentCrud extends BasicCrud{

  constructor () {
    super("inventoryMovements");
    this.inputCrud = new BasicCrud("inputs");
  	this.unitCrud = new BasicCrud("units");
  }

  async getRelationOperation(relationName, entity) {
    let im = await super.getWithUrlOperation(entity._links[relationName].href);
    im = await this.inputCrud.getRelationOperation("input",im,true);
    im = await this.unitCrud.getRelationOperation("unit",im,true);
    entity = {
      ...entity,
      [relationName]: im,
    }
    return entity;
  }

  /*async postRelationOperation (relationName, entityToSave) {
    //const unit = await axios.get("/units/search/findByNameIgnoreCase?name="+entityToSave[relationName].unit.name);
    //const input = await axios.get("/inputs/search/findByName?name="+entityToSave[relationName].input.name);
    entityToSave = {
      ...entityToSave,
      [relationName]: {
        ...entityToSave[relationName],
        input: input.data._links.self.href,
      }

    };
    return await super.postRelationOperation(relationName, entityToSave);
  }*/

  /*async patchOperation (url, entityToSave) {
    entityToSave = await super.patchRelationOperation(url, "responsavelTecnico", entityToSave);
    entityToSave = await super.patchRelationOperation(url, "endereco", entityToSave);
    super.patchOperation(url, entityToSave);
  }*/
}

export default InventoryMovemmentCrud;
