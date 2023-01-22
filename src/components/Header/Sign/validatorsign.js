/* eslint-disable linebreak-style */

import * as Yup from 'yup'

export const createFormSignValidator = Yup.object({
  email: Yup.string()
    .email('Введите email')
    .required('Ошибка в адресе, или такой почты не существет'),
  password: Yup.string()
    .min(5, 'Минимум 5 символов')
    .max(25, 'Максимум 20 символов')
    .required('Введите пароль'),
})
