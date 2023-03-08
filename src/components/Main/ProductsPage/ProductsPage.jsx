/* eslint-disable max-len */
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import productPageStyles from './ProductsPage.module.css'
import { ProductOne } from '../Products/ProductsOne'
import { dogShopApi } from '../../../api/DogShopApi'
import { withQuery } from '../../HOCs/withQuery'
import { getSearchSelector } from '../../../redux/slices/filterSlice'
import { getTokenSelector } from '../../../redux/slices/userSlice'
import { Filters } from '../../Filters/Filters'
import logoTwo from '../../Img/logoTwo.png'

function ShowAllProductsDetail({ data }) {
  let products = [...data]
  const [searchParams] = useSearchParams()
  const currentFilterName = searchParams.get('filterName')

  switch (currentFilterName) {
    case null:
      products = [...data]
      break
    case 'Новинки':
      products = products.sort((item, nextItem) => {
        const itemTime = new Date(Date.parse(item.updated_at))
        const nextItemTime = new Date(Date.parse(nextItem.updated_at))
        if (itemTime > nextItemTime) {
          return -1
        }
        if (itemTime < nextItemTime) {
          return 1
        }
        return 0
      })
      break
    case 'Скидки':
      products = products.filter((item) => item.discount > 0).sort((item, nextItem) => {
        if (item.discount > nextItem.discount) {
          return -1
        }
        if (item.discount < nextItem.discount) {
          return 1
        }
        return 0
      })
      break
    case 'Дороже':
      products = products.sort((item, nextItem) => {
        if (item.price > nextItem.price) {
          return -1
        }
        if (item.price < nextItem.price) {
          return 1
        }
        return 0
      })
      break
    case 'Дешевле':
      products = products.sort((item, nextItem) => {
        if (item.price < nextItem.price) {
          return -1
        }
        if (item.price > nextItem.price) {
          return 1
        }
        return 0
      })
      break
    case 'Популярное':
      products = products.sort((item, nextItem) => {
        if (item.likes.length > nextItem.likes.length) {
          return -1
        }
        if (item.likes.length < nextItem.likes.length) {
          return 1
        }
        return 0
      })
      break

    default:
      break
  }

  return (
    <div className={productPageStyles.test}>
      <div className={productPageStyles.filterContainer}>
        <Filters />
      </div>
      {products.length === 0 && (
        <div className={productPageStyles.basketEmptyBlok}>
          <div className={productPageStyles.basketEmpty}>
            <div>
              <img src={logoTwo} alt="лого" />
              <h3>Такого товара не существует</h3>
            </div>
          </div>
        </div>
      )}

      {products.length > 0 && (
        <div className={productPageStyles.productsContainer}>
          {products.map(({ _id: id, ...restProduct }) => (
            <ProductOne {...restProduct} id={id} key={id} />
          ))}
        </div>
      )}

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
