import axios from 'axios';
import BasicCrud from '../../../../generics/BasicCrud.js';


class PurchaseCrud extends BasicCrud{

  constructor () {
    super("purchases");
  }

  async postRelationOperation (relationName, entityToSave) {
    const accessCode = entityToSave[relationName].accessCode;
    let formData = new FormData();
    formData.append("nfeXml", entityToSave[relationName].xml);
    await axios.post("/nFeXmls/fromXml", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const response = await axios.get("http://localhost:8090/v1/nFeXmls/search/findByAccessCode?projection=nFeXmlProjection&accessCode="+accessCode);
    entityToSave = {
      ...entityToSave,
      [relationName]: response.data._links.self.href,
    };
    return entityToSave;
  }

  async patchOperation (setEntities, url, entityToSave) {
    super.patchOperation(setEntities, url, entityToSave);
  }
}

export default PurchaseCrud;
