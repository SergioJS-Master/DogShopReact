/* eslint-disable max-len */
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import productPageStyles from './ProductsPage.module.css'
import { ProductOne } from '../Products/ProductsOne'
import { dogShopApi } from '../../../api/DogShopApi'
import { withQuery } from '../../HOCs/withQuery'
import { getSearchSelector } from '../../../redux/slices/filterSlice'
import { getTokenSelector } from '../../../redux/slices/userSlice'

function ShowAllProductsDetail({ data }) {
  const [sortProducts, setSortProducts] = useState(data.products)
  const [sortParams, setSortParams] = useSearchParams()

  const productSort = (value) => {
    const newSortValue = value
    setSortProducts(newSortValue)
    setSortParams({
      ...Object.fromEntries(sortParams.entries()),
      value: newSortValue,
    })

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

  useEffect(() => {
    setSortProducts(data.products)
  }, [data.products])

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

      <div>
        <button type="button" onClick={() => productSort('filterPriceUp')}>
          По уменьшению
        </button>
        <button type="button" onClick={() => productSort('filterPriceDown')}>
          По увеличению
        </button>

        <button type="button" onClick={() => productSort('filterDiscountUp')}>
          Скидка по уменьшению
        </button>
        <button type="button" onClick={() => productSort('filterDiscountDown')}>
          Скидка по увеличению
        </button>

        <button type="button" onClick={() => productSort('filterCreated_atUp')}>
          Дата по уменьшению
        </button>
        <button type="button" onClick={() => productSort('filterCreated_atDown')}>
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

  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [token])

  const {
    data, error, isLoading, refetch,
  } = useQuery({
    queryKey: ['productsfetch', search],
    queryFn: () => dogShopApi.getShowAllProducts(search, token),
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
