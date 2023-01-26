/* eslint-disable no-shadow */
/* eslint-disable linebreak-style */
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { createFormSignValidator } from './validatorsign'
import styleSignForm from './Signin.module.css'
import { DogsShopContext, DogsShopProviderContext } from '../../../Contexts/Contexts'
import { dogShopApi } from '../../../api/DogShopApi'

const initialValues = {
  email: '',
  password: '',
}

export function SignIn() {
  const navigate = useNavigate()

  const { setToken } = useContext(DogsShopContext)

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (values) => dogShopApi.signin(values).then((data) => {
      setToken(data.token)
    }),
  })

  const submitHandler = async (values) => {
    await mutateAsync(values)
    setTimeout(() => {
      navigate('/products')
    }, 0)
  }

  return (
    <div className={styleSignForm.signUpForm}>
      <Formik
        initialValues={initialValues}
        validationSchema={createFormSignValidator}
        onSubmit={submitHandler}
      >
        <div className={styleSignForm.containerForm}>
          <div className={styleSignForm.borderStyles}>
            <div className={styleSignForm.styleForm}>
              <Form className={styleSignForm.signForm}>
                <Field name="email" placeholder="Введите e-mail" type="text" />
                <ErrorMessage name="email" />

                <Field name="password" placeholder="Введите пароль" type="password" />
                <ErrorMessage name="password" />

                <button
                  disabled={isLoading}
                  type="submit"
                >
                  {DogsShopProviderContext.token ? 'Войти' : 'Выйти'}
                </button>
              </Form>
            </div>
          </div>
        </div>
      </Formik>
    </div>
  )
}
