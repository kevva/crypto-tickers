'use strict';
const arrayUniq = require('array-uniq');
const Ccxt = require('ccxt');
const pReduce = require('p-reduce');

const getExchanges = exchanges => Promise.all(exchanges.map(async x => {
	if (!Ccxt.exchanges.includes(x)) {
		throw new Error(`"${x}" exchange is not supported`);
	}

	const exchange = new Ccxt[x]();
	await exchange.loadMarkets();

	return exchange;
}));

const getTickers = async (exchanges, symbol) => pReduce(exchanges, async (obj, exchange) => {
	obj[exchange.id] = await exchange.fetchTicker(symbol);
	return obj;
}, {});

module.exports = async opts => {
	opts = Object.assign({
		exchanges: ['binance', 'bitfinex', 'bittrex', 'gdax', 'poloniex'],
		symbols: ['ETH/BTC', 'LTC/BTC']
	}, opts);

	const exchanges = await getExchanges(opts.exchanges);
	const symbols = arrayUniq([].concat.apply([], exchanges.map(exchange => exchange.symbols)))
		.filter(symbol => {
			const ret = exchanges.filter(exchange => exchange.symbols.includes(symbol)).length > 0;

			if (Array.isArray(opts.symbols)) {
				return opts.symbols.includes(symbol) && ret;
			}

			return ret;
		});

	return pReduce(symbols, async (obj, symbol) => {
		obj[symbol] = await getTickers(exchanges, symbol);
		return obj;
	}, {});
};

module.exports.exchanges = Ccxt.exchanges;
