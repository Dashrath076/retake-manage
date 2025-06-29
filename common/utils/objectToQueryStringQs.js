export default (obj) => {
	var qs = require('qs');
	var str = qs.stringify(obj);
	return str ? `?${str}` : str;
};
