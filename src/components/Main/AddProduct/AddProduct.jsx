import { useMutation } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Formik, Form,
} from 'formik'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { dogShopApi } from '../../../api/DogShopApi'
import { getTokenSelector } from '../../../redux/slices/userSlice'
import { Loader } from '../../Loader/Loader'
import { createFormAddroduct } from './validatorAddProduct'
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
        validationSchema={createFormAddroduct}
        onSubmit={submitHandler}
      >
        <Form>
          <h2>Добавьте продукт:</h2>
          <hr />
          <Field
            name="price"
            placeholder="Цена"
            type="text"
            className={addProductStyles.formTypeStyles}
          />
          <div className={addProductStyles.errorBox}>
            <ErrorMessage className={addProductStyles.error} name="price" />
          </div>

          <Field
            name="wight"
            placeholder="Вес товара"
            type="text"
            className={addProductStyles.formTypeStyles}
          />
          <div className={addProductStyles.errorBox}>
            <ErrorMessage className={addProductStyles.error} name="wight" />
          </div>

          <Field
            name="description"
            placeholder="Описание"
            type="text"
            className={addProductStyles.formTypeStyles}
          />
          <div className={addProductStyles.errorBox}>
            <ErrorMessage className={addProductStyles.error} name="description" />
          </div>

          <Field
            name="discount"
            placeholder="Скидка"
            type="text"
            className={addProductStyles.formTypeStyles}
          />
          <div className={addProductStyles.errorBox}>
            <ErrorMessage className={addProductStyles.error} name="discount" />
          </div>

          <Field
            name="stock"
            placeholder="Количество"
            type="text"
            className={addProductStyles.formTypeStyles}
          />
          <div className={addProductStyles.errorBox}>
            <ErrorMessage className={addProductStyles.error} name="stock" />
          </div>

          <Field
            name="pictures"
            placeholder="URL"
            type="text"
            className={addProductStyles.formTypeStyles}
          />
          <div className={addProductStyles.errorBox}>
            <ErrorMessage className={addProductStyles.error} name="pictures" />
          </div>

          <Field
            name="name"
            placeholder="Название товара"
            type="text"
            className={addProductStyles.formTypeStyles}
          />
          <div className={addProductStyles.errorBox}>
            <ErrorMessage className={addProductStyles.error} name="name" />
          </div>
          <hr />
          <button
            type="submit"
            className={addProductStyles.formButton}
          >
            Добавить

          </button>
        </Form>
      </Formik>
    </div>
  )
}
