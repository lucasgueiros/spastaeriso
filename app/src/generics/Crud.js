import BasicCrud from './BasicCrud.js';

export default class Crud extends BasicCrud {

  constructor(name, description, http, crudFactory) {
    super(name, http);
    this.crudFactory = crudFactory;
    this.description = description;
    if(this.description.sufix == null || this.description.sufix == undefined) {
      this.description.sufix = "";
    }
    this.getCrud = this.getCrud.bind(this);
    this.cruds = [];
  }

  getCrud(relation) {
    if(relation.description == null || relation.description == undefined) {
      return this.crudFactory.get(relation.entity);
    } else if(this.cruds[relation.name] != null){
      return this.cruds[relation.name];
    } else {
      this.cruds[relation.name] = new Crud(relation.entity, relation.description);
      return this.cruds[relation.name];
    }
  }

  async getOperation () {
    let entities;
    entities = await super.getOperation(this.description.sufix);
    for(let i =0; i < entities.length; i++) {
      let entity = {...entities[i]};
      for(let j=0; j < this.description.relations.length; j++) {
        let relation = this.description.relations[j];
        switch(relation.type) {
          case 'oneToOne':
            entity = await this.getCrud(relation).getRelationOperation(relation.name,entity);
            break;
          case 'manyToOne':
            entity = await this.getCrud(relation).getRelationOperation(relation.name,entity);
            break;
          case 'manyToOneLink':
            entity = await this.getCrud(relation).getRelationOperation(relation.name,entity, true);
            break;
          case 'oneToMany':
            entity = await this.getCrud(relation).getToManyRelationOperation(relation.name,entity);
            break;
          case 'manyToMany':
            entity = await super.getManyToManyLinkRelationOperation(relation.name,entity,relation.entity);
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

    for(let j=0; j < this.description.relations.length; j++) {
      let relation = this.description.relations[j];
      switch(relation.type) {
        case 'oneToOne':
          entity = await this.getCrud(relation).getRelationOperation(relation.name,entity);
          break;
        case 'manyToOneLink':
          entity = await this.getCrud(relation).getRelationOperation(relation.name,entity, true);
          break;
        case 'oneToMany':
          entity = await this.getCrud(relation).getToManyRelationOperation(relation.name,entity);
          break;
        case 'manyToMany':
          // ignore
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
    await this.http.get(owner[relation][index]._links.self.href.replace("{?projection}",""))
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

    for(let j=0; j < this.description.relations.length; j++) {
      let relation = this.description.relations[j];
      switch(relation.type) {
        case 'oneToOne':
          entity = await this.getCrud(relation).getRelationOperation(relation.name,entity);
          break;
        case 'manyToOneLink':
          entity = await this.getCrud(relation).getRelationOperation(relation.name,entity, true);
          break;
        case 'oneToMany':
          entity = await this.getCrud(relation).getToManyRelationOperation(relation.name,entity);
          break;
        case 'manyToMany':
          // ignore
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
    for(let j=0; j < this.description.relations.length; j++) {
      let relation = this.description.relations[j];
      if(entity[relation.name] == undefined) {
        continue;
      }
      switch(relation.type) {
        case 'oneToOne':
          entity = await this.getCrud(relation).postRelationOperation(relation.name,entity);
          break;
        case 'manyToOneLink':
          // ignore
          break;
        case 'oneToMany':
          entity = await this.getCrud(relation).postToManyRelationOperation(relation.name,entity);
          break;
        case 'manyToMany':
          // ignore
          break;
      }
    }
    return super.postOperation(entity);
  }

  async postRelationOperation(relationName, owner) {
    let entity = owner[relationName];
    for(let j=0; j < this.description.relations.length; j++) {
      let relation = this.description.relations[j];
      if(entity[relation.name] == undefined) {
        continue;
      }
      switch(relation.type) {
        case 'oneToOne':
          entity = await this.getCrud(relation).postRelationOperation(relation.name,entity);
          break;
        case 'manyToOneLink':
          // ignore
          break;
        case 'oneToMany':
          entity = await this.getCrud(relation).postToManyRelationOperation(relation.name,entity);
          break;
        case 'manyToMany':
          // ignore
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
    for(let j=0; j < this.description.relations.length; j++) {
      let relation = this.description.relations[j];
      if(entity[relation.name] == undefined) {
        continue;
      }
      switch(relation.type) {
        case 'oneToOne':
          entity = await this.getCrud(relation).patchRelationOperation(relation.name,entity);
          break;
        case 'manyToOneLink':
          // ignore
          break;
        case 'oneToMany':
          entity = await this.getCrud(relation).patchToManyRelationOperation(relation.name,entity);
          break;
        case 'manyToMany':
          // ignore
          break;
      }
    }
    return super.patchOperation(url, entity);
  }

  async patchRelationOperation(relationName, owner) {
    let entity = owner[relationName];
    for(let j=0; j < this.description.relations.length; j++) {
      let relation = this.description.relations[j];
      if(entity[relation.name] == undefined) {
        continue;
      }
      switch(relation.type) {
        case 'oneToOne':
          entity = await this.getCrud(relation).patchRelationOperation(relation.name,entity);
          break;
        case 'manyToOneLink':
          // ignore
          break;
        case 'oneToMany':
          entity = await this.getCrud(relation).patchToManyRelationOperation(relation.name,entity);
          break;
        case 'manyToMany':
          // ignore
          break;
      }
    }
    owner = {
      ...owner,
      [relationName]: entity
    };
    return await super.patchRelationOperation(relationName, owner);
  }

}
