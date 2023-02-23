/* eslint-disable react/jsx-no-undef */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-undef */
// import { useDispatch, useSelector } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import productsStyles from './Products.module.css'
import { basketAdd, getBasketSelector } from '../../../redux/slices/basketSlice'
import { favoriteAdd, getFavoriteSelector } from '../../../redux/slices/favoriteSlice'

export function ProductOne({
  pictures, discount, stock, price, description, name, id,
}) {
  const dispatch = useDispatch()
  const arrayProducts = useSelector(getBasketSelector)
  const arrayProductsFavorite = useSelector(getFavoriteSelector)
  const oneProduct = arrayProducts.some((item) => item.id === id)
  const oneProductFavorite = arrayProductsFavorite.some((item) => item.id === id)

  function addProductsBasket() {
    dispatch(basketAdd(id))
  }

  function addProductsFavorite() {
    dispatch(favoriteAdd(id))
  }
  return (
    <div className={productsStyles.prodactContainerCard}>
      <div className={productsStyles.styleCard}>
        <Link to={`./${id}`}>
          <h4 className={productsStyles.headingStyles}>{name}</h4>
          <hr />
          <div className={productsStyles.productImg}>
            <img src={pictures} alt="" />
          </div>
          <hr />
        </Link>
        <p>
          <span>Цена: </span>
          {price}
          {' '}
          <span> ₽</span>
        </p>
        <p>
          <span>Скидка: </span>
          {discount}
          <span> %</span>
        </p>
        <p>
          <span>Количество: </span>
          {stock}
          <span> шт.</span>
        </p>
        <p className={productsStyles.descriptionCardPorduct}>
          <span>Описание: </span>
          {description}
        </p>
        <div className={productsStyles.styleButtonCardProduct}>
          <button
            onClick={addProductsBasket}
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
            onClick={addProductsFavorite}
            type="submit"
            disabled={oneProductFavorite}
          >
            {oneProductFavorite ? (<i className="fa-solid fa-heart-circle-check" />) : (<i className="fa-regular fa-heart" />)}

          </button>
        </div>
      </div>
    </div>
  )
}
