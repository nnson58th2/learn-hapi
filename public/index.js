const LearnHapi = {
  name: 'custommer',
  version: '1.0.0',
  register: (server, optins) => {
    server.route(require('./routes'))
  }
}

exports.plugin = LearnHapi