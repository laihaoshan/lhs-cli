import { get } from '@/axios';

export const getByPrefixUrl = (data: any) => {
	return get(`/xxx`, data, {
		params: data,
	});
};
