class BasicCrud {

  constructor (url, http) {
    this.url = url;
    this.http = http;
  }

  async patchToManyRelationOperation (relationName, entity) {
    if(entity[relationName] == undefined) {
      return entity;
    }
    let links = [];
    for(let i =0; i < entity[relationName].length; i++) {
      let relationEntity = {...entity[relationName][i]};
      if(relationEntity._links == undefined) {
        relationEntity = await this.postOperation(relationEntity);
        if(!relationEntity._ok) {
          return entity;
        }
      } else {
        relationEntity = await this.patchOperation(relationEntity._links.self.href, relationEntity);
        if(!relationEntity._ok) {
          return entity;
        }
      }

      links[i] = relationEntity._links.self.href;
    }
    entity = {
      ...entity,
      [relationName]: links
    };
    return entity;
  }

  async postToManyRelationOperation (relationName, entity) {
    if(entity[relationName] == undefined) {
      return entity;
    }
    let links = [];
    for(let i =0; i < entity[relationName].length; i++) {
      let relationEntity = {...entity[relationName][i]};
      relationEntity = await this.postOperation(relationEntity);
      if(relationEntity._ok) {
        links[i] = relationEntity._location;
      }

    }
    entity = {
      ...entity,
      [relationName]: links
    };
    return entity;
  }

  async getToManyRelationOperation(relationName, entity, sufix) {
    if(sufix === null || sufix === undefined) {
      sufix = "";
    }
    let relatives = await this.getWithUrlOperation(entity._links[relationName].href.replace("{?projection}","") + sufix);
    if(relatives == null || relatives._embedded == null || relatives._embedded[this.url] == null) {
      return {
        ...entity,
        [relationName]: [],
      };
    }
    entity = {...entity, [relationName]: relatives._embedded[this.url]};
    for(let j =0; j < entity[relationName].length; j++) {
      entity = await this.getRelationWithIndexOperation(j,relationName,entity);
    }
    return entity;
  }

  async getWithUrlOperation(url) {
    let toReturn = {};
    await this.http.get(url)
      .then( (response) => {
        toReturn = response.data;
      }, (error) => {
        console.log(error);
        return {
          _ok: false,
          error: error
        };
      });
    return toReturn;
  }

  async getOperation (sufix) {
    let toReturn = [];
    let url = "/" + this.url;
    if (sufix != null) {
      url = url + sufix;
    }

    await this.http.get(url)
      .then( (response) => {
        toReturn = [...response.data._embedded[this.url]];
      }, (error) => {
        toReturn = [];
        console.log(error);
      });
    return toReturn;
  }

  async getRelationWithIndexOperation(index, relationName, entity, sufix) {
    let toReturn;
    await this.http.get(entity[relationName][index]._links.self.href.replace("{?projection}","") + sufix)
      .then( (response) => {
        let arrayCopy = [...entity[relationName]];
        arrayCopy[index] = response.data;
        toReturn = {
          ...entity,
          [relationName]: arrayCopy
        }
      }, (error) => {
        console.log(error);
        toReturn = {
          ...entity,
          [relationName]: {}
        }
      });
    return toReturn;
  }

  async getRelationOperation(relationName, entity, uriOnly = false, sufix) {
    let toReturn;
    await this.http.get(entity._links[relationName].href.replace("{?projection}","") + sufix)
      .then( (response) => {
        toReturn = {
          ...entity,
          [relationName]: uriOnly ? response.data._links.self.href : response.data
        }
        toReturn._ok = true;
      }, (error) => {
        toReturn = {
          ...entity,
          [relationName]: uriOnly ? "" : {},
        };
        toReturn._ok = false;
        toReturn.error = error;
        console.log(error);
      });
    return toReturn;
  }

  async postRelationOperation (relationName, entityToSave) {
    let toReturn;
    await this.http.post("/"+this.url+"/", entityToSave[relationName])
      .then( (response) => {
        if(Array.isArray(entityToSave)) {
          toReturn = [...entityToSave];
          toReturn[relationName] = response.headers.location;
        } else {
          toReturn = {
            ...entityToSave,
            [relationName]: response.headers.location,
          };
        }
        toReturn._ok = true;
      }, (error) => {
        console.log(error);
        toReturn._ok = false;
        toReturn.error = error;
      });
    return toReturn;
  }

  async postOperation (entityToSave) {
    let toReturn = {
      _ok: true,
      response: {},
      error: {}
    };
    await this.http.post(this.url, entityToSave)
      .then( (response) =>  {
        toReturn = response.data;
        toReturn._ok = true;
        toReturn._location = response.headers.location;
        toReturn._id = response.headers.location.replace(response.request.responseURL + "/",'');
      }, (error) => {
        toReturn._ok = false;
        toReturn.error = error;
      });
    return toReturn;
  }

  async patchOperation (url, entityToSave) {
    let toReturn = [{}];
    await this.http.patch(url, entityToSave)
      .then(  (response) => {
        toReturn = response.data;
        toReturn._ok = true;
      }, (error) => {
        toReturn.error = error;
        toReturn._ok = false;
      });
    return toReturn;
  }

  async patchRelationOperation ( relationName, entityToSave) {
    let relationUrl = {};
    let toReturn = {};
    await this.http.get(entityToSave._links.self.href + "/" + relationName)
      .then( (response) => {
        relationUrl = response.data._links.self.href;
      }, (error) => {
        console.log(error);
      });
    await this.http.patch(relationUrl, entityToSave[relationName])
      .then(  (response) => {
        toReturn = response.data;
        toReturn._ok = true;
      }, (error) => {
        toReturn.error = error;
        toReturn._ok = false;
      });
    toReturn = {
      ...entityToSave,
      ...toReturn,
      [relationName]: relationUrl
    };
    return toReturn;
  }

  async deleteOperation (url) {
    let toReturn = [{}];
    await this.http.delete(url)
      .then( (response) => {
        toReturn._ok = true;
      }, (error) => {
        toReturn.error = error;
        toReturn._ok = false;
      });
    return toReturn;
  }

  async getSelfHrefOperation(relationUrl) {
    let toReturn;
    await this.http.get(relationUrl)
      .then( (response) => {
        toReturn = response.data._links.self.href;
      }, (error) => {
        console.log(error);
      });
      return toReturn;
  }

  async getManyToManyLinkRelationOperation(relation,owner, entity) {
    let links = [];
    let toReturn = {};
    await this.http.get(owner._links[relation].href.replace("{?projection}","") + this.description.sufix)
      .then( (response) => {
        toReturn._ok = true;
        let entities =  response.data._embedded[entity];
        for(let i = 0; i < entities.length; i++) {
          links.push(entities[i]._links.self.href);
        }
      }, (error) => {
        toReturn._ok = false;
        toReturn.error = error;
        console.log(error);
      });
      owner = {
        ...owner,
        ...toReturn,
        [relation]: links,
      }
      return owner;
  }

}

export class Crud extends BasicCrud {

  constructor(description, http) {
    super(description.name, http);
    this.description = description;
    if(this.description.sufix == null || this.description.sufix == undefined) {
      this.description.sufix = "";
    }
    this.getCrud = this.getCrud.bind(this);
    this.cruds = [];
  }

  getCrud(relation) {
    if(this.cruds[relation.name] != null){
      return this.cruds[relation.name];
    } else {
      this.cruds[relation.name] = new Crud(relation, this.http);
      return this.cruds[relation.name];
    }
  }

  async getSingleOperation(id) {
    let toReturn = [];
    let url = "/" + this.url + "/" + id;
    //if (sufix != null) {
    //  url = url + sufix;
    //}

    let entity = (await this.http.get(url)).data;
    for(let j=0; j < this.description.columns.length; j++) {
      let relation = this.description.columns[j];
      switch(relation.type) {
        case 'oneToOne':
          entity = await this.getCrud(relation).getRelationOperation(relation.property,entity, false);
          break;
        case 'manyToOne':
          entity = await this.getCrud(relation).getRelationOperation(relation.property,entity, false);
          break;
        case 'manyToOneLink':
          entity = await this.getCrud(relation).getRelationOperation(relation.property,entity, true);
          break;
        case 'oneToMany':
          entity = await this.getCrud(relation).getToManyRelationOperation(relation.property,entity);
          break;
        case 'manyToMany':
          entity = await super.getManyToManyLinkRelationOperation(relation.property,entity,relation.entity);
          break;
        case 'oneToOneFileUpload':
          entity = {
            ...entity,
            [relation.property]: entity._links[relation.property].href,
          }
      }
    }
    return entity;
  }



  async getOperation (sufix) {
    let entities;
    entities = await super.getOperation(sufix || this.description.sufix);
    for(let i =0; i < entities.length; i++) {
      let entity = {...entities[i]};
      for(let j=0; j < this.description.columns.length; j++) {
        let relation = this.description.columns[j];
        switch(relation.type) {
          case 'oneToOne':
            entity = await this.getCrud(relation).getRelationOperation(relation.property,entity, false);
            break;
          case 'manyToOne':
            entity = await this.getCrud(relation).getRelationOperation(relation.property,entity, false);
            break;
          case 'manyToOneLink':
            entity = await this.getCrud(relation).getRelationOperation(relation.property,entity, true);
            break;
          case 'oneToMany':
            entity = await this.getCrud(relation).getToManyRelationOperation(relation.property,entity);
            break;
          case 'manyToMany':
            entity = await super.getManyToManyLinkRelationOperation(relation.property,entity,relation.entity);
            break;
          case 'oneToOneFileUpload':
            entity = {
              ...entity,
              [relation.property]: entity._links[relation.property].href,
            }
        }
      }
      entities[i] = entity;
    }
    return entities;
  }

  async getRelationOperation (relation, owner, urlOnly) {
    let entity = await super.getWithUrlOperation(owner._links[relation].href.replace("{?projection}","") + this.description.sufix);
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

    for(let j=0; j < this.description.columns.length; j++) {
      let relation = this.description.columns[j];
      switch(relation.type) {
        case 'oneToOne':
          entity = await this.getCrud(relation).getRelationOperation(relation.property,entity, false);
          break;
        case 'manyToOneLink':
          entity = await this.getCrud(relation).getRelationOperation(relation.property,entity, true);
          break;
        case 'oneToMany':
          entity = await this.getCrud(relation).getToManyRelationOperation(relation.property,entity);
          break;
        case 'manyToMany':
          entity = await this.getCrud(relation).getManyToManyLinkRelationOperation(relation.property,entity,relation.entity);
          break;
      }
    }
    owner = {
      ...owner,
      [relation]: entity,
    }
    return owner;
  }

  async getManyToManyLinkRelationOperation(relation,owner, entity) {
    return await super.getManyToManyLinkRelationOperation(relation,owner, entity, this.description.sufix)
  }

  async getRelationWithIndexOperation(index, relation, owner) {
    let entity;
    await this.http.get(owner[relation][index]._links.self.href.replace("{?projection}","") + this.description.sufix)
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

    for(let j=0; j < this.description.columns.length; j++) {
      let relation = this.description.columns[j];
      switch(relation.type) {
        case 'oneToOne':
          entity = await this.getCrud(relation).getRelationOperation(relation.property,entity, false);
          break;
        case 'manyToOneLink':
          entity = await this.getCrud(relation).getRelationOperation(relation.property,entity, true);
          break;
        case 'oneToMany':
          entity = await this.getCrud(relation).getToManyRelationOperation(relation.property,entity);
          break;
        case 'manyToMany':
          entity = await this.getCrud(relation) .getManyToManyLinkRelationOperation(relation.property,entity,relation.entity);
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
    for(let j=0; j < this.description.columns.length; j++) {
      let relation = this.description.columns[j];
      if(entity[relation.property] == undefined) {
        continue;
      }
      switch(relation.type) {
        case 'oneToOne':
          entity = await this.getCrud(relation).postRelationOperation(relation.property,entity);
          break;
        case 'manyToOneLink':
          // ignore
          break;
        case 'oneToMany':
          entity = await this.getCrud(relation).postToManyRelationOperation(relation.property, entity);
          break;
        case 'manyToMany':
          // ignore
          break;
        case 'oneToOneFileUpload':
          entity = await this.fileUpload(relation.property, relation.property, relation.entity, entity);
          break;
      }
    }
    return super.postOperation(entity);
  }

  async fileUpload (relation, property, entity, owner) {
    let file = owner[relation][property];

    let formData = new FormData();

    formData.append("voucher", file);

    let response = await this.http.post("/"+entity+"/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    let toReturn = {
      ...owner,
      [relation]: response.data
    };
    return toReturn;
  }

  async postRelationOperation(relationName, owner) {
    let entity = owner[relationName];
    for(let j=0; j < this.description.columns.length; j++) {
      let relation = this.description.columns[j];
      if(entity[relation.property] == undefined) {
        continue;
      }
      switch(relation.type) {
        case 'oneToOne':
          entity = await this.getCrud(relation).postRelationOperation(relation.property,entity);
          break;
        case 'manyToOneLink':
          // ignore
          break;
        case 'oneToMany':
          entity = await this.getCrud(relation).postToManyRelationOperation(relation.property,entity);
          break;
        case 'manyToMany':
          // ignore
          break;
        case 'oneToOneFileUpload':
          entity = await this.fileUpload(relation.property, relation.property, relation.entity, entity);
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
    for(let j=0; j < this.description.columns.length; j++) {
      let relation = this.description.columns[j];
      if(entity[relation.property] == undefined) {
        continue;
      }
      switch(relation.type) {
        case 'oneToOne':
          entity = await this.getCrud(relation).patchRelationOperation(relation.property,entity);
          break;
        case 'manyToOneLink':
          // ignore
          break;
        case 'oneToMany':
          entity = await this.getCrud(relation).patchToManyRelationOperation(relation.property,entity);
          break;
        case 'manyToMany':
          // ignore
          break;
        case 'oneToOneFileUpload':
          entity = await this.fileUpload(relation.property, relation.property, relation.entity, entity);
          break;
      }
    }
    return super.patchOperation(url, entity);
  }

  async patchRelationOperation(relationName, owner) {
    let entity = owner[relationName];
    for(let j=0; j < this.description.columns.length; j++) {
      let relation = this.description.relations[j];
      if(entity[relation.property] == undefined) {
        continue;
      }
      switch(relation.type) {
        case 'oneToOne':
          entity = await this.getCrud(relation).patchRelationOperation(relation.property,entity);
          break;
        case 'manyToOneLink':
          // ignore
          break;
        case 'oneToMany':
          entity = await this.getCrud(relation).patchToManyRelationOperation(relation.property,entity);
          break;
        case 'manyToMany':
          // ignore
          break;
        case 'oneToOneFileUpload':
          entity = await this.fileUpload(relation.property, relation.property, relation.entity, entity);
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
