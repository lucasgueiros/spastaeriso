import axios from 'axios';
import BasicCrud from '../../../generics/BasicCrud.js';
import AccountCrud from '../account/AccountCrud.js';

class EntryCrud extends BasicCrud{

  constructor () {
    super("entries");
    this.accountCrud = new AccountCrud();
  }

  async getRelationWithIndexOperation(index, relationName, entity) {
    let toReturn;
    let entry;
    await axios.get(entity[relationName][index]._links.self.href.replace("{?projection}",""))
      .then( (response) => {
        entry = response.data;
      }, (error) => {
        console.log(error);
        toReturn = {
          ...entity,
          [relationName]: {}
        }
      });
    // recuperando os elementos proprios do entry (account)
    entry = await this.accountCrud.getRelationOperation("account",entry);

    let arrayCopy = [...entity[relationName]];
    arrayCopy[index] = entry;
    toReturn = {
      ...entity,
      [relationName]: arrayCopy
    }
    return toReturn;
  }
}

export default EntryCrud;
