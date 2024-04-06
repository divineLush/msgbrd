const { MongoClient } = require('mongodb');

module.exports = (async () => {
  const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.3';
  const client = new MongoClient(url);
  await client.connect();

  return client.db('msgbrd');
})();
