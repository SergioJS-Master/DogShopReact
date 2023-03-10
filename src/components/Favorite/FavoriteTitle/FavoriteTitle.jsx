/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { dogShopApi } from '../../../api/DogShopApi'
import { getFavoriteSelector } from '../../../redux/slices/favoriteSlice'
import { getTokenSelector } from '../../../redux/slices/userSlice'
import { Loader } from '../../Loader/Loader'
import { FavoriteCard } from '../FavoriteCard/FavoriteCard'
import favoriteTitleStyle from './FavoriteTitle.module.css'
import logo from '../../Img/logoTwo.png'

export function FavoriteTitle() {
  const token = useSelector(getTokenSelector)
  const favorite = useSelector(getFavoriteSelector)
  const ids = favorite.map((item) => item.id)
  const navigate = useNavigate()

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
    <div className={favoriteTitleStyle.favoriteTitleBlockBorderAll}>
      {data.length === 0 && (
        <div className={favoriteTitleStyle.test}>
          <div className={favoriteTitleStyle.favoriteTitleBlockBorderZero}>
            <div className={favoriteTitleStyle.favoriteTitleBlockAllZero}>
              <div className={favoriteTitleStyle.favoriteTitleBlockContantZero}>
                <hr />
                <p>
                  В избранном пусто, перейти в
                  {' '}
                  <Link to="/products">каталог</Link>
                </p>
                <hr />
                <img src={logo} alt="logo" />
              </div>
            </div>
          </div>
        </div>
      )}

      {data.length > 0 && (
        <div className={favoriteTitleStyle.favoriteTitleBlockAll}>
          <div className={favoriteTitleStyle.favoriteTitleHeaderText}>
            <h2>● Избранное ●</h2>
          </div>
          <div className={favoriteTitleStyle.favoriteTitleBorder}>
            <div className={favoriteTitleStyle.favoriteTitleBlock}>
              <div className={favoriteTitleStyle.test}>

                {data.map((item) => (
                  <FavoriteCard
                    key={item._id}
                    pictures={item.pictures}
                    index={item.index}
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    discount={item.discount}
                    stock={item.stock}
                  />
                ))}

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
