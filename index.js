const storage = require('node-persist');

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

const getData = async(state, config) => {
  await storage.init({...config});
  return await storage.getItem(state)
}

const storeSession = async(state, data, config) => {
  let value;
  value = await getData(state, config);

  if (!value){
    ({content: {value}} = await storeData(state, data, config));
  };
  return value
}

const insertSession = async (data) => {
  await page.evaluate(() => {
    for (let i = 0; i < Object.keys(data).length; i++) {
      const key = Object.keys(data)[i];
      localStorage.setItem(key, data[key]);
    }
  });
}


async function run() {
  const session = {
    WEB_USER_AUTHENTICATION: '{"ID":"2d38d4e7-eeb5-47f2-9697-509a4c249539","VALUE":{"WEB_USER_ID":95854,"USERNAME":"MAINPAFILER","WEB_USER_GROUP":1,"LAST_ACTION_TIMESTAMP":"2023-02-27T13:56:46.5067253"},"EXPIRES_ON":"2023-02-27T14:56:46.5067253","LAST_DB_UPDATE":"2023-02-27T13:56:46.5067253"}',
    CART_QUANTITY: '{"quantity":3,"trigger":"iGOcm330"}',
    EVENT_LOGIN: '{"initialAuthCheck":false,"FIRST_NAME":"DUSTIN","MIDDLE_NAME":null,"LAST_NAME":"RAY","ORG_NAME":"","WEB_USER_ID":95854,"USERNAME":"MAINPAFILER","USER_GROUP":"WEB","isFrequentPayor":false,"EMAIL":"efile1237@incfile.com","loggedIn":true,"trigger":"YI6bmqql","PHONE":"888-462-3453"}',
    USER_CACHE: '{"95854":"business"}',
    AUTH_TIMEOUT: '3539984',
    WEB_USER: '{"OKTA_ID":null,"KEYSTONE_GUID":null,"WEB_USER_ID":95854,"USER_TYPE_ID":1,"USERNAME":"MAINPAFILER","EMAIL":"efile1237@incfile.com","FIRST_NAME":"DUSTIN","MIDDLE_NAME":null,"LAST_NAME":"RAY","LAST_LOGIN_DATE":"2023-02-27T13:56:46.163","PHONE":"888-462-3453","ORG_NAME":"","IS_FREQUENT_PAYOR_YN":false,"BOSS_NAVIGATION_URL":null}',
    EVENT_SET_TIMEOUT: '{"paddedTimeout":3539984,"eventCheckTimeout":3239984,"trigger":"NQ5moXVN"}',
    LAST_USERS_GROUP: '"WEB"'
  }
  
  const data = await storeSession('pa', session, { ttl:1000*60*5 })
  console.log(data);
}

modules.export = {
  extractSession,
  insertSession,
  storeSession,
}
