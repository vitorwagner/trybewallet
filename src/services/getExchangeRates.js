const CURRENCY_API = 'https://economia.awesomeapi.com.br/json/all';

const getExchangeRates = async () => {
  try {
    const response = await fetch(CURRENCY_API);
    const json = await response.json();

    return json;
  } catch (error) {
    console.log(error);
  }

  // return response.ok
  //   ? Promise.resolve(json)
  //   : Promise.reject(json);
};

export default getExchangeRates;
