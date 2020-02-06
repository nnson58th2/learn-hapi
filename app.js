const Hapi = require('@hapi/hapi')
const Mongoose = require('mongoose')
const Inert = require('@hapi/inert')
const Vision = require('vision')
const HapiSwagger = require('hapi-swagger')
const Pack = require('./package')

const server = Hapi.Server({
  host: 'localhost',
  port: 8000
});

// connect mongoose
async function ConnectMongoose() {
  await Mongoose.connect('mongodb://learn-hapi:Sonveo236!!@ds211269.mlab.com:11269/learn-hapi', {useNewUrlParser: true})
  console.log('Connected DB!')
}

// register plugins
async function RegisterPlugin() {
  const swaggerOptions = {
    info: {
      title: 'Test API Documentation',
      version: Pack.version, 
    }
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);

  await server.register(require('./public/index'))
  console.log('Registed!')
}

server.liffOff = async () => {  
  try {
    await ConnectMongoose()
    await RegisterPlugin()
    await server.start()
  } catch (err) {
      console.log(err)
      process.exit(1)
  }
  console.log(`Server running at ${server.info.uri}`)
};

if (!module.parent) {
  server.liffOff()
}

module.exports = server