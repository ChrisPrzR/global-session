const storage = require('node-persist');

/**
  * Extracts data from local storage.
  * Use after loging in
  * @param page Page object in use
  * @returns Session object
  */
const extractSession = async(page) => {
    await page.evaluate(() => {
      const json = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        json[key] = localStorage.getItem(key);
      }
      return json;
    });
};

const storeData = async(state, sessionData, config) => {
  await storage.init({...config});
  return await storage.setItem(state, sessionData)
}

/**
  * Retrieves locally stored data
  * @param state String -> 'pa', 
  * @param config Object default -> { ttl:1000*60*5 }
  * config options {dir:path, ttl: timetolive(JS Date or miliseconds)}
  * @returns sessionData locally stored
  */
const getSession = async(state, config = { ttl:1000*60*5 }) => {
  await storage.init({...config});
  return await storage.getItem(state)
}

/**
  * Stores data locally
  * @param state String -> 'pa', 
  * @param sessionData Object
  * @param config Object default -> { ttl:1000*60*5 }
  * config options {dir:path, ttl: timetolive(JS Date or miliseconds)}
  * @returns sessionData locally stored
  */
const storeSession = async(state, data, config = { ttl:1000*60*5 }) => {
  let value;
  value = await getSession(state, config);

  if (!value){
    ({content: {value}} = await storeData(state, data, config));
  };
  return value
}

/**
  * Inserts session data to browser
  * @param sessionData Object
  */
const insertSession = async (data) => {
  await page.evaluate(() => {
    for (let i = 0; i < Object.keys(data).length; i++) {
      const key = Object.keys(data)[i];
      localStorage.setItem(key, data[key]);
    }
  });
}

module.exports = {
  extractSession,
  insertSession,
  storeSession,
  getSession
}
