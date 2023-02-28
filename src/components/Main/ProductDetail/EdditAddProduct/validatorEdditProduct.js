/* eslint-disable linebreak-style */

import * as Yup from 'yup'

export const createFormedditProduct = Yup.object({
  wight: Yup.string()
    .required(),
  description: Yup.string()
    .required(),
  discount: Yup.string()
    .required(),
  stock: Yup.string()
    .required(),
  pictures: Yup.string()
    .required(),
  name: Yup.string()
    .required(),
  price: Yup.string()
    .required(),
})
