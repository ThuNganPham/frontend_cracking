import * as Yup from 'yup';

export const getValidationSchema = (t: (key: string) => string) => {
  return Yup.object().shape({
    username: Yup.string()
      .required(t('MustFillUsername'))
      .matches(
        /^[A-Za-z\d!@#$%^&*()_+=[\]{};:'",.<>?/-]{5,}$/,
        t('UsernameRequire')
      ),
    password: Yup.string()
      .required(t('MustFillPassword'))
      .matches(
        /^(?!.*\s)(?=.*[!@#$%^&*()_+=[\]{};:'",.<>?/-])[A-Za-z\d!@#$%^&*()_+=[\]{};:'",.<>?/-]{5,}$/,
        t('PasswordRequired')
      ),
    phoneNumber: Yup.string()
      .required(t('PhoneNumberRequired'))
      .matches(
        /^[0-9]{10,15}$/,
        t('InvalidPhoneNumber')
      ),
  });
};
