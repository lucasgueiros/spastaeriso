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

  getOperation (setEntities) {
    axios.get("/" + this.url + "/" + (this.projection ? this.projection : ""))
      .then( (response) => {
        setEntities(response.data._embedded[this.url]);
      }, (error) => {
        console.log(error);
      });
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

  postOperation (setEntities, entityToSave) {
    axios.post(this.url, entityToSave, this.jsonConfig)
      .then( (response) => {
        console.log(response);
        this.getOperation(setEntities);
      }, (error) => {
        console.log(error);
      });
  }

  putOperation (setEntities, url, entityToSave) {
    axios.put(url, entityToSave, this.jsonConfig)
      .then( (response) => {
        console.log(response);
        this.getOperation(setEntities);
      }, (error) => {
        console.log(error);
      });
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


  deleteOperation (setEntities, url) {
    axios.delete(url)
      .then( (response) => {
        console.log(response);
        this.getOperation(setEntities);
      }, (error) => {
        console.log(error);
      });
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
