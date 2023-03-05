/* eslint-disable jsx-a11y/control-has-associated-label */
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { basketAdd, getBasketSelector } from '../../../redux/slices/basketSlice'
import { favoriteRemove } from '../../../redux/slices/favoriteSlice'
import favoriteCardStyle from './FavoriteCard.module.css'

export function FavoriteCard({
  pictures, discount, price, name, id,
}) {
  const { productId } = useParams()
  console.log(productId)
  const dispatch = useDispatch()

  const favorite = useSelector(getBasketSelector)
  const oneProduct = favorite.some((item) => item.id === id)

  function faforiteRemoveCard() {
    dispatch(favoriteRemove(id))
  }

  function favoriteAddCardInBusket() {
    dispatch(basketAdd(id))
  }

  return (
    <div className={favoriteCardStyle.favoriteCardStyleBlock}>
      <div>
        <img src={pictures} alt="logo" />
      </div>
      <div className={favoriteCardStyle.favoriteCardStyleContent}>
        <Link to={`./${id}`}>
          <h3>{name}</h3>
        </Link>
        <p>
          <span>Скидка: </span>
          {discount}
          {' '}
          <span> %</span>
        </p>
        <p>
          <span>Цена: </span>
          {price}
          <span> ₽</span>
        </p>
        <div className={favoriteCardStyle.favoriteCardButton}>
          <div>
            <button
              type="button"
              onClick={faforiteRemoveCard}
            >
              <i className="fa-regular fa-heart" />
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={favoriteAddCardInBusket}
              disabled={oneProduct}
            >
              В корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
