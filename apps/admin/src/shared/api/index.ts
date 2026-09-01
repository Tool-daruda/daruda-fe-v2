import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// dev에서는 경로만 남겨 vite 프록시를 태운다. 절대 URL로 두면 cross-site가 되어 쿠키가 실리지 않는다.
const baseURL =
	import.meta.env.DEV && API_BASE_URL
		? new URL(API_BASE_URL, window.location.origin).pathname
		: API_BASE_URL;

export const instance = axios.create({
	baseURL,
	withCredentials: true,
});

// instance.interceptors.request.use(
// 	(config: InternalAxiosRequestConfig) => {
// 		return config;
// 	},
// 	(error) => Promise.reject(error)
// );

export function get<T>(...args: Parameters<typeof instance.get>) {
	return instance.get<T>(...args).then((res) => res.data);
}

export function post<T>(...args: Parameters<typeof instance.post>) {
	return instance.post<T>(...args).then((res) => res.data);
}

export function put<T>(...args: Parameters<typeof instance.put>) {
	return instance.put<T>(...args).then((res) => res.data);
}

export function patch<T>(...args: Parameters<typeof instance.patch>) {
	return instance.patch<T>(...args).then((res) => res.data);
}

export function del<T>(...args: Parameters<typeof instance.delete>) {
	return instance.delete<T>(...args).then((res) => res.data);
}
