/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  basketDecrement, basketIncrement, basketIsCkeckedOne, basketRemove, getBasketSelector,
} from '../../../redux/slices/basketSlice'
import { Modal } from '../../Modal/Modal'
import basketCardStyle from './BasketCard.module.css'

export function BasketCard({
  pictures, discount, stock, price, name, id,
}) {
  const dispatch = useDispatch()
  const basketarrayProducts = useSelector(getBasketSelector)
  const product = basketarrayProducts.find((item) => item.id === id)
  const [isOpen, setIsOpenModal] = useState(false)

  function openModalHandler() {
    setIsOpenModal(true)
  }

  function closeModalHandler() {
    setIsOpenModal(false)
  }

  function basketRemoveProductOne() {
    dispatch(basketRemove(id))
  }

  function isCheckedCardOne(e) {
    dispatch(basketIsCkeckedOne({ isChecked: e.target.checked, id }))
  }

  function decrement() {
    if (product.count > 1) {
      dispatch(basketDecrement(id))
    }
  }

  function increment() {
    if (product.count < stock) {
      dispatch(basketIncrement(id))
    }
  }

  if (!product) {
    return null
  }

  return (
    <div className={basketCardStyle.basketCard}>
      <div>
        <img src={pictures} alt="фото товара" />
      </div>
      <div>
        <div className={basketCardStyle.checkboxAllCard}>
          <label className={basketCardStyle.label}>
            <input
              type="checkbox"
              className={basketCardStyle.checkbox}
              onChange={isCheckedCardOne}
              checked={product.isChecked}
            />
            <span className={basketCardStyle.fake} />
          </label>
        </div>
        <div className={basketCardStyle.basketLinkStyle}>
          <Link to={`./${id}`}>
            <h4>{name}</h4>
          </Link>
        </div>
        <div className={basketCardStyle.basketCardInfo}>
          <div>
            <p>
              <span>Количество на складе: </span>
              {stock}
              <span> шт.</span>
            </p>
            <p>
              <span>Цена за один товар: </span>
              {price}
              <span> ₽</span>
            </p>
            <p>
              <span>Скидка: </span>
              {discount}
              %
            </p>
          </div>
          <div className={basketCardStyle.buttonIncrDecrBox}>
            <div className={basketCardStyle.buttonDecrement}>
              <button onClick={decrement} disabled={product.count === 1}>
                <i className="fa-solid fa-square-minus" />
              </button>
            </div>
            <h3>{product.count}</h3>
            <div className={basketCardStyle.ButtonIncrement}>
              <button onClick={increment} disabled={product.count === stock}>
                <i className="fa-solid fa-square-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className={basketCardStyle.buttonDeleteCard}>
          <button className={basketCardStyle.buttonDeleteCard} onClick={openModalHandler}><i className="fa-solid fa-trash-can" /></button>
        </div>
      </div>
      <Modal isOpen={isOpen} closeHandler={closeModalHandler}>
        <button type="button" onClick={basketRemoveProductOne}>Удалить</button>
      </Modal>
    </div>
  )
}
