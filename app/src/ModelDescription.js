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
    sufix: '?sort=date,asc',
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
  purchaseItems: {
    relations: [
      {
        name: 'inventoryMovement',
        entity: 'inventoryMovements',
        type: 'oneToOne'
      }
    ]
  },
  inventoryMovements: {
    sufix: "?sort=date,asc",
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
  inputs: {
    sufix: '?sort=name,asc',
    relations: [
      {
        name: 'prices',
        entity: 'inputPrices',
        type: 'oneToMany'
      }
    ]
  },
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
    },
    {
      name: 'recipe',
      entity: 'recipes',
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
    }
  ]},
  productPrices: { relations: []},
  productCategories: { relations: []},
  productItems: {
    relations: [
    {
      name: 'input',
      entity: 'inputs',
      type: 'manyToOneLink'
    },
    {
      name: 'unit',
      entity: 'units',
      type: 'manyToOneLink'
    },
    {
      name: 'recipe',
      entity: 'recipes',
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
  ]},
  purchaseProducts: {
    sufix: '?sort=declaredInput,asc',
    relations: [
      {
        name: 'input',
        entity: 'inputs',
        type: 'manyToOneLink'
      },
      {
        name: 'unit',
        entity: 'units',
        type: 'manyToOneLink'
      },
    ]
  },
  clientOrders: {
    relations: [
      {
        name: 'client',
        entity: 'people',
        type: 'manyToOneLink'
      },
      {
        name: 'forecastPaymentModality',
        entity: 'transactionModalities',
        type: 'manyToOneLink'
      },
      {
        name: 'payments',
        entity: 'genericTransactions',
        type: 'oneToMany'
      },
      {
        name: 'items',
        entity: 'orderItems',
        type: 'oneToMany'
      },
      {
        name: 'events',
        entity: 'orderEvents',
        type: 'oneToMany'
      }
    ]
  },
  orderItems: {
    relations: [
      {
        name: 'product',
        entity: 'products',
        type: 'manyToOneLink'
      },
      {
        name: 'subItems',
        entity: 'orderItems',
        type: 'oneToMany'
      }
    ],
  }
};
