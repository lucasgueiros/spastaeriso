import axios from 'axios';
import BasicCrud from '../../../generics/BasicCrud.js';

class InventoryMovemmentCrud extends BasicCrud{

  constructor () {
    super("inventoryMovemmentCrud");
    this.inventoryMovemmentCrud = new InventoryMovemmentCrud();
    this.unitCrud = new BasicCrud("units");
    // nfe, provider, items, transaction
  }

  async postOperation (setEntities, entityToSave) {
    // Salvando o endereço
    entityToSave = await super.postRelationOperation("enderecos","endereco",entityToSave);
    // Salvando o responsavelTecnico
    entityToSave = await super.postRelationOperation("pessoas","responsavelTecnico",entityToSave);
    super.postOperation(setEntities, entityToSave);
  }

  async putOperation (setEntities, url, entityToSave) {
    entityToSave = await super.putRelationOperation(url, "responsavelTecnico", entityToSave);
    entityToSave = await super.putRelationOperation(url, "endereco", entityToSave);
    super.putOperation(setEntities, url, entityToSave);
  }
}

export default InventoryMovemmentCrud;
