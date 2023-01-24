import productsStyles from './Products.module.css'

export function ProductOne({ product }) {
  const {
    pictures, discount, stock, price, description,
  } = product
  return (
    <div className={productsStyles.prodactContainerCard}>
      <div className={productsStyles.borderStyles}>
        <div className={productsStyles.styleForm}>
          <img src={pictures} alt="" />
          <p>{price}</p>
          <p>{description}</p>
          <p>{discount}</p>
          <p>{stock}</p>
          <button type="submit">В корзину</button>
          <button type="submit">Купить</button>
        </div>
      </div>
    </div>
  )
}
