/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import productPageStyles from './ProductsPage.module.css'
import { ProductOne } from '../Products/ProductsOne'
import { dogShopApi } from '../../../api/DogShopApi'
import { withQuery } from '../../HOCs/withQuery'
import { getSearchSelector } from '../../../redux/slices/filterSlice'
import { getTokenSelector } from '../../../redux/slices/userSlice'

function ShowAllProductsDetail({ data }) {
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

      <div className={productPageStyles.productsContainer}>
        {data.products.map(({ _id: id, ...restProduct }) => (
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
  // const search = useSelector(getSearchSelector)

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
    // enabled: token !== undefined,
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
