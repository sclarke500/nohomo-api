const redis = require('redis');
const redisClient = redis.createClient({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT });

module.exports = {
  registerOnLogout: registerOnLogout,
  checkIfListed: checkIfListed,
}

async function registerOnLogout(token, exp) {
  await redisClient.zadd('blacklist_tokens', exp, token);
  await removeExpiredItems();
}

function checkIfListed(token) {
  return new Promise((resolve, reject) => {
    redisClient.zrange('blacklist_tokens', 0, -1, (err, resp) => {
    //  console.log('blacklist tokens length: ' + resp.length);
      resolve((resp.indexOf(token) > -1));
    });
  });
}

async function removeExpiredItems() {
  await redisClient.zremrangebyscore('blacklist_tokens', 0, (new Date() / 1000));
}

