import PurchaseCrud from './main/purchases/purchase/PurchaseCrud.js';
import PurchaseItemCrud from './main/purchases/purchase/item/PurchaseItemCrud.js';
import NfeCrud from './main/purchases/purchase/nfe/NfeCrud.js';
import TransactionCrud from './main/accounting/transaction/TransactionCrud.js';
import BasicCrud from './generics/BasicCrud.js';

export default {
  purchases: [
      {
        name: 'provider',
        entity: 'providers',
        type: 'manyToOneLink',
      },
      {
        name: 'transaction',
        entity: 'genericTransactions',
        type: 'oneToOne',
      },
      {
        name: 'items',
        entity: 'purchaseItems',
        type: 'oneToMany'
      },
      {
        name: 'nfce',
        entity: 'nfce',
        type: 'oneToOne'
      }
    ],
  nfce: [],
  providers: [],
  genericTransactions: [
    {
      name: 'modality',
      entity: 'transactionModalities',
      type: 'manyToOneLink'
    },
    {
      name: 'entries',
      entity: 'entries',
      type: 'oneToMany'
    }
  ],
  transactionModalities: [],
  entries: [
    {
      name: 'account',
      entity: 'accounts',
      type: 'manyToOneLink'
    }
  ],
  accounts: [],
  purchaseItems: [
    {
      name: 'unit',
      entity: 'units',
      type: 'manyToOneLink'
    },
    {
      name: 'input',
      entity: 'inputs',
      type: 'manyToOneLink'
    }
  ],
  inputs: [],
  units: [],
  recipes: [
    {
      name: 'works',
      entity: 'functionaryWorkingTimes',
      type: 'oneToMany'
    },
    {
      name: 'ingredients',
      entity: 'ingredients',
      type: 'oneToMany'
    },
    {
      name: 'otherItems',
      entity: 'items',
      type: 'oneToMany'
    },
    {
      name: 'instructions',
      entity: 'instructions',
      type: 'oneToMany'
    },
    {
      name: 'outputs',
      entity: 'items',
      type: 'oneToMany'
    },
  ],
  functionaryWorkingTimes: [
    {
      name: 'functionaryFunction',
      entity: 'functionaryFunctions',
      type: 'manyToOneLink'
    }
  ],
  ingredients: [
    {
      name: 'input',
      entity: 'inputs',
      type: 'manyToOneLink'
    },
    {
      name: 'unit',
      entity: 'units',
      type: 'manyToOneLink'
    }
  ],
  items: [
    {
      name: 'input',
      entity: 'inputs',
      type: 'manyToOneLink'
    },
    {
      name: 'unit',
      entity: 'units',
      type: 'manyToOneLink'
    }
  ],
  instructions: [],
  functionaryFunctions: [],
  functionaryContractTemplates: [
    {
      name: 'function',
      entity: 'functionaryFunctions',
      type: 'manyToOneLink'
    }
  ]
};
