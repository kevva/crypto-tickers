import test from 'ava';
import m from '.';

test('get tickers', async t => {
	const tickers = await m();
	t.is(typeof tickers['ETH/BTC'], 'object');
	t.is(typeof tickers['LTC/BTC'], 'object');
	t.is(typeof tickers['ETH/BTC'].binance.last, 'number');
});

test('exports exchanges', t => {
	t.true(m.exchanges.length > 50);
});

test('`exchanges` option', async t => {
	const tickers = await m({exchanges: ['hitbtc2']});
	t.is(typeof tickers['ETH/BTC'].hitbtc2, 'object');
	t.is(typeof tickers['ETH/BTC'].hitbtc2.last, 'number');
	t.is(typeof tickers['LTC/BTC'].hitbtc2, 'object');
	t.is(typeof tickers['LTC/BTC'].hitbtc2.last, 'number');
});

test('`symbols` option', async t => {
	const tickers = await m({exchanges: ['binance'], symbols: ['XRP/BTC']});
	t.is(typeof tickers['XRP/BTC'].binance, 'object');
	t.is(typeof tickers['XRP/BTC'].binance.last, 'number');
});
