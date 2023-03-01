/* eslint-disable func-names */
import { NavLink } from 'react-router-dom'
import { Loader } from '../Loader/Loader'
import withQueryStyles from './withQuery.module.css'

export const withQuery = (WrappedComponent) => function ({
  error, isError, isLoading, token, refetch, ...rest
}) {
  if (error) {
    return (
      <div className={withQueryStyles.errorRefetchStyle}>
        <p>
          Произошла ошибка:
          {' '}
          {error.message}
        </p>
        <div className={withQueryStyles.buttonRefetchPosition}>
          <li>
            <NavLink to="/signin">
              <button
                onClick={refetch}
                type="button"
                className={withQueryStyles.buttonRefetch}
              >
                Перейти в раздел авторизации
              </button>
            </NavLink>
          </li>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return <Loader />
  }
  if (token === '') {
    return <p>Авторзуйтесь  систему для просмотра каталога</p>
  }
  return <WrappedComponent {...rest} />
}
