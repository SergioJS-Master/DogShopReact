/* eslint-disable linebreak-style */

import * as Yup from 'yup'

export const createFormSignUpValidator = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  group: Yup.string()
    .min(1, 'Must be 1 characters or more')
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  password: Yup.string()
    .min(5, 'Must be 5 characters or more')
    .max(25, 'Must be 15 characters or less')
    .required('Required'),
})
