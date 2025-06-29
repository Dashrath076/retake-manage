export default (queryString, options) => {
	var qs = require('qs');
	var obj = qs.parse(queryString.slice(1), options); //slice to remove ? mark from the string
	return obj;
};
