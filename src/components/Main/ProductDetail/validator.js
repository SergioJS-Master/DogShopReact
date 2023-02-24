import * as Yup from 'yup'

export const createFormSignUpValidator = Yup.object({
  text: Yup.string()
    .max(500, 'Максимально 500 символов')
    .required('Придумайте email'),
})
