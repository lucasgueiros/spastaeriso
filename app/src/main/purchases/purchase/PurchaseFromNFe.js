import React from 'react';
import axios from 'axios';
import { Redirect } from "react-router";

export class PurchaseFromNFe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nfe: undefined,
      message: "",
      redirect: false,
      url: "",
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
        this.setState({redirect: true, url: response.location});
        console.log(response.data);
      }, (error) => {
        console.log(error);
        this.setState({message: "Erro!"});
      }
    );
  }

  render () {
    if(this.state.redirect) {
      return (
        <Redirect to={{
          pathname: "/purchases/purchase",
          state: { show: this.state.url }
        }}/>
      );
    }
    return (
      <div class-name="create-purchase-from-nfe">
        <div>
          <label htmlFor="nfce">Nota Fiscal Eletrônica em XML: </label>
          <input name="nfce" type="file" onChange={this.onChange}></input>
        </div>
        <button onClick={this.upload}>Upload</button>
        {this.state.message}
      </div>
    );
  }

}
