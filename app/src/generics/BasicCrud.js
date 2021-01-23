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

  async getWithUrlOperation(url) {
    let toReturn = {};
    await axios.get(url.replace("{?projection}",""))
      .then( (response) => {
        toReturn = response.data;
      }, (error) => {
        console.log(error);
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
    await axios.get(entity._links[relationName].href.replace("{?projection}",""))
      .then( (response) => {
        toReturn = {
          ...entity,
          [relationName]: response.data
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

  async getRelationOperation(relationName, entity) {
    let toReturn;
    await axios.get(entity._links[relationName].href.replace("{?projection}",""))
      .then( (response) => {
        toReturn = {
          ...entity,
          [relationName]: response.data
        }
      }, (error) => {
        console.log(error);
        toReturn = {
          ...entity,
          [relationName]: {},
        };
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

      }, (error) => {
        console.log(error);
      });
    return toReturn;
  }

  async postOperation (entityToSave) {
    let toReturn = [{}];
    await axios.post(this.url, entityToSave, this.jsonConfig)
      .then( (response) =>  {
        toReturn = this.getOperation();
      }, (error) => {
        console.log(error);
      });
    return toReturn;
  }

  async putOperation (url, entityToSave) {
    let toReturn = [{}];
    await axios.put(url, entityToSave, this.jsonConfig)
      .then(  (response) => {
        toReturn = this.getOperation();
      }, (error) => {
        console.log(error);
      });
    return toReturn;
  }

  async putRelationOperation ( relationName, entityToSave) {
    let relationUrl = {};
    await axios.get(this.url + "/" + relationName)
      .then( (response) => {
        relationUrl = response.data._links.self.href;
        axios.put(relationUrl, entityToSave[relationName], this.jsonConfig)
          .then( (response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });
      }, (error) => {
        console.log(error);
      });
    let toReturn = {
      ...entityToSave,
      [relationName]: relationUrl
    };
    return toReturn;
  }


  async deleteOperation (url) {
    let toReturn = [{}];
    await axios.delete(url)
      .then( (response) => {
        toReturn = this.getOperation();
      }, (error) => {
        console.log(error);
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

}

export default BasicCrud;
