/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import productsStyles from './Products.module.css'
import { basketAdd, getBasketSelector } from '../../../redux/slices/basketSlice'
import { favoriteAdd, getFavoriteSelector } from '../../../redux/slices/favoriteSlice'
// import sale from '../../Img/sale.png'

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
          {/* <div>
            {discount > 0 && (
              <img className={productsStyles.discountImg} src={sale} alt="logo" />
            )}
          </div> */}
          <hr />
        </Link>
        <p>
          <span>Скидка: </span>
          {discount}
          <span> %</span>
        </p>
        <div className={productsStyles.priceCardProduct}>
          <span>Цена:  </span>
          {discount > 0 && (
            <h4 className={productsStyles.priceWithoutDiscount}>
              {' '}
              <span className={productsStyles.priceWithoutDiscountTap}>{discount > 0 && `${price} ₽`}</span>
              {' '}
            </h4>
          )}
          <h3>
            {discount > 0 && `${(price * (100 - discount)) / 100} ₽`}
            <span className={productsStyles.justPrice}>{discount === 0 && `${price} ₽`}</span>
          </h3>
        </div>
        <p>
          <span>В наличии: </span>
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
