module.exports = {
  userId: {
    type: 'integer',
    example: 7
  },
  name: {
    type: 'string',
    example: 'Tom Engels'
  },
  email: {
    type: 'string',
    example: 'tom.engels@wolox.com.ar'
  },
  birthDate: {
    type: 'date',
    example: '1996-05-04'
  },
  password: {
    type: 'string',
    example: 'dvr6ergv1dgv56s4f65sd1sfdfvs6ds65d5s65vs6d5s6dfvs6d5fv6s5dfv6s56df5s6dbtsy5s5yns6ynns32nys3'
  },
  type: {
    type: 'enum',
    example: 'regular'
  },
  country: {
    type: 'string',
    example: 'Argentina'
  },
  state: {
    type: 'string',
    example: 'Buenos Aires'
  },
  city: {
    type: 'string',
    example: 'Lomas de Zamora'
  },
  address: {
    type: 'string',
    example: 'Calle Falsa 1234'
  },
  emailSubscription: {
    type: 'boolean',
    example: true
  },
  numberOfLanguages: {
    type: 'integer',
    example: 5
  },
  User: {
    type: 'object',
    properties: {
      id: {
        $ref: '#/components/schemas/userId'
      },
      name: {
        $ref: '#/components/schemas/username'
      },
      email: {
        $ref: '#/components/schemas/userEmail'
      },
      birthDate: {
        $ref: '#/components/schemas/birthDate'
      },
      password: {
        $ref: '#/components/schemas/password'
      },
      type: {
        $ref: '#/components/schemas/type'
      },
      country: {
        $ref: '#/components/schemas/country'
      },
      state: {
        $ref: '#/components/schemas/state'
      },
      city: {
        $ref: '#/components/schemas/city'
      },
      address: {
        $ref: '#/components/schemas/address'
      },
      emailSubscription: {
        $ref: '#/components/schemas/emailSubscription'
      },
      numberOfLanguages: {
        $ref: '#/components/schemas/numberOfLanguages'
      }
    }
  },
  Users: {
    type: 'object',
    properties: {
      users: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/User'
        }
      }
    }
  }
};
