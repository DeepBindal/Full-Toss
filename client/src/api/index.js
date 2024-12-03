import axios from "axios";

const BASE_URL = 'http://localhost:3000/'

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, 
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('accessToken'); // Use memory/localStorage for access token
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response Interceptor triggered. Response:', response); // Log successful response
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshResponse = await axios.post('http://localhost:3000/user/refresh-token', {}, { withCredentials: true });
                const newAccessToken = refreshResponse.data.access_token;

                localStorage.setItem('accessToken', newAccessToken);
                axiosInstance.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);


//user routes
export const signupUser = (data) => axiosInstance.post('user/register', data);
export const loginUser = (data) => axiosInstance.post('user/login-user', data);
export const tryAccess = () => axiosInstance.get('/user/test-access')
export const logoutUser = () => axiosInstance.get('/user/logout');
export const fetchUser = () => axiosInstance.get('/user/fetch');
export const updateUserTeam = (data)  => axiosInstance.post('/user/update-team', data);


//product routes
export const fetchProducts = (iplTeam) => axiosInstance.get(`/products/fetch-products/${iplTeam}`);

//order routed
export const placeUserOrder = (data) => axiosInstance.post('/orders/place-order', data);
export const fetchUserOrders = () => axiosInstance.get('/orders/fetch-orders');

export default axiosInstance;