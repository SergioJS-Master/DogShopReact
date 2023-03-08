/* eslint-disable linebreak-style */

import * as Yup from 'yup'

export const createFormAddroduct = Yup.object({
  wight: Yup.string()
    .required('Введите вес'),
  description: Yup.string()
    .required('Введите описание'),
  discount: Yup.string()
    .required('Введите скидку'),
  stock: Yup.string()
    .required('Введите количество'),
  pictures: Yup.string()
    .required('Укажите картинку в URL'),
  name: Yup.string()
    .required('Введите имя'),
  price: Yup.string()
    .required('Введите цену'),
})
