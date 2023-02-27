import * as Yup from 'yup'

export const createFormAddReviewsValidation = Yup.object({
  text: Yup.string()
    .min(5, 'Минимум 5 символов')
    .max(500, 'Максимально 500 символов')
    .required('Необходимо написать отзыв'),
  rating: Yup.string()
    .required('Необходимо поставить рейтинг'),
})
