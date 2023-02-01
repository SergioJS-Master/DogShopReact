/* eslint-disable func-names */
import { Loader } from '../Loader/Loader'
import withQueryStyles from './withQuery.module.css'

export const withQuery = (WrappedComponent) => function ({
  error, isLoading, refetch, ...rest
}) {
  if (error) {
    return (
      <div className={withQueryStyles.errorRefetchStyle}>
        <p>
          Произошла ошибка:
          {' '}
          {error.message}
        </p>
        <button
          onClick={refetch}
          type="button"
          className={withQueryStyles.buttonRefetch}
        >
          Отправить новый запрос
        </button>
      </div>
    )
  }

  if (isLoading) {
    return <Loader />
  }
  return <WrappedComponent {...rest} />
}
