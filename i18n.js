import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import vi from './locales/vi.json';

// Khởi tạo i18n với Tiếng Việt làm mặc định
i18n
  .use(initReactI18next)
  .init({
    lng: 'vi', // Đặt ngôn ngữ mặc định là Tiếng Việt
    fallbackLng: 'vi', // Nếu không tìm thấy ngôn ngữ sẽ dùng Tiếng Việt
    resources: {
      en: { translation: en },
      vi: { translation: vi },
    },
    interpolation: {
      escapeValue: false, // React Native tự xử lý
    },
  });

export default i18n;
