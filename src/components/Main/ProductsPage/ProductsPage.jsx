/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import productPageStyles from './ProductsPage.module.css'
import { ProductOne } from '../Products/ProductsOne'
import { dogShopApi } from '../../../api/DogShopApi'
import { withQuery } from '../../HOCs/withQuery'
import { getSearchSelector } from '../../../redux/slices/filterSlice'
import { getTokenSelector } from '../../../redux/slices/userSlice'
// import { Filters } from './Filters/Filters'
// import { FILTER_QUERY_NAME, getFilteredProducts } from './Filters/constants'

function ShowAllProductsDetail({ data }) {
  console.log(data.products)
  const [sortProducts, setSortProducts] = useState(data.products)

  const test = (value) => {
    if (value === 'filterPriceUp') {
      const priceUp = [...data.products].sort((a, b) => a.price - b.price)
      setSortProducts(priceUp)
    }
    if (value === 'filterPriceDown') {
      const priceDown = [...data.products].sort((a, b) => b.price - a.price)
      setSortProducts(priceDown)
    }
    if (value === 'filterDiscountDown') {
      const discountDown = [...data.products].sort((a, b) => b.discount - a.discount)
      setSortProducts(discountDown)
    }
    if (value === 'filterDiscountUp') {
      const discountUp = [...data.products].sort((a, b) => a.discount - b.discount)
      setSortProducts(discountUp)
    }
    if (value === 'filterCreated_atDown') {
      const createdatDown = [...data.products].sort((a, b) => (b.created_at > a.created_at ? 1 : -1))
      setSortProducts(createdatDown)
    }
    if (value === 'filterCreated_atUp') {
      const createdatUp = [...data.products].sort((a, b) => (a.created_at > b.created_at ? 1 : -1))
      setSortProducts(createdatUp)
    }
  }

  // const test = (value) => {
  //   if (value === 'filterPriceUp') {
  //     const priceDown = [...data.products].sort((a, b) => b.price - a.price)
  //     setSortProducts(priceDown)
  //   }
  // const arrProducts = data.products

  // const filterPriceDown = arrProducts.sort((a, b) => b.price - a.price)
  // console.log(filterPriceDown)

  // function filterPriceUpFn() {
  //   const filterPriceUp = arrProducts.sort((a, b) => a.price - b.price)
  //   return filterPriceUp
  // }

  // function filterPriceDownFn() {
  //   const filterPriceDown = arrProducts.sort((a, b) => b.price - a.price)
  //   return filterPriceDown
  // }
  return (
    <div>
      {/* {!data.length === 0 && (
      <div className={productPageStyles.searchZeroErrorBlock}>
        <div className={productPageStyles.searchZeroError}>
          <p>
            По вашему запросу ничего не найдено
          </p>
        </div>
      </div>
      )} */}
      {/* <Filters /> */}
      <div>
        <button type="button" onClick={() => test('filterPriceUp')}>
          По уменьшению
        </button>
        <button type="button" onClick={() => test('filterPriceDown')}>
          По увеличению
        </button>

        <button type="button" onClick={() => test('filterDiscountUp')}>
          Скидка по уменьшению
        </button>
        <button type="button" onClick={() => test('filterDiscountDown')}>
          Скидка по увеличению
        </button>

        <button type="button" onClick={() => test('filterCreated_atUp')}>
          Дата по уменьшению
        </button>
        <button type="button" onClick={() => test('filterCreated_atDown')}>
          Дата по увеличению
        </button>
      </div>
      <div className={productPageStyles.productsContainer}>
        {sortProducts.map(({ _id: id, ...restProduct }) => (
          <ProductOne {...restProduct} id={id} key={id} />
        ))}
      </div>

    </div>
  )
}

const ShowAllProductsDetailWithQuery = withQuery(ShowAllProductsDetail)

export function ProductsPage() {
  const navigate = useNavigate()
  const search = useSelector(getSearchSelector)
  const token = useSelector(getTokenSelector)

  // const [searchParams] = useSearchParams()
  // const currentFilterNameFromQuery = searchParams.get(FILTER_QUERY_NAME)

  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [token])

  const {
    data, error, isLoading, refetch,
  } = useQuery({
    queryKey: ['productsfetch', search, token],
    queryFn: () => dogShopApi.getShowAllProducts(search, token),
    enabled: (token !== undefined) && (token !== ''),
  })

  return (
    <ShowAllProductsDetailWithQuery
      data={data}
      error={error}
      isLoading={isLoading}
      refetch={refetch}
    />
  )
}
