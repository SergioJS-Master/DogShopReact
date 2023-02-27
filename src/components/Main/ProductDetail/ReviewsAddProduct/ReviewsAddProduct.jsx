/* eslint-disable react/no-array-index-key */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  ErrorMessage, Field, Formik, Form,
} from 'formik'
import { useState } from 'react'
import { dogShopApi } from '../../../../api/DogShopApi'
import { getTokenSelector } from '../../../../redux/slices/userSlice'
import { Loader } from '../../../Loader/Loader'
import star from '../../../Img/star.png'
import blackStar from '../../../Img/blackStar.jpg'
import ReviewsAddProductStyle from './ReviewsAddProduct.module.css'
import { createFormAddReviewsValidation } from './validatorRevies'

export function ReviewsAddProduct() {
  const { productId } = useParams()
  const arrStar = [0, 1, 2, 3, 4]
  const token = useSelector(getTokenSelector)
  const queryClient = useQueryClient()
  const [rating, setRating] = useState(5)

  const initialValuesReviews = {
    text: '',
    rating: '',
  }

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (values) => dogShopApi.addReviews(productId, token, values),
  })

  const submitHandler = async (values) => {
    await mutateAsync(values)
    queryClient.invalidateQueries({
      queryKey: ['Detail'],
    })
  }

  if (isLoading) {
    return <Loader />
  }
  return (
    <Formik
      initialValues={initialValuesReviews}
      validationSchema={createFormAddReviewsValidation}
      onSubmit={submitHandler}
    >
      {({ setFieldValue }) => (
        <Form>
          <h2>Оставьте отзыв:</h2>
          <Field
            name="text"
            placeholder="Оставьте отзыв"
            type="text"
          />
          <ErrorMessage name="text" />
          <div className={ReviewsAddProductStyle.ratingStarStyle}>
            {arrStar.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setRating(index + 1)
                  setFieldValue('rating', index + 1)
                }}
              >
                <img
                  src={index + 1 <= rating ? `${star}` : `${blackStar}`}
                  alt="icon-start"
                />
              </button>
            ))}
          </div>
          <button type="submit">Оставить отзыв</button>
        </Form>
      )}
    </Formik>
  )
}
