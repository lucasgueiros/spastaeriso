export default {
  purchases: { relations: [
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
    ]},
  nfce: { relations: []},
  nfceXmls: { relations: []},
  providers: { relations: []},
  genericTransactions: {
    findAll: 'findAllByOrderByDateAsc',
    relations: [
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
    ]
  },
  transactionModalities: { relations: []},
  entries: { relations: [
    {
      name: 'account',
      entity: 'accounts',
      type: 'manyToOneLink'
    }
  ]},
  accounts: { relations: []},
  purchaseItems: { relations: [
    {
      name: 'inventoryMovement',
      entity: 'inventoryMovements',
      type: 'oneToOne'
    }
  ]},
  inventoryMovements: {
    findAll: "findAllByOrderByDateAsc",
    relations: [
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
    ]
  },
  inputs: { relations: [
    {
      name: 'prices',
      entity: 'inputPrices',
      type: 'oneToMany'
    }
  ]},
  inputPrices: { relations: [
    {
      name: 'unit',
      entity: 'units',
      type: 'manyToOneLink'
    },
  ]},
  units: { relations: []},
  recipes: { relations: [
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
  ]},
  functionaryWorkingTimes: { relations: [
    {
      name: 'functionaryFunction',
      entity: 'functionaryFunctions',
      type: 'manyToOneLink'
    }
  ]},
  ingredients: { relations: [
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
  ]},
  items: { relations: [
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
  ]},
  instructions: { relations: []},
  functionaryFunctions: { relations: []},
  functionaryContractTemplates: { relations: [
    {
      name: 'function',
      entity: 'functionaryFunctions',
      type: 'manyToOneLink'
    }
  ]},
  products: { relations: [
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
  ]},
  productRecipes: { relations: [
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
  ]},
  productPrices: { relations: []},
  productCategories: { relations: []},
  productItems: { relations: [
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
  ]},
  addressTypes: { relations: []},
  neighborhoods: { relations: []},
  addresses: { relations: [
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
  ]},
  contacts: { relations: [
    {
      name: 'channel',
      entity: 'contactChannels',
      type: 'manyToOneLink'
    }
  ]},
  contactChannels: { relations: []},
  people: { relations: [
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
  ]},
  pruducedProducts: { relations: [
    {
      name: 'movements',
      entity: 'inventoryMovements',
      type: 'oneToMany'
    }
  ]}
};
