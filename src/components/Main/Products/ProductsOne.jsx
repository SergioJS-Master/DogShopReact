/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-undef */
// import { useDispatch, useSelector } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import productsStyles from './Products.module.css'
import { basketAdd, getBasketSelector } from '../../../redux/slices/basketSlice'

export function ProductOne({
  pictures, discount, stock, price, description, name, id,
}) {
  const dispatch = useDispatch()
  const arrayProducts = useSelector(getBasketSelector)
  const oneProduct = arrayProducts.some((item) => item.id === id)
  // const disableButtonBuy = arrayProducts.some((item) => item.id === id)
  console.log(oneProduct)

  function AddProductsBasket() {
    dispatch(basketAdd(id))
  }
  return (
    <div className="card">
      <div className={productsStyles.prodactContainerCard}>
        <div className={productsStyles.styleCard}>
          <h4 className={productsStyles.headingStyles}>{name}</h4>
          <div className={productsStyles.productImg}>
            <img src={pictures} alt="" />
          </div>
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
              className="card-wpapper__button"
              onClick={AddProductsBasket}
              disabled={oneProduct}
            >
              {oneProduct ? 'В корзине' : 'Купить'}
            </button>
            <button type="submit"><i className="fa-regular fa-heart" /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
