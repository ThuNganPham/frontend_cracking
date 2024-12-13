import 'dotenv/config';

export default {
  expo: {
    name: "ShiSo",
    slug: "shiso-app",
    version: "1.0.0",
    extra: {
      baseURLUsersRegister: process.env.BASE_URL_USERS_REGISTER,
    },
  },
};
// Expo sẽ tự động lấy biến từ file .env thông qua dotenv/config trong cấu hình trên. 
// Để sử dụng biến này trong mã React Native, bạn truy cập nó bằng cách sử dụng Constants.

