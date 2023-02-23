/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { dogShopApi } from '../../../api/DogShopApi'
import { basketAdd, getBasketSelector } from '../../../redux/slices/basketSlice'
import { favoriteAdd, getFavoriteSelector } from '../../../redux/slices/favoriteSlice'
// import { favoriteAdd } from '../../../redux/slices/favoriteSlice'
import { getTokenSelector } from '../../../redux/slices/userSlice'
import { Loader } from '../../Loader/Loader'
import ProductDetailStyles from './ProductDetail.module.css'

export function ProductDetail() {
  const token = useSelector(getTokenSelector)
  const { productId } = useParams()
  const dispatch = useDispatch()

  // const ids = details.map((item) => item.id)

  // запрос на получение id для детальной информации
  const {
    data, isLoading,
  } = useQuery({
    queryKey: ['Detail'],
    queryFn: () => dogShopApi.getDetailsProduct(productId, token),
  })

  if (isLoading) {
    return <Loader />
  }

  function addProductFromFavoriteInBasket() {
    dispatch(basketAdd(data._id))
  }

  function addProductFromDetailInFavorite() {
    dispatch(favoriteAdd(data._id))
  }

  const details = useSelector(getBasketSelector)
  const oneProduct = details.map(({ id }) => id).includes(data._id)

  const favorite = useSelector(getFavoriteSelector)
  const oneProductInFavorite = favorite.map(({ id }) => id).includes(data._id)

  return (
    <div className={ProductDetailStyles.ProductDetailStylesBorderOne}>
      <div className={ProductDetailStyles.ProductDetailStylesBorder}>
        <div className={ProductDetailStyles.ProductDetailStylesContainer}>
          <div className={ProductDetailStyles.ProductDetailStylesContent}>
            <div>
              <img src={data.pictures} alt="logo" />
            </div>
            <div>
              <h2>{data.name}</h2>
              <hr />
              <p>
                <span>Скидка: </span>
                {data.discount}
                {' '}
                <span> %</span>
              </p>
              <p>
                <span>Цена: </span>
                {data.price}
                {' '}
                <span> ₽</span>
              </p>
              <p>
                <span>Описание: </span>
                {data.description}
              </p>
              <p>
                <span>Вес в одной упаковке: </span>
                {data.wight}
                {' '}
              </p>
              <p>
                <span>Количество на складке: </span>
                {data.stock}
                {' '}
                <span> шт.</span>
              </p>
              <hr />
              <div className={ProductDetailStyles.ProductDetailStylesButton}>
                <button
                  onClick={addProductFromFavoriteInBasket}
                  disabled={oneProduct}
                >
                  {oneProduct ? (<i className="fa-solid fa-square-check" />) : (
                    <span>
                      <i className="fa-solid fa-plus" />
                      <i className="fa-solid fa-cart-shopping" />
                    </span>
                  )}
                </button>
                <button
                  onClick={addProductFromDetailInFavorite}
                  disabled={oneProductInFavorite}
                >
                  {oneProductInFavorite ? (<i className="fa-solid fa-heart-circle-check" />) : (<i className="fa-regular fa-heart" />)}
                </button>
                <p>
                  <span>В избранном: </span>
                  {data.likes.length}
                  <span> </span>
                  <i className="fa-solid fa-heart" />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={ProductDetailStyles.ProductDetailStylesReviewsBorder}>
          <p>
            Количество отзывов:
            {' '}
            <span />
            {data.reviews.length}
          </p>
          <div className={ProductDetailStyles.ProductDetailStylesReviewsContainer}>
            {data.reviews.map((e) => (
              <div className={ProductDetailStyles.ProductDetailOnReviewsCard}>
                <div className={ProductDetailStyles.created_at}>
                  <p>
                    <span>Автор: </span>
                    {e.author}
                  </p>
                  <p>
                    {' '}
                    <span>Дата отзыва: </span>
                    {e.created_at}
                  </p>
                </div>
                <hr />
                <div className={ProductDetailStyles.ProductDetailHeadReviews}>
                  <p>
                    <span>Комментарий:</span>
                    <span> </span>
                    {e.text}
                  </p>
                </div>
                <hr />
                <div className={ProductDetailStyles.ProductDetailRating}>
                  <p>
                    {e.rating}
                    {' '}
                    <span> </span>
                    <i className="fa-solid fa-star" />
                  </p>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  )
}
