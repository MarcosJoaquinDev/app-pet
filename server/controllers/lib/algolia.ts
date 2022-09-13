import algoliasearch from 'algoliasearch';

const client = algoliasearch(
	process.env.ALGOLGIA_USER,
	process.env.ALGOLGIA_TOKEN
);
const index = client.initIndex('Pet');
export { index };
