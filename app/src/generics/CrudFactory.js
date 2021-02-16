import ModelDescription from '../ModelDescription.js';
import Crud from './Crud.js';
import BasicCrud from './BasicCrud.js';

export default {

  cruds: [],

  get(name) {
    if(!this.cruds.hasOwnProperty(name)){
      if(ModelDescription[name] == undefined || ModelDescription[name] == null) {
        this.cruds[name] = new Crud(name, []);
      } else if(ModelDescription[name] instanceof Array ) {
        this.cruds[name] = new Crud(name, ModelDescription[name]);
      } else {
        this.cruds[name] = ModelDescription[name];
      }
    }
    return this.cruds[name];
  }

}
