import './PurchaseFromNFe.css';
import React from 'react';
import axios from 'axios';
import Purchase from './Purchase.js';
import PurchaseCrud from './PurchaseCrud.js';

class PurchaseFromNFe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nfe: undefined,
      showEditor: false,
      entity: {}
    }
    this.crud = new PurchaseCrud();
    this.upload = this.upload.bind(this);
    this.onChange = this.onChange.bind(this);
    this.salvar = this.salvar.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setEntities = this.setEntities.bind(this);
    this.fetchOptions = this.fetchOptions.bind(this);
    this.updateOptionsLists = this.updateOptionsLists.bind(this);
  }

  onChange (event) {
    this.setState({
      nfe: event.target.files[0],
    });
  }

  salvar(event) {
    this.crud.postOperation (this.setEntities, {
      ...this.state.entity,
      nfe: {
        ...this.state.entity.nfe,
        xml: this.state.nfe
      }
    });
  }

  //ignore!
  setEntities(entites) {

  }

  upload(event) {
    let formData = new FormData();

    formData.append("nfce", this.state.nfe);

    axios.post("/purchases/nfce", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(
      (response) => {
        console.log(response.data);
      }, (error) => {
        console.log(error);
      }
    );
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // NOMES ESPECIAIS
    if(name === "transaction.account.name") {
      axios.get("accounts/search/findByNameIgnoreCase?name=" + value)
          .then((response) => {
            this.setState({
              entity: {
                ...this.state.entity,
                transaction: {
                  ...this.state.entity.transaction,
                  account: response.data
                }
              }
            });
          }, (error) => {
            console.log(error);
          })
    }

    // dividindo o nome para encontrar subobjetos
    const names = name.split(".");

    let entity = {...this.state.entity};
    let entityHierarchy = [entity];

    let i = 0;
    let finished = false;
    while(i >= 0) {
      if(!finished && i === names.length - 1) { // então chegamos ao último
        entityHierarchy[i][names[i]] = value;
        finished = true;
        i--;
      } else if (!finished) {
        if(Array.isArray(entityHierarchy[i][names[i]])) {
          entityHierarchy[i+1] = [...entityHierarchy[i][names[i]]];
        } else {
          entityHierarchy[i+1] = {...entityHierarchy[i][names[i]]};
        }
        i++;
      } else {
        entityHierarchy[i][names[i]] = entityHierarchy[i+1];
        i--;
      }
    }

    this.setState({entity});
  }

  async updateOptionsLists() {
    let optionsLists = ['accounts','transactionTypes','transactionModalities','inputs','units'];
    this.fetchOptions(optionsLists).then((r) => {
      this.setState({
        optionsLists: r,
      });
    });
  }

  async fetchOptions(names) {
    let r = {};
    for(let i =0 ;i<names.length;i++) {
      let ri = [];
      let name = names[i];
      await axios.get(name)
        .then((response) => {
          ri = response.data._embedded[name];
        }, (error) => {
          console.log(error);
        });
      r[name] = ri;
    }
    return r;
  }

  addToManyRelation(name) {
    let names = name.split(".");

    //const index = names[0];
    //names.splice(0,1);
    let index = this.state.entity_index;
    let entity = {...this.state.entities[index]};
    let entityHierarchy = [entity];

    let i = 0;
    let finished = false;
    if(names.length===0) {
      return;
    }
    while(i >= 0) {
      if(!finished && i === names.length - 1) { // então chegamos ao último
        let relation = [];
        if(entityHierarchy[i][names[i]] !== undefined) {
          relation = [...entityHierarchy[i][names[i]]];
        }
        relation.push({});
        entityHierarchy[i][names[i]] = relation;
        finished = true;
        i--;
      } else if (!finished) {
        if(Array.isArray(entityHierarchy[i][names[i]])) {
          entityHierarchy[i+1] = [...entityHierarchy[i][names[i]]];
        } else {
          entityHierarchy[i+1] = {...entityHierarchy[i][names[i]]};
        }
        i++;
      } else {
        entityHierarchy[i][names[i]] = entityHierarchy[i+1];
        i--;
      }
    }
    let entities = [...this.state.entities];
    entities[index] = entity;
    this.setState({entities});
  }

  componentDidMount () {
    this.updateOptionsLists();
  }

  render () {
    let editor = "";
    if(this.state.showEditor) {
      editor =
        <div>
          <h3>Compra</h3>
          <Purchase
            entity={this.state.entity}
            editing={true}
            optionsLists={this.state.optionsLists}
            onChange={this.handleInputChange}/>
          <button onClick={this.salvar}>Salvar</button>
        </div>;
    }

    return (
      <div class-name="create-purchase-from-nfe">
        <div>
          <label htmlFor="nfe">Nota Fiscal Eletrônica em XML: </label>
          <input name="nfe" type="file" onChange={this.onChange}></input>
        </div>
        <button onClick={this.upload}>Upload</button>
      </div>
    );
  }

}

export default PurchaseFromNFe;
