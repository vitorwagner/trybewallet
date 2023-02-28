const CURRENCY_API = 'https://economia.awesomeapi.com.br/json/all';

const getExchangeRates = async () => {
  try {
    const response = await fetch(CURRENCY_API);
    const json = await response.json();

    return json;
  } catch (error) {
    console.log(error);
  }
};

export default getExchangeRates;
