import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { createFormSignUpValidator } from './validator'
import styleSignUp from './Signup.module.css'
import logoHeaderTwo from '../../Img/logoTwo.png'
import { dogShopApi } from '../../../api/DogShopApi'
import { Loader } from '../../Loader/Loader'

const initialValues = {
  email: '',
  group: '',
  password: '',
}

export function SignUp() {
  const [isOpen, setOpen] = useState(false)

  const navigate = useNavigate()

  // eslint-disable-next-line max-len
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (values) => dogShopApi.signUp(values),
  })

  const submitHandler = async (values) => {
    await mutateAsync(values)
    navigate('/signin')
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={styleSignUp.signUpForm}>
      <Formik
        initialValues={initialValues}
        validationSchema={createFormSignUpValidator}
        onSubmit={submitHandler}
      >
        <div className={styleSignUp.containerForm}>
          <div className={styleSignUp.borderStyles}>
            <div className={styleSignUp.styleForm}>
              <Form className={styleSignUp.dferge}>
                <img src={logoHeaderTwo} alt="" />
                <h2>Регистрация</h2>
                <Field name="email" placeholder="Введите e-mail" type="email" />
                <ErrorMessage name="email" />

                <Field name="group" placeholder="Придумайте имя" type="text" />
                <ErrorMessage name="group" />

                <Field
                  name="password"
                  placeholder="Придумайте пароль"
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
                <button disabled={isLoading} type="submit">Зарегистрироваться</button>
              </Form>
            </div>
          </div>
        </div>
      </Formik>
    </div>
  )
}
