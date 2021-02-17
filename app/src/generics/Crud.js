import BasicCrud from './BasicCrud.js';
import CrudFactory from './CrudFactory.js';
import axios from 'axios';

export default class Crud extends BasicCrud {

  constructor(name, description) {
    super(name);
    this.description = description;
  }

  async getOperation () {
    let entities = await super.getOperation();
    for(let i =0; i < entities.length; i++) {
      let entity = {...entities[i]};
      for(let j=0; j < this.description.length; j++) {
        let relation = this.description[j];
        switch(relation.type) {
          case 'oneToOne':
            entity = await CrudFactory.get(relation.entity).getRelationOperation(relation.name,entity);
            break;
          case 'manyToOneLink':
            entity = await CrudFactory.get(relation.entity).getRelationOperation(relation.name,entity, true);
            break;
          case 'oneToMany':
            entity = await CrudFactory.get(relation.entity).getToManyRelationOperation(relation.name,entity);
            break;
        }
      }
      entities[i] = entity;
    }
    return entities;
  }

  async getRelationOperation (relation, owner, urlOnly) {
    let entity = await super.getWithUrlOperation(owner._links[relation].href);
    if(entity == undefined || entity._links == undefined) {
      console.log(entity);
      return owner;
    }
    if(urlOnly) {
      owner = {
        ...owner,
        [relation]: entity._links.self.href,
      }
      return owner;
    }

    for(let j=0; j < this.description.length; j++) {
      let relation = this.description[j];
      switch(relation.type) {
        case 'oneToOne':
          entity = await CrudFactory.get(relation.entity).getRelationOperation(relation.name,entity);
          break;
        case 'manyToOneLink':
          entity = await CrudFactory.get(relation.entity).getRelationOperation(relation.name,entity, true);
          break;
        case 'oneToMany':
          entity = await CrudFactory.get(relation.entity).getToManyRelationOperation(relation.name,entity);
          break;
      }
    }
    owner = {
      ...owner,
      [relation]: entity,
    }
    return owner;
  }

  async getRelationWithIndexOperation(index, relation, owner) {
    let entity;
    await axios.get(owner[relation][index]._links.self.href.replace("{?projection}",""))
      .then( (response) => {
        entity = response.data;
      }, (error) => {
        console.log(error);
        owner = {
          ...owner,
          [relation]: {}
        }
      });
    // recuperando os elementos proprios da entity

    for(let j=0; j < this.description.length; j++) {
      let relation = this.description[j];
      switch(relation.type) {
        case 'oneToOne':
          entity = await CrudFactory.get(relation.entity).getRelationOperation(relation.name,entity);
          break;
        case 'manyToOneLink':
          entity = await CrudFactory.get(relation.entity).getRelationOperation(relation.name,entity, true);
          break;
        case 'oneToMany':
          entity = await CrudFactory.get(relation.entity).getToManyRelationOperation(relation.name,entity);
          break;
      }
    }

    let arrayCopy = [...owner[relation]];
    arrayCopy[index] = entity;
    owner = {
      ...owner,
      [relation]: arrayCopy
    }
    return owner;
  }

  async postOperation (entity) {
    for(let j=0; j < this.description.length; j++) {
      let relation = this.description[j];
      switch(relation.type) {
        case 'oneToOne':
          entity = await CrudFactory.get(relation.entity).postRelationOperation(relation.name,entity);
          break;
        case 'manyToOneLink':
          // ignore
          break;
        case 'oneToMany':
          entity = await CrudFactory.get(relation.entity).postToManyRelationOperation(relation.name,entity);
          break;
      }
    }
    return super.postOperation(entity);
  }

  async postRelationOperation(relationName, owner) {
    let entity = owner[relationName];
    for(let j=0; j < this.description.length; j++) {
      let relation = this.description[j];
      switch(relation.type) {
        case 'oneToOne':
          entity = await CrudFactory.get(relation.entity).postRelationOperation(relation.name,entity);
          break;
        case 'manyToOneLink':
          // ignore
          break;
        case 'oneToMany':
          entity = await CrudFactory.get(relation.entity).postToManyRelationOperation(relation.name,entity);
          break;
      }
    }
    owner = {
      ...owner,
      [relationName]: entity
    };
    return await super.postRelationOperation(relationName, owner);
  }

  async patchOperation (url, entity) {
    for(let j=0; j < this.description.length; j++) {
      let relation = this.description[j];
      switch(relation.type) {
        case 'oneToOne':
          entity = await CrudFactory.get(relation.entity).patchRelationOperation(relation.name,entity);
          break;
        case 'manyToOneLink':
          // ignore
          break;
        case 'oneToMany':
          entity = await CrudFactory.get(relation.entity).patchToManyRelationOperation(relation.name,entity);
          break;
      }
    }
    return super.patchOperation(url, entity);
  }

}
