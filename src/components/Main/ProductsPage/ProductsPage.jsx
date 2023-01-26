/* eslint-disable no-underscore-dangle */
import { useEffect, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import productPageStyles from './ProductsPage.module.css'
import { DogsShopContext } from '../../../Contexts/Contexts'
import { ProductOne } from '../Products/ProductsOne'
import { dogShopApi } from '../../../api/DogShopApi'
import { Loader } from '../../Loader/Loader'

export function ProductsPage() {
  const { token } = useContext(DogsShopContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [token])

  const { data, error, isLoading } = useQuery({
    queryKey: ['productsList'],
    queryFn: () => dogShopApi.getShowAllProducts(),
    enabled: token !== undefined,
  })

  if (error) {
    return (
      <p>
        Произошла ошибка:
        {' '}
        {error.message}
      </p>
    )
  }

  if (isLoading) {
    return <p><Loader /></p>
  }

  if (data === undefined) {
    return <p>Empty content</p>
  }

  return (

    <div className={productPageStyles.productsContainer}>
      {data.products.map(({ _id: id, ...restProduct }) => (
        <ProductOne {...restProduct} id={id} key={id} />
      ))}
    </div>
  )
}
