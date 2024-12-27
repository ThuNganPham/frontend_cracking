import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
// import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Lấy baseURL từ `expo.config.js`
// const baseURLUsersRegister = Constants.expo?.extra?.baseURLUsersRegister;

const baseURLUsersRegister = "http://192.168.88.126:3001/api";

// if (!baseURLUsersRegister) {
//   throw new Error('BASE_URL_USERS_REGISTER not available in expo.config.js');
// }

// Tạo axios instance
const axiosClient: AxiosInstance = axios.create({
  baseURL: baseURLUsersRegister,
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm token vào request nếu có
axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const token = await AsyncStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Xử lý response hoặc lỗi
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response; // Trả về toàn bộ response nếu không có lỗi
  },
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi là 401 và chưa thử refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Gọi API refresh token
        const response = await axiosClient.post('/users/refresh-token', {}, { withCredentials: true });

        // Lưu access token mới
        const newAccessToken = response.data.access_token;
        await AsyncStorage.setItem('access_token', newAccessToken);

        // Gắn token mới vào header và thử lại request ban đầu
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);

        // Xóa token khỏi AsyncStorage nếu refresh thất bại
        await AsyncStorage.removeItem('access_token');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;




