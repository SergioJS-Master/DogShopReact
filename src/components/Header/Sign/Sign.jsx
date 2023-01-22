/* eslint-disable no-shadow */
/* eslint-disable linebreak-style */
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { createFormSignValidator } from './validatorsign'
import styleSignForm from './Sign.module.css'
import { DogsShopContext } from '../../../Contexts/Contexts'

const initialValues = {
  email: '',
  password: '',
}

export function Sign() {
  const navigate = useNavigate()

  const { setToken } = useContext(DogsShopContext)

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (data) => fetch('https://api.react-learning.ru/signin', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error(`Ошибка - ${res.status}: неверный логин или пароль`)
        }
        if (res.status === 404) {
          throw new Error(`Ошибка - ${res.status}: пользователь с email:${res.email} не найден`)
        }
        return res
      })
      .then((res) => res.json())
      .then((data) => { setToken(data.token) }),
  })

  const submitHandler = async (values) => {
    await mutateAsync(values)
    console.log(values)
    navigate('/products')
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createFormSignValidator}
      onSubmit={submitHandler}
    >
      <Form className={styleSignForm.signForm}>
        <Field name="email" placeholder="Введите e-mail" type="text" />
        <ErrorMessage name="email" />

        <Field name="password" placeholder="Введите пароль" type="text" />
        <ErrorMessage name="password" />

        <button disabled={isLoading} type="submit">Войти</button>
      </Form>
    </Formik>
  )
}
