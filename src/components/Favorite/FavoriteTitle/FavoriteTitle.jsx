/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { dogShopApi } from '../../../api/DogShopApi'
import { getFavoriteSelector } from '../../../redux/slices/favoriteSlice'
import { getTokenSelector } from '../../../redux/slices/userSlice'
import { Loader } from '../../Loader/Loader'
import { FavoriteCard } from '../FavoriteCard/FavoriteCard'
import favoriteTitleStyle from './FavoriteTitle.module.css'

export function FavoriteTitle() {
  const token = useSelector(getTokenSelector)
  const favorite = useSelector(getFavoriteSelector)
  const ids = favorite.map((item) => item.id)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  console.log(dispatch)

  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [token])

  const {
    data, error, isLoading, refetch,
  } = useQuery({
    queryKey: ['favorite', favorite],
    queryFn: () => dogShopApi.getProductsByIds(ids, token),
    keepPreviousData: true,
  })
  console.log({ data })
  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return (
      <div>
        <p>
          Произошла ошибка:
          {' '}
          {error.message}
        </p>
        <div>
          <li>
            <NavLink to="/signin">
              <button
                onClick={refetch}
                type="button"
              >
                Перейти в раздел авторизации
              </button>
            </NavLink>
          </li>
        </div>
      </div>
    )
  }

  return (
    <div className={favoriteTitleStyle.favoriteTitleBlock}>
      <div className={favoriteTitleStyle.test}>

        {data.map((item) => (
          <FavoriteCard
            pictures={item.pictures}
            index={item.index}
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            discount={item.discount}
            stock={item.stock}
          />
        ))}

      </div>
    </div>
  )
}
