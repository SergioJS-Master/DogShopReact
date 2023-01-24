import { useEffect, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
// import productPageStyles from './ProductsPage.module.css'
import { DogsShopContext } from '../../../Contexts/Contexts'
import { ProductOne } from '../Products/ProductsOne'
import { dogShopApi } from '../../../api/DogShopApi'

export function ProductsPage() {
  const { token } = useContext(DogsShopContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [token])

  const { data } = useQuery({
    queryKey: ['productsList'],
    queryFn: () => dogShopApi.getShowAllProducts(),
    enabled: token !== undefined,
  })
  return (

    <div>
      {data.products.map((product, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ProductOne product={product} key={index} />
      ))}
    </div>
  )
}
