/* eslint-disable linebreak-style */

import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { createFormSignUpValidator } from './validator'
import styleSignUp from './Signup.module.css'

const initialValues = {
  email: 'email here',
  group: 'sm9',
  password: 'password here',
}

export function Signup() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createFormSignUpValidator}
      onSubmit={(values) => {
        console.log(values)
      }}
    >
      <Form className={styleSignUp.signUpForm}>
        <Field name="email" placeholder="Введите e-mail" type="text" />
        <ErrorMessage name="email" />

        <Field name="group" placeholder="Придумайте имя" type="text" />
        <ErrorMessage name="group" />

        <Field
          name="password"
          placeholder="Придумайте пароль (мин. 5 символов)"
          type="text"
        />
        <ErrorMessage name="password" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  )
}
