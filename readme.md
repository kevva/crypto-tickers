# crypto-tickers [![Build Status](https://travis-ci.org/kevva/crypto-tickers.svg?branch=master)](https://travis-ci.org/kevva/crypto-tickers)

> Get price tickers for crypto currencies


## Install

```
$ npm install crypto-tickers
```


## Usage

```js
const cryptoTickers = require('crypto-tickers');

cryptoTickers().then(tickers => {
	console.log(tickers);
	/*
		{
			'ETH/BTC': {
				binance: {...},
				bitfinex: {...},
				...
			},
			...
		}
	*/
});
```


## API

### cryptoTickers([options])

Returns a Promise for an object with each symbol pair defined as keys. Each ticker has the following structure https://github.com/ccxt/ccxt/wiki/Manual#price-tickers.

#### options

Type: `Object`

##### exchanges

Type: `Array<String>`<br>
Default: `['binance', 'bitfinex', 'bittrex', 'gdax', 'poloniex']`

Exchanges to fetch price tickers from.

##### symbols

Type: `Array<String>`<br>
Default: `['ETH/BTC', 'LTC/BTC']`

Symbol pairs to fetch.

### cryptoTickers.exchanges

Returns an array of all available exchanges.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
