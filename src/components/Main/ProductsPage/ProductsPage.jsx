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
    <div className={productPageStyles.productsContainer}>
      {data.products.map(({ _id: id, ...restProduct }) => (
        <ProductOne {...restProduct} id={id} key={id} />
      ))}
    </div>
  )
}

const ShowAllProductsDetailWithQuery = withQuery(ShowAllProductsDetail)

export function ProductsPage() {
  const navigate = useNavigate()
  const token = useSelector(getTokenSelector)
  const search = useSelector(getSearchSelector)

  console.log({ token })

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
