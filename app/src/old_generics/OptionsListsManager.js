import axios from 'axios';

class OptionsListsManager {

  constructor(older = {listNames: [], lists: {}}) {
    this.listNames = older.listNames;
    this.lists = older.lists;
    this.isEmpty = this.isEmpty.bind(this);
    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
  }

  async fetch(list) {
    for(let i =0 ;i<list.length;i++) {
      let name = this.listNames[i];
      await axios.get(this.listNames[i])
        .then((response) => {
          list = response.data._embedded[name];
        }, (error) => {
          console.log(error);
        });
      this.lists[this.listNames[i]] = list;
    }
  }

  isEmpty() {
    return this.listNames.length === 0;
  }

  async get(name) {
    if(!this.listNames.includes(name)) {
      this.listNames.push(name);
      await this.update();
    }
    return this.lists[name];
  }

  async update() {
    for(let i =0 ;i<this.listNames.length;i++) {
      let list = [];
      let name = this.listNames[i];
      await axios.get(this.listNames[i])
        .then((response) => {
          list = response.data._embedded[name];
        }, (error) => {
          console.log(error);
        });
      this.lists[this.listNames[i]] = list;
    }
  }

}

export default OptionsListsManager;
