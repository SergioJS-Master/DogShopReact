/* eslint-disable linebreak-style */

import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { createFormSignValidator } from './validatorsign'
import styleSignForm from './Sign.module.css'

const initialValues = {
  email: 'email here',
  password: 'password here',
}

export function Sign() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createFormSignValidator}
      onSubmit={(values) => {
        console.log(values)
      }}
    >
      <Form className={styleSignForm.signForm}>
        <Field name="email" placeholder="Введите e-mail" type="text" />
        <ErrorMessage name="email" />

        <Field name="password" placeholder="Введите пароль" type="text" />
        <ErrorMessage name="password" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  )
}
