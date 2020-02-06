const Customer = require('../model/customer.model')
const Boom = require('boom')
const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

exports.list = {
  tags: ['api'],
  handler: async(request, h) => {
    return await Customer.find();
  }
}

exports.get = async(request, h) => { 
  return await Customer.findById({ _id: request.params.id }) || Boom.notFound()
}

exports.create = async(request, h) => {
  try {
    return await Customer.create(request.payload)
  } catch(err) {
    if (err.code === 11000) {
      return Boom.conflict(err)
    }
    return Boom.forbidden(err)
  }
}

exports.update = async(request, h) => {
  try {
    const { name, address, card, birthday } = request.payload
    const item = await Customer.findOneAndUpdate({ _id: request.params.id }, { name, address, card, birthday }, { new: true })
    return item || Boom.notFound()
  } catch (err) {
    if (err.code === 11000) {
      return Boom.conflict(err)
    } 
    return Boom.forbidden(err)
  }
}

exports.delete = async(request, h) => {
  return await Customer.findOneAndDelete({ _id: request.params.id }) || Boom.notFound()
}