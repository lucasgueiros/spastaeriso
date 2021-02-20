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
  nfceXmls: [],
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
      name: 'inventoryMovement',
      entity: 'inventoryMovements',
      type: 'oneToOne'
    }
  ],
  inventoryMovements: [
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
  inputs: [
    {
      name: 'prices',
      entity: 'inputPrices',
      type: 'oneToMany'
    }
  ],
  inputPrices: [
    {
      name: 'unit',
      entity: 'units',
      type: 'manyToOneLink'
    },
  ],
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
  ],
  products: [
    {
      name: 'prices',
      entity: 'productPrices',
      type: 'oneToMany',
    },
    {
      name: 'items',
      entity: 'productItems',
      type: 'oneToMany'
    },
    {
      name: 'categories',
      entity: 'productCategories',
      type: 'manyToMany'
    },
    {
      name: 'recipes',
      entity: 'productRecipes',
      type: 'oneToMany'
    }
  ],
  productRecipes: [
    {
      name: 'output',
      entity: 'inputs',
      type: 'manyToOneLink'
    },
    {
      name: 'recipe',
      entity: 'recipes',
      type: 'manyToOneLink'
    }
  ],
  productPrices: [],
  productCategories: [],
  productItems: [
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
  addressTypes: [],
  neighborhoods: [],
  addresses: [
    {
      name: 'type',
      entity: 'addressTypes',
      type: 'manyToOneLink'
    },
    {
      name: 'neighborhood',
      entity: 'neighborhoods',
      type: 'manyToOneLink'
    }
  ],
  contacts: [
    {
      name: 'channel',
      entity: 'contactChannels',
      type: 'manyToOneLink'
    }
  ],
  contactChannels: [],
  people: [
    {
      name: 'contacts',
      entity: 'contacts',
      type: 'oneToMany'
    },
    {
      name: 'addresses',
      entity: 'addresses',
      type: 'oneToMany'
    },
    {
      name: 'primaryAddress',
      entity: 'addresses',
      type: 'oneToOneLink'
    },
    {
      name: 'primaryContact',
      entity: 'contacts',
      type: 'oneToOneLink'
    },
  ],
  pruducedProducts: [
    {
      name: 'movements',
      entity: 'inventoryMovements',
      type: 'oneToMany'
    }
  ]
};
