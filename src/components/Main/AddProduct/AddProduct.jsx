import { useMutation } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Formik, Form,
} from 'formik'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { dogShopApi } from '../../../api/DogShopApi'
import { getTokenSelector } from '../../../redux/slices/userSlice'
import { Loader } from '../../Loader/Loader'
// import { createFormAddroduct } from './validatorAddProduct'
import addProductStyles from './AddProduct.module.css'

export function AddProduct() {
  const token = useSelector(getTokenSelector)
  const navigate = useNavigate()

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
    mutationFn: (values) => dogShopApi.addNewProduct(token, values),
  })

  const submitHandler = async (values) => {
    await mutateAsync(values)
    setTimeout(() => {
      navigate('/products')
    })
  }

  if (isLoading) {
    return <Loader />
  }
  return (
    <div className={addProductStyles.formStyles}>
      <Formik
        initialValues={initialValuesReviews}
        // validationSchema={createFormAddroduct}
        onSubmit={submitHandler}
      >
        <Form>
          <h2>Добавьте продукт:</h2>
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
          <button type="submit">Оставить отзыв</button>
        </Form>
      </Formik>
    </div>
  )
}
