const CURRENCY_API = 'https://economia.awesomeapi.com.br/json/all';

const getCurrencies = async () => {
  const response = await fetch(CURRENCY_API);
  const json = await response.json();

  return (Object.keys(json).filter((currency) => currency !== 'USDT'));

  // return response.ok
  //   ? Promise.resolve(Object.keys(json).filter((currency) => currency !== 'USDT'))
  //   : Promise.reject(json);
};

export default getCurrencies;
