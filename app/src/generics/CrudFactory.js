import Crud from './Crud.js';

export class CrudFactory {

  constructor (modelDescription, http) {
    this.modelDescription = modelDescription;
    this.http = http;
    this.cruds = [];
  }
  get(name) {
    if(!this.cruds.hasOwnProperty(name)){
      if(this.modelDescription[name] == undefined || this.modelDescription[name] == null) {
        this.cruds[name] = new Crud(name, [], this.http, this);
      } else if(this.modelDescription[name].relations instanceof Array ) {
        this.cruds[name] = new Crud(name, this.modelDescription[name], this.http, this);
      } else {
        this.cruds[name] = this.modelDescription[name];
      }
    }
    return this.cruds[name];
  }

}
