/* eslint-disable no-underscore-dangle */
import { useEffect, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import productPageStyles from './ProductsPage.module.css'
import { DogsShopContext } from '../../../Contexts/Contexts'
import { ProductOne } from '../Products/ProductsOne'
import { dogShopApi } from '../../../api/DogShopApi'
import { withQuery } from '../../HOCs/withQuery'
import { getSearchSelector } from '../../../redux/slices/filterSlice'

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
  const token = useContext(DogsShopContext)
  const navigate = useNavigate()
  const search = useSelector(getSearchSelector)

  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [token])

  const {
    data, error, isLoading, refetch,
  } = useQuery({
    queryKey: ['productsList', search],
    queryFn: () => dogShopApi.getShowAllProducts(search),
    enabled: token !== undefined,
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
