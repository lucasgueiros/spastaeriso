import axios from 'axios';
import BasicCrud from '../../../../generics/BasicCrud.js';

class PurchaseProductCrud extends BasicCrud{

  constructor () {
    super("purchaseProducts");
  }

  async getOperation () {
    let pps = await super.getOperation();
    for(let i =0; i < pps.length; i++) {
      let pp = {...pps[i]};
      pp = await super.getRelationOperation("input",pp, true);
      pp = await super.getRelationOperation("unit",pp, true);
      pps[i] = pp;
    }
    return pps;
  }

}

export default PurchaseProductCrud;
