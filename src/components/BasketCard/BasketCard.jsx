/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import { useDispatch, useSelector } from 'react-redux'
import { basketRemove, getBasketSelector } from '../../redux/slices/basketSlice'
import basketCardStyle from './BasketCard.module.css'

export function BasketCard({
  pictures, discount, stock, price, name, id,
}) {
  const dispatch = useDispatch()
  const useselector = useSelector(getBasketSelector)
  // const product = arrayProducts.find((item) => item.id === id)
  console.log(useselector)

  function basketRemoveProductOne() {
    dispatch(basketRemove(id))
  }

  return (
    <div className={basketCardStyle.basketCard}>
      <div>
        <img src={pictures} alt="фото товара" />
      </div>
      <div>
        <div className={basketCardStyle.checkboxAllCard}>
          <label className={basketCardStyle.label}>
            <input type="checkbox" className={basketCardStyle.checkbox} />
            <span className={basketCardStyle.fake} />
          </label>
        </div>
        <p>{name}</p>
        <p>
          <span>Количество:</span>
          {stock}
        </p>
        <p>
          <span>Цена за один товар:</span>
          {price}
        </p>
        <p>
          <span>Скидка: </span>
          {discount}
          %
        </p>
        <button onClick={basketRemoveProductOne}><i className="fa-solid fa-trash-can" /></button>
      </div>
    </div>
  )
}
