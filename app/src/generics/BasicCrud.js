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
        links[i] = relationEntity._links.self.href;
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
    if(relatives == undefined) {
      return entity;
    }
    //let _relationName = entity[relationName];
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
    let _relationName = entity[relationName];
    await this.http.get(entity._links[relationName].href.replace("{?projection}","") + sufix)
      .then( (response) => {
        toReturn = {
          ...entity,
          ['_' + relationName]: _relationName,
          [relationName]: uriOnly ? response.data._links.self.href : response.data
        }
        toReturn._ok = true;
      }, (error) => {
        toReturn = {
          ...entity,
          ['_' + relationName]: _relationName,
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
          toReturn[relationName] = response.data._links.self.href;
        } else {
          toReturn = {
            ...entityToSave,
            [relationName]: response.data._links.self.href
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
    let entities = [];
    let toReturn = {};
    await this.http.get(owner._links[relation].href.replace("{?projection}","") + this.description.sufix)
      .then( (response) => {
        toReturn._ok = true;
        entities =  response.data._embedded[entity];
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
        ['_' + relation]: entities,
        [relation]: links,
      }
      return owner;
  }

}

export default BasicCrud;
