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
            className={edditProductStyles.formTypeStyles}
          />
          <div className={edditProductStyles.errorBox}>
            <ErrorMessage className={edditProductStyles.error} name="price" />
          </div>

          <Field
            name="wight"
            placeholder="Вес товара"
            type="text"
            className={edditProductStyles.formTypeStyles}
          />
          <div className={edditProductStyles.errorBox}>
            <ErrorMessage className={edditProductStyles.error} name="wight" />
          </div>

          <Field
            name="description"
            placeholder="Описание"
            type="text"
            className={edditProductStyles.formTypeStyles}
          />
          <div className={edditProductStyles.errorBox}>
            <ErrorMessage className={edditProductStyles.error} name="description" />
          </div>

          <Field
            name="discount"
            placeholder="Скидка"
            type="text"
            className={edditProductStyles.formTypeStyles}
          />
          <div className={edditProductStyles.errorBox}>
            <ErrorMessage className={edditProductStyles.error} name="discount" />
          </div>

          <Field
            name="stock"
            placeholder="Количество"
            type="text"
            className={edditProductStyles.formTypeStyles}
          />
          <div className={edditProductStyles.errorBox}>
            <ErrorMessage className={edditProductStyles.error} name="stock" />
          </div>

          <Field
            name="pictures"
            placeholder="URL"
            type="text"
            className={edditProductStyles.formTypeStyles}
          />
          <div className={edditProductStyles.errorBox}>
            <ErrorMessage className={edditProductStyles.error} name="pictures" />
          </div>

          <Field
            name="name"
            placeholder="Название товара"
            type="text"
            className={edditProductStyles.formTypeStyles}
          />
          <div className={edditProductStyles.errorBox}>
            <ErrorMessage className={edditProductStyles.error} name="name" />
          </div>
          <button
            className={edditProductStyles.formButton}
            type="submit"
          >
            Редактировать

          </button>
        </Form>
      </Formik>
    </div>
  )
}
