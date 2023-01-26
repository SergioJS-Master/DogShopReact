import productsStyles from './Products.module.css'

export function ProductOne({
  pictures, discount, stock, price, description,
}) {
  return (
    <div className={productsStyles.prodactContainerCard}>
      <div className={productsStyles.styleForm}>
        <div className={productsStyles.productImg}>
          <img src={pictures} alt="" />
        </div>
        <p>{price}</p>
        <p>{discount}</p>
        <p>{stock}</p>
        <p className={productsStyles.descriptionCardPorduct}>{description}</p>
        <div className={productsStyles.styleButtonCardProduct}>
          <button type="submit">В корзину</button>
          <button type="submit">Купить</button>
        </div>
      </div>
    </div>
  )
}
