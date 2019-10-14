const RateLimiter = require('request-rate-limiter');

const limiter = new RateLimiter(120);
// 120 requests per minuteconst

sendMessage = params => limiter.request(params);

sendMessage('/sendMessage?text=hi')
  .then(response => {
    console.log('hello!', response);
  }).catch(err => {
    console.log('oh my', err);
  });


  //-======


  const delay = interval => new Promise(resolve => setTimeout(resolve, interval));

  const sendMessage = async params => {
  await delay(1000);
  return axios(params);
};
