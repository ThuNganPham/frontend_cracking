import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Lấy baseURL từ `expo.config.js`
// const baseURLUsersRegister = Constants.expo?.extra?.baseURLUsersRegister;

const baseURLUsersRegister= "https://4kdjjrg3-3001.asse.devtunnels.ms/api"

if (!baseURLUsersRegister) {
  throw new Error('BASE_URL_USERS_REGISTER not available in expo.config.js');
}

// Tạo axios instance
const axiosClient: AxiosInstance = axios.create({
  baseURL: baseURLUsersRegister,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm token vào request nếu có
axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    // Lấy token từ AsyncStorage thay vì localStorage
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
  (response: AxiosResponse) => response.data,
  (error) => {
    alert(`Đã xảy ra lỗi: ${error.response?.data?.message || 'Không xác định'}`);
    return Promise.reject(error);
  }
);

export default axiosClient;
