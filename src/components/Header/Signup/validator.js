/* eslint-disable linebreak-style */

import * as Yup from 'yup'

export const createFormSignUpValidator = Yup.object({
  email: Yup.string()
    .email('Некорректный адрес почты')
    .required('Придумайте email'),
  group: Yup.string()
    .min(3, 'Минимум 3 символа')
    .max(20, 'Максимум 20 символов')
    .required('Придумайте номер группы'),
  password: Yup.string()
    .min(5, 'Минимум 5 символов')
    .max(25, 'Максимум 20 символов')
    .required('Придумайте пароль'),
})
