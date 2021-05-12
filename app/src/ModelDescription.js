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
      },{
        name: 'voucher',
        entity: 'transactionVouchers',
        type: 'oneToOneFileUpload',
        property: 'voucher',
      }
    ]
  },
  transactionVouchers: {
    relations: [],
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
  units: {
    relations: [
      {
        name: 'quantity',
        entity: 'unitQuantities',
        type: 'manyToOneLink'
      }
    ]
  },
  unitQuantities: {
    relations: [
      {
        name: 'favorite',
        entity: 'units',
        type: 'manyToOneLink'
      }
    ]
  },
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
      type: 'manyToOneLink'
    },
    {
      name: 'primaryContact',
      entity: 'contacts',
      type: 'manyToOneLink'
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
        name: 'clerk',
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
      },{
        name: 'deliveries',
        entity: 'deliveryOrders',
        type: 'oneToMany'
      },{
        name: 'modifiers',
        entity: 'orderPriceModifiers',
        type: 'oneToMany',
      }
    ]
  },
  orderItems: {
    sufix: '?projection=withId',
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
      },
      {
        name: 'events',
        entity: 'orderItemEvents',
        type: 'oneToMany'
      }
    ],
  },
  deliveryOrders: {
    sufix: '?projection=withId',
    relations: [
      {
        name: 'items',
        entity: 'orderItems',
        type: 'manyToMany'
      },
      {
        name: 'events',
        entity: 'deliveryOrderEvents',
        type: 'oneToMany'
      },{
        name: 'deliveryAddress',
        entity: 'addresses',
        type: 'manyToOneLink'
      }
    ]
  },
  deliveryOrderEvents: {relations: []},
  cards: {relations: []},
  orderEvents: {
    relations: [],
  },
  deliverymen: {
    relations: [
      {
        name: 'person',
        entity: 'people',
        type: 'oneToOne'
      },
      {
        name: 'contracts',
        entity: 'deliverymanContracts',
        type: 'oneToMany'
      },
      {
        name: 'payments',
        entity: 'deliverymanPayments',
        type: 'oneToMany'
      },
      {
        name: 'workDays',
        entity: 'deliverymanWorkDays',
        type: 'oneToMany'
      }
    ]
  },
  deliverymanContracts: {relations: []},
  deliverymanPayments: {
    relations: [
      {
        name: 'transaction',
        entity: 'genericTransactions',
        type: 'oneToOne'
      },
      {
        name: 'workDays',
        entity: 'deliverymanWorkDays',
        type: 'oneToMany'
      }
    ]
  },
  deliverymanWorkDays: {
    relations: [
      {
        name: 'contract',
        entity: 'deliverymanContracts',
        type: 'oneToOne'
      },
      {
        name: 'deliveries',
        entity: 'deliveries',
        type: 'oneToMany'
      }
    ]
  },
  deliveries: {
    relations: [
      {
        name: 'deliveryman',
        entity: 'deliverymen',
        type: 'manyToOneLink'
      },{
        name: 'events',
        entity: 'deliveryEvents',
        type: 'oneToMany'
      },{
        name: 'orders',
        entity: 'deliveryOrders',
        type: 'manyToMany'
      }
    ]
  },
  deliveryEvents: {relations: []},
  deliveryPricesByNeighborhood: {
    relations: [
      {
        name: 'neighborhood',
        entity: 'neighborhoods',
        type: 'manyToOneLink'
      }
    ]
  },
  orderPriceModifiers: {relations: []}
};
