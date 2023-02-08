import { useDispatch, useSelector } from 'react-redux'
import { getBasketSelector } from '../../redux/slices/basketSlice'

export function BasketCard({
  pictures, discount, stock, price, description, name, id,
}) {
  const dispatch = useDispatch()
  const arrayProducts = useSelector(getBasketSelector)
  const product = arrayProducts.find((item) => item.id === id)
  console.log(dispatch, product)
  return (
    <div>
      <p>qwertyuioasdfghjkl</p>
      <p>{pictures}</p>
      <p>{discount}</p>
      <p>{stock}</p>
      <p>{price}</p>
      <p>{description}</p>
      <p>{name}</p>
      <p>{id}</p>
    </div>
  )
}
