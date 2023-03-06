/* eslint-disable max-len */
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { dogShopApi } from '../../../api/DogShopApi'
import {
  basketCheckboxRemove,
  basketIsCheckedAllCards, getBasketSelector,
} from '../../../redux/slices/basketSlice'
import { BasketCard } from '../BasketCard/BasketCard'
import { Loader } from '../../Loader/Loader'
import basketPorductCardStyles from './Basket.module.css'
import logoTwo from '../../Img/logoTwo.png'
import { getTokenSelector } from '../../../redux/slices/userSlice'
import { Modal } from '../../Modal/Modal'

export function BasketTitle() {
  const token = useSelector(getTokenSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isOpenModal, setIsOpenModal] = useState(false)

  function openModalHandler() {
    setIsOpenModal(true)
  }

  function closeModalHandlre() {
    setIsOpenModal(false)
  }

  const basket = useSelector(getBasketSelector)
  const ids = basket.map((item) => item.id)

  const changeInputAllCar = basket.every((item) => item.isChecked)
  const checkedOne = basket.some((item) => item.isChecked)

  function basketButtonDeleteProductCheckbox() {
    dispatch(basketCheckboxRemove())
  }

  function changeInputAll(e) {
    dispatch(basketIsCheckedAllCards(e.target.checked))
  }

  function chooseAll() {
    dispatch(basketIsCheckedAllCards(true))
  }
  // function isCheckedCardAll() {
  //   dispatch(basketIsCheckedAllCard(true))
  // }

  // function getProductsById(arrayIdProducts) {
  //   return Promise.all(
  //     arrayIdProducts.map((id) => fetch(`https://api.react-learning.ru/products/${id}`, {
  //       headers: {
  //         'content-type': 'application/json',
  //         authorization: token,
  //       },
  //     }).then((response) => response.json())),
  //   )
  // }

  // const { data, isLoading } = useQuery({
  //   enabled: token !== '',
  //   queryKey: ['basket', basket],
  //   queryFn: () => getProductsById(arrayIdProducts),
  // })
  // console.log('>>>>>', data)

  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [token])

  if (!ids) {
    return null
  }

  const {
    data, isLoading, error, refetch,
  } = useQuery({
    queryKey: ['basket', basket],
    queryFn: () => dogShopApi.getProductsByIds(ids, token),
  })

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

  if (isLoading) {
    return (
      <Loader />
    )
  }

  for (let i = 0; i < data.length; i++) {
    data[i].count = basket[i].count
    data[i].isChecked = basket[i].isChecked
  }

  const goodsQuantity = data.filter((e) => e.isChecked === true).reduce((sum, e) => sum + e.count, 0)
  const totalDiscount = data.filter((e) => e.isChecked === true).reduce((sum, e) => sum + ((e.price * e.discount) / 100) * e.count, 0)
  const totalPrice = data.filter((e) => e.isChecked === true).reduce((sum, e) => sum + (e.price - (e.price * e.discount) / 100) * e.count, 0)

  return (
    <div>

      {basket.length === 0 && (
        <div className={basketPorductCardStyles.basketEmptyBlok}>
          <div className={basketPorductCardStyles.basketEmpty}>
            <div>
              <img src={logoTwo} alt="лого" />
              <h3>В корзине пусто</h3>
              <div>
                <NavLink to="/products">
                  <button className="table-empty__button">Перейти в каталог</button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}

      {basket.length > 0 && (
        <div className={basketPorductCardStyles.test}>
          <div className={basketPorductCardStyles.namePageBasket}>
            <h1>• Корзина •</h1>
          </div>
          <div className={basketPorductCardStyles.basketBlock}>
            <div className={basketPorductCardStyles.basketCheckboxLine}>
              <div className={basketPorductCardStyles.checkboxAllCard}>
                <label className={basketPorductCardStyles.label}>
                  <input
                    type="checkbox"
                    className={basketPorductCardStyles.checkbox}
                    onChange={changeInputAll}
                    checked={changeInputAllCar}
                    onClick={chooseAll}
                  />
                  <span className={basketPorductCardStyles.fake} />
                  <span className={basketPorductCardStyles.text}> - Выбрать все товары</span>
                </label>
              </div>
              <div className={basketPorductCardStyles.buttonDeleteCheckboxHeder}>
                <span>Удалить все товары: </span>
                <button
                  onClick={openModalHandler}
                  className={basketPorductCardStyles.deleteButton}
                >
                  <i className="fa-solid fa-trash-can" />

                </button>
              </div>
            </div>
            <div className={basketPorductCardStyles.basketBackgroudLine}>
              <div className={basketPorductCardStyles.groupCardProductPrice}>
                <div>
                  {data.map((item) => (
                    <BasketCard
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

                {!checkedOne && (
                  <div className={basketPorductCardStyles.priceBlock}>
                    <h4>Для оформления заказа, необходимо отметить товар в корзине</h4>
                    <button onClick={chooseAll}>
                      Выбрать все товары
                    </button>
                  </div>
                )}

                {checkedOne && (
                  <div className={basketPorductCardStyles.priceBlock}>
                    <h3>Итог: скидка/цена</h3>
                    <hr />
                    <p>
                      <span>Кол-во товаров: </span>
                      {goodsQuantity}
                      <span> шт.</span>
                    </p>
                    <hr />
                    <p>
                      <span>Общая скидка: </span>
                      <span className={basketPorductCardStyles.totalDiscount}>
                        {totalDiscount}
                      </span>
                      <span> ₽</span>
                    </p>
                    <hr />
                    <p>
                      <span>
                        Общая цена с учетом скидки:
                        {' '}
                        <span className={basketPorductCardStyles.totalPrice}>
                          {totalPrice}
                        </span>
                      </span>
                      <span> ₽</span>
                    </p>
                    <hr />
                    <button onClick={chooseAll}>
                      Оформить заказ
                    </button>
                  </div>
                )}

                {!token && (
                  <p>Необходимо авторизоваться</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal isOpen={isOpenModal} closeHandler={closeModalHandlre}>
        <div className={basketPorductCardStyles.buttonCloseDeleteX}>
          <button
            type="button"
            onClick={closeModalHandlre}
            className={basketPorductCardStyles.x}
          >
            X
          </button>
          <p>Вы действительно хотите удалить выбранные товары?</p>
          <button
            onClick={basketButtonDeleteProductCheckbox}
            className={basketPorductCardStyles.xModalDelete}
          >
            Удалить

          </button>
        </div>
      </Modal>
    </div>
  )
}
// '_______________________________________________________________'
// export function ProductsPage() {
//   const { token } = useContext(DogsShopContext)
//   const navigate = useNavigate()
//   const search = useSelector(getSearchSelector)

//   useEffect(() => {
//     if (!token) {
//       navigate('/signin')
//     }
//   }, [token])

//   const { data, error, isLoading } = useQuery({
//     queryKey: ['productsList', search],
//     queryFn: () => dogShopApi.getShowAllProducts(search),
//     enabled: token !== undefined,
//   })

//   if (error) {
//     return (
//       <p>
//         Произошла ошибка:
//         {' '}
//         {error.message}
//       </p>
//     )
//   }

//   if (isLoading) {
//     return <Loader />
//   }

//   if (data === undefined) {
//     return <p>Empty content</p>
//   }

//   return (

//     <div className={productPageStyles.productsContainer}>
//       {data.products.map(({ _id: id, ...restProduct }) => (
//         <ProductOne {...restProduct} id={id} key={id} />
//       ))}
//     </div>
//   )
// }
