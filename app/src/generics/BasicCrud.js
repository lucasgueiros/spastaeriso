import axios from 'axios';

class BasicCrud {

  constructor (url, projection) {
    this.url = url;
    this.projection = projection ? "?projection=" + projection : "";
    this.jsonConfig = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
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
      links[i] = relationEntity._links.self.href;
    }
    entity = {
      ...entity,
      [relationName]: links
    };
    return entity;
  }

  async getToManyRelationOperation(relationName, entity) {
    let relatives = await this.getWithUrlOperation(entity._links[relationName].href);
    entity = {...entity, [relationName]: relatives._embedded[this.url]};
    for(let j =0; j < entity[relationName].length; j++) {
      entity = await this.getRelationWithIndexOperation(j,relationName,entity);
    }
    return entity;
  }

  async getWithUrlOperation(url) {
    let toReturn = {};
    await axios.get(url.replace("{?projection}",""))
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

  async getOperation () {
    let toReturn = [];
    await axios.get("/" + this.url + "/" + (this.projection ? this.projection : ""))
      .then( (response) => {
        toReturn = [...response.data._embedded[this.url]];
      }, (error) => {
        toReturn = [];
        console.log(error);
      });
    return toReturn;
  }

  async getRelationWithIndexOperation(index, relationName, entity) {
    let toReturn;
    await axios.get(entity[relationName][index]._links.self.href.replace("{?projection}",""))
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

  async getRelationOperation(relationName, entity, uriOnly = false) {
    let toReturn;
    await axios.get(entity._links[relationName].href.replace("{?projection}",""))
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
    await axios.post("/"+this.url+"/", entityToSave[relationName])
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
    await axios.post(this.url, entityToSave, this.jsonConfig)
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
    await axios.patch(url, entityToSave, this.jsonConfig)
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
    await axios.get(entityToSave._links.self.href + "/" + relationName)
      .then( (response) => {
        relationUrl = response.data._links.self.href;
      }, (error) => {
        console.log(error);
      });
    await axios.patch(relationUrl, entityToSave[relationName], this.jsonConfig)
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
    await axios.delete(url)
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
    await axios.get(relationUrl)
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
    await axios.get(owner._links[relation].href)
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

export default BasicCrud;
