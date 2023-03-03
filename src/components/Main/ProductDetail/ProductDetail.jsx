/* eslint-disable max-len */

import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { dogShopApi } from '../../../api/DogShopApi'
import { basketAdd, getBasketSelector } from '../../../redux/slices/basketSlice'
import { favoriteAdd, getFavoriteSelector } from '../../../redux/slices/favoriteSlice'
import { getTokenSelector, getUserIdSelector } from '../../../redux/slices/userSlice'
import { Loader } from '../../Loader/Loader'
import { Modal } from '../../Modal/Modal'
import { EdditAddProduct } from './EdditAddProduct/EdditAddProduct'
import ProductDetailStyles from './ProductDetail.module.css'
import { ReviewsAddProduct } from './ReviewsAddProduct/ReviewsAddProduct'
import logoTwo from '../../Img/logoTwo.png'

export function ProductDetail() {
  const navigate = useNavigate()
  const userId = useSelector(getUserIdSelector)
  const { productId } = useParams()
  const dispatch = useDispatch()

  const token = useSelector(getTokenSelector)
  const details = useSelector(getBasketSelector)
  const favorite = useSelector(getFavoriteSelector)

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenModalForm, serIsOpenModalForm] = useState(false)

  const closeModalHandlerForm = () => {
    serIsOpenModalForm(false)
  }

  const openModalHandlerForm = () => {
    serIsOpenModalForm(true)
  }

  const closeModalHandler = () => {
    setIsOpenModal(false)
  }

  const openModalHandler = () => {
    setIsOpenModal(true)
  }

  // запрос на получение id для детальной информации
  const {
    data, isLoading,
  } = useQuery({
    queryKey: ['Detail'],
    queryFn: () => dogShopApi.getDetailsProduct(productId, token),
  })

  console.log(data)
  // запрос на удаление товара
  const { mutateAsync } = useMutation({
    mutationFn: () => dogShopApi.deleteMyProduct(productId, token),
  })

  const removeHandler = async (values) => {
    await mutateAsync(values)
    navigate('/products')
  }

  function addProductFromFavoriteInBasket() {
    dispatch(basketAdd(data._id))
  }

  function addProductFromDetailInFavorite() {
    dispatch(favoriteAdd(data._id))
  }

  if (isLoading) {
    return <Loader />
  }

  const oneProduct = details.map(({ id }) => id).includes(data._id)
  const oneProductInFavorite = favorite.map(({ id }) => id).includes(data._id)
  const isMyProductTrueFalse = data.author._id
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
                <span>Количество на складе: </span>
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

                {userId === isMyProductTrueFalse ? (
                  <button type="button" onClick={openModalHandler}>
                    Удалить
                  </button>
                ) : (
                  ''
                )}

                {userId === isMyProductTrueFalse ? (
                  <button type="button" onClick={openModalHandlerForm}>
                    Редактировать
                  </button>
                ) : (
                  ''
                )}
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
          <ReviewsAddProduct />
          <div className={ProductDetailStyles.ProductDetailStylesReviewsContainer}>
            {data.reviews.length > 0 ? (data.reviews.map((e) => (
              <div className={ProductDetailStyles.ProductDetailOnReviewsCard}>
                <div className={ProductDetailStyles.created_at}>
                  <div>
                    <img src={data.author.avatar} alt="logo" className={ProductDetailStyles.avatarStyle} />
                    <p>
                      <span>Автор: </span>
                      {e.author}
                    </p>
                  </div>

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
            ))).reverse() : (
              <div className={ProductDetailStyles.ProductReviewsCardZeroContaier}>
                <div className={ProductDetailStyles.ProductReviewsCardZeroContant}>
                  <hr />
                  <h3>Отзывов нет, будьте первыми!</h3>
                  <hr />
                  <img src={logoTwo} alt="logo" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={isOpenModal} closeHandler={closeModalHandler} className={ProductDetailStyles.modalDeleteButton}>
        <button onClick={removeHandler}>Удалить</button>
      </Modal>
      <Modal isOpen={isOpenModalForm} closeHandler={closeModalHandlerForm}>
        <EdditAddProduct />
      </Modal>
    </div>
  )
}
