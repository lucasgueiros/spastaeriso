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
      message: ""
    }
    this.upload = this.upload.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange (event) {
    this.setState({
      nfe: event.target.files[0],
    });
  }

  upload(event) {
    this.setState({message: "Uploading..."});
    let formData = new FormData();

    formData.append("nfce", this.state.nfe);

    axios.post("/purchases/nfce", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(
      (response) => {
        this.setState({message: "Sucesso!"});
        console.log(response.data);
      }, (error) => {
        console.log(error);
        this.setState({message: "Erro!"});
      }
    );
  }

  render () {

    return (
      <div class-name="create-purchase-from-nfe">
        <div>
          <label htmlFor="nfe">Nota Fiscal Eletrônica em XML: </label>
          <input name="nfe" type="file" onChange={this.onChange}></input>
        </div>
        <button onClick={this.upload}>Upload</button>
        {this.state.message}
      </div>
    );
  }

}

export default PurchaseFromNFe;
