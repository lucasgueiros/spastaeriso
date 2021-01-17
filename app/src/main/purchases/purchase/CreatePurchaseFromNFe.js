import React from 'react';
import axios from 'axios';

class CreatePurchaseFromNFe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nfe: undefined
    }
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange (event) {
    this.setState({
      nfe: event.target.files[0],
    });
  }

  onClick(event) {
    let formData = new FormData();

    formData.append("nfe", this.state.nfe);

    axios.post("/purchases/fromNFe", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(
      (response) => {
        this.setState({
          message: "success",
        });
      }, (error) => {
        console.log(error);
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
        <button onClick={this.onClick}>Upload</button>
        <p>{this.state.message}</p>
      </div>
    );
  }

}

export default CreatePurchaseFromNFe;
