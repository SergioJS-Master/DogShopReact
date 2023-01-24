/* eslint-disable linebreak-style */
// eslint-disable-next-line object-curly-newline
import { Formik, Form, Field, ErrorMessage } from 'formik'
// eslint-disable-next-line import/no-extraneous-dependencies
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { createFormSignUpValidator } from './validator'
import styleSignUp from './Signup.module.css'
import logoHeaderTwo from '../../Img/logoTwo.png'
import { dogShopApi } from '../../../api/DogShopApi'

const initialValues = {
  email: '',
  group: '',
  password: '',
}

export function Signup() {
  const navigate = useNavigate()

  // eslint-disable-next-line max-len
  const { mutateAsync, isLoading } = useMutation({ mutationFn: (values) => dogShopApi.signUp(values) })

  const submitHandler = async (values) => {
    await mutateAsync(values)
    navigate('/sign')
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
              <Form>
                <img src={logoHeaderTwo} alt="" />
                <h2>Регистрация</h2>
                <Field name="email" placeholder="Введите e-mail" type="email" />
                <ErrorMessage name="email" />

                <Field name="group" placeholder="Придумайте имя" type="text" />
                <ErrorMessage name="group" />

                <Field
                  name="password"
                  placeholder="Придумайте пароль"
                  type="text"
                />
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
