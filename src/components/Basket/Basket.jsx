/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dogShopApi } from '../../api/DogShopApi'
import { DogsShopContext } from '../../Contexts/Contexts'
import { getBasketSelector } from '../../redux/slices/basketSlice'
import { BasketCard } from '../BasketCard/BasketCard'
import { Loader } from '../Loader/Loader'
import basketPorductCardStyles from './Basket.module.css'

export function Basket() {
  const token = useContext(DogsShopContext)
  const dispatch = useDispatch()
  const basket = useSelector(getBasketSelector)
  const arrayIdProducts = basket.map((item) => item.id)

  console.log(dispatch)

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

  const { data, isLoading, error } = useQuery({
    enabled: token !== '',
    queryKey: ['basket', basket],
    queryFn: () => dogShopApi.getProductsByIds(arrayIdProducts),
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

  if (data === undefined) {
    return <Loader />
  }

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <div>
      <h1>Корзина</h1>
      <div className={basketPorductCardStyles.basketBlock}>
        <div className={basketPorductCardStyles.basketCheckboxLine}>
          <div className={basketPorductCardStyles.checkboxAllCard}>
            <label className={basketPorductCardStyles.label}>
              <input type="checkbox" className={basketPorductCardStyles.checkbox} />
              <span className={basketPorductCardStyles.fake} />
              <span className={basketPorductCardStyles.text}> - Выбрать все товары</span>
            </label>
          </div>
          <div>
            <span>Удалить все товары: </span>
            <button className={basketPorductCardStyles.deleteButton}><i className="fa-solid fa-trash-can" /></button>
          </div>
        </div>
        <div className={basketPorductCardStyles.basketBackgroudLine}>
          <div className={basketPorductCardStyles.groupCardProductPrice}>
            <div>
              {data.map((item) => (
                <BasketCard
                  pictures={item.pictures}
                  index={item.index}
                  key={item.key}
                  id={item._id}
                  title={item.name}
                  price={item.price}
                  discount={item.discount}
                  stock={item.stock}
                />
              ))}
            </div>
            <div className={basketPorductCardStyles.priceBlock}>
              <h3>Цена</h3>
            </div>
          </div>
        </div>
      </div>
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
