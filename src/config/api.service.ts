import axios from 'axios';

const rapidApiHost =
  process.env.NEXT_PUBLIC_RAPIDAPI_HOST ??
  process.env.RAPIDAPI_HOST ??
  'booking-com15.p.rapidapi.com';

const rapidApiKey =
  process.env.NEXT_PUBLIC_RAPIDAPI_API_KEY ?? process.env.RAPIDAPI_API_KEY;

console.log(rapidApiKey);

const request = axios.create({
  baseURL: `https://${rapidApiHost}`,
  headers: {
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': rapidApiKey,
    'X-RapidAPI-Host': rapidApiHost,
  },
});

request.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  return config;
});

export const api = {
  get: <T = unknown>(url: string, config?: Parameters<typeof request.get>[1]) =>
    request.get<T>(url, config).then((res) => res.data),

  post: <T = unknown>(
    url: string,
    data?: unknown,
    config?: Parameters<typeof request.post>[2]
  ) => request.post<T>(url, data, config).then((res) => res.data),

  put: <T = unknown>(
    url: string,
    data?: unknown,
    config?: Parameters<typeof request.put>[2]
  ) => request.put<T>(url, data, config).then((res) => res.data),

  upload: <T = unknown>(url: string, formData: FormData) =>
    request.post<T>(url, formData).then((res) => res.data),

  patch: <T = unknown>(
    url: string,
    data?: unknown,
    config?: Parameters<typeof request.patch>[2]
  ) => request.patch<T>(url, data, config).then((res) => res.data),

  delete: <T = unknown>(
    url: string,
    config?: Parameters<typeof request.delete>[1]
  ) => request.delete<T>(url, config).then((res) => res.data),
};
