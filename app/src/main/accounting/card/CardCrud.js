import axios from 'axios';
import BasicCrud from '../../../generics/BasicCrud.js';

class CardCrud extends BasicCrud{

  constructor () {
    super("cards");
  }

  async getOperation () {
    let cards = await super.getOperation();
    for(let i =0; i < cards.length; i++) {
      let card = {...cards[i]};
      card = await super.getRelationOperation("account",card, true);
      cards[i] = card;
    }
    return cards;
  }
}

export default CardCrud;
