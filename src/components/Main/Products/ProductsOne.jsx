import productsStyles from './Products.module.css'

export function ProductOne({
  pictures, discount, stock, price, description,
}) {
  return (
    <div className={productsStyles.prodactContainerCard}>
      <div className={productsStyles.styleCard}>
        <div className={productsStyles.productImg}>
          <img src={pictures} alt="" />
        </div>
        <p>
          <span>Цена: </span>
          {price}
          {' '}
          <span>₽</span>
        </p>
        <p>
          <span>Скидка: </span>
          {discount}
        </p>
        <p>
          <span>Количество: </span>
          {stock}
        </p>
        <p className={productsStyles.descriptionCardPorduct}>
          <span>Описание: </span>
          {description}
        </p>
        <div className={productsStyles.styleButtonCardProduct}>
          <button type="submit">В корзину</button>
          <button type="submit">Купить</button>
        </div>
      </div>
    </div>
  )
}
