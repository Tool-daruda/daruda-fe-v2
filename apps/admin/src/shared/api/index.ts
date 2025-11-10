import axios from "axios";

export const instance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
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
