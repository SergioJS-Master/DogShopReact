import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { dogShopApi } from '../../../../api/DogShopApi'
import { getTokenSelector } from '../../../../redux/slices/userSlice'
import { Loader } from '../../../Loader/Loader'
import edditProductStyles from './EdditAddProduct.module.css'
import { createFormedditProduct } from './validatorEdditProduct'

export function EdditAddProduct() {
  const token = useSelector(getTokenSelector)
  const { productId } = useParams()
  //   const navigate = useNavigate()
  const queryClient = useQueryClient()

  const initialValuesReviews = {
    price: '',
    wight: '',
    description: '',
    discount: '',
    stock: '',
    pictures: '',
    name: '',
  }

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (values) => dogShopApi.edditAddMyProduct(productId, token, values),
  })

  const edditHandler = async (values) => {
    await mutateAsync(values)
    queryClient.invalidateQueries({
      queryKey: ['Detail'],
    })
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={edditProductStyles.formStyles}>
      <Formik
        initialValues={initialValuesReviews}
        validationSchema={createFormedditProduct}
        onSubmit={edditHandler}
      >
        <Form>
          <h2>Редактировать карточку:</h2>
          <Field
            name="price"
            placeholder="Цена"
            type="text"
          />
          <ErrorMessage name="price" />

          <Field
            name="wight"
            placeholder="Вес товара"
            type="text"
          />
          <ErrorMessage name="wight" />

          <Field
            name="description"
            placeholder="Описание"
            type="text"
          />
          <ErrorMessage name="description" />

          <Field
            name="discount"
            placeholder="Скидка"
            type="text"
          />
          <ErrorMessage name="discount" />

          <Field
            name="stock"
            placeholder="Количество"
            type="text"
          />
          <ErrorMessage name="stock" />

          <Field
            name="pictures"
            placeholder="URL"
            type="text"
          />
          <ErrorMessage name="pictures" />

          <Field
            name="name"
            placeholder="Название товара"
            type="text"
          />
          <ErrorMessage name="name" />
          <button type="submit">Редактировать</button>
        </Form>
      </Formik>
    </div>
  )
}
