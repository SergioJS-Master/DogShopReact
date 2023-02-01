/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
/* eslint-disable linebreak-style */
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { createFormSignValidator } from './validatorsign'
import styleSignForm from './Signin.module.css'
import { DogsShopContext } from '../../../Contexts/Contexts'
import { dogShopApi } from '../../../api/DogShopApi'
import { Loader } from '../../Loader/Loader'

const initialValues = {
  email: '',
  password: '',
}

export function SignIn() {
  const navigate = useNavigate()
  const [isOpen, setOpen] = useState(false)

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
    })
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={styleSignForm.signInForm}>
      <Formik
        initialValues={initialValues}
        validationSchema={createFormSignValidator}
        onSubmit={submitHandler}
      >
        <div className={styleSignForm.containerForm}>
          <div className={styleSignForm.borderStyles}>
            <div className={styleSignForm.styleForm}>
              <Form className={styleSignForm.signForm}>
                <h2>Авторизация</h2>
                <Field name="email" placeholder="Введите e-mail" type="text" />
                <ErrorMessage name="email" />

                <Field
                  name="password"
                  placeholder="Введите пароль"
                  type={isOpen ? 'text' : 'password'}
                />
                <label>
                  <input
                    onClick={() => setOpen(!isOpen)}
                    type="checkbox"
                    className="password-checkbox"
                  />
                  {' '}
                  Показать пароль
                </label>
                <ErrorMessage name="password" />
                <button disabled={isLoading} type="submit">Войти</button>
              </Form>
            </div>
          </div>
        </div>
      </Formik>
    </div>
  )
}
