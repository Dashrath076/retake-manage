import {Meteor} from 'meteor/meteor';
import {useQuery} from 'react-query';

// https://react-query.tanstack.com/guides/disabling-queries

const defaultConfig = {
	refetchOnWindowFocus: false,
	// staleTime: 5000,
};

const queryFn = function({queryKey: [method, ...params], meta}) {
	return new Promise((resolve, reject) => {
		const paramsWithoutLink = params.slice(0, -1);
		Meteor.call(method, ...paramsWithoutLink, (err, result) => {
			if (err) reject(err);
			if (typeof meta?.callback === 'function') meta.callback(err, result, {queryKey: [method, ...params]});
			resolve(result);
		});
	});
};

// args is an array with the meteor method name as first value, and
// method parameters as the next values
// skipUrlFromQueryHash - to not keep url in the hash - esp. if filters are in url, it will cause the method to be fetched twice
export function useMeteorData(args, {skipUrlFromQueryHash, ...config} = {}) {
	const executable = Array.isArray(args);
	if (!executable) Log.fatal('Bad arguments to useMeteorData', args, config);
	return useQuery(
		[
			...args,
			// 1 extra array items will be passed to the queryFn
			// Meteor.isClient && !skipUrlFromQueryHash ? window.location.href : '',
		],
		queryFn,
		{
			...defaultConfig,
			...config,
			...(!executable ? {enabled: false} : {}),
		},
	);
}
