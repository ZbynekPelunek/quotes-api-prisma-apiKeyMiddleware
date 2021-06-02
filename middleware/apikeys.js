const { Prisma, PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const genKey = async () => {
  //create a base-36 string that is always 30 chars long a-z0-9
  // 'an0qrr5i9u0q4km27hv2hue3ywx3uu'
  return [...Array(30)]
    .map((e) => ((Math.random() * 36) | 0).toString(36))
    .join('');
};

const validateKey = async (req, res, next) => {
    //Where is the API key expected to be?
    const host = req.headers.origin;
    const api_key = req.header('x-api-key'); //version 3 using a header
    //console.log('validate key api key: ', api_key);
    
    if (api_key) {
        const dbResponse = await checkDBAPIKey(api_key);
        //console.log(dbResponse);
        if(dbResponse.length !== 0){
            const checkKey = dbResponse.apikey;
            const maxLimit = dbResponse.max_limit;
            next();
        } else {
            res.status(403).json({ error: 'Invalid API Key' });
        }

      //check the usage
      /*let today = new Date().toISOString().split('T')[0];
      let usageIndex = checkKey.usage.findIndex((day) => day.date == today);
      if (usageIndex >= 0) {
        //already used today
        if (checkKey.usage[usageIndex].count >= maxLimit) {
          //stop and respond
          res.status(429).send({
            error: {
              code: 429,
              message: 'Max API calls exceeded.',
            },
          });
        } else {
          //have not hit todays max usage
          checkKey.usage[usageIndex].count++;
          console.log('Good API call', checkKey.usage[usageIndex]);
          next();
        }
      } else {
        //not today yet
        checkKey.usage.push({ date: today, count: 1 });
        //ok to use again
        next();
      }*/
    } else {
      //stop and respond
      //res.status(403).send({ error: { code: 403, message: 'You not allowed.' } });
      res.status(403).json({ error: 'Empty API Key' });
    }
};

const checkDBAPIKey = async(api_key) => {

    const apikey = await prisma.apikeys.findMany({
		where: { apikey: { contains: api_key } },
	});

    return apikey;
};

module.exports = { genKey, validateKey };