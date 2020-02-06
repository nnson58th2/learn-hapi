const CustomerController = require('../controller/customer.controller')
const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

module.exports = [
  {
    method: 'GET',
    path: '/customer',
    options: CustomerController.list
  },
  {
    method: 'GET',
    path: '/customer{id}',
    handler: CustomerController.get,
    config: {
      tags: ['api'],
      validate: {
        params: Joi.object({
          id: Joi.objectId()
        })
      }
    }
  },
  {
    method: 'POST',
    path: '/customer',
    handler: CustomerController.create,
    config: {
      tags: ['api'],
      validate: {
        payload: Joi.object({
          name: Joi.string().required().max(20),
          address: Joi.string().required(),
          card: Joi.string().required().min(9).max(9),
          birthday: Joi.date().required()
        })
      }
    }
  },
  {
    method: 'PUT',
    path: '/customer{id}',
    handler: CustomerController.update,
    config: {
      tags: ['api'],
      validate: {
        params: Joi.object({
          id: Joi.objectId()
        }),
        payload: Joi.object({
          name: Joi.string().required().max(20),
          address: Joi.string().required(),
          card: Joi.string().required().min(9).max(9),
          birthday: Joi.date().required()
        })
      }
    }
  },
  {
    method: 'DELETE',
    path: '/customer{id}',
    handler: CustomerController.delete,
    config: {
      tags: ['api'],
      validate: {
        params: Joi.object({
          id: Joi.objectId()
        })
      }
    }
  }
]