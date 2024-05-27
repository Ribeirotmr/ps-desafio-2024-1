'use client'

import { productType } from '@/types/product'
import style from './style.module.css'
import { useState } from 'react'

interface ProductProps {
  product: productType
  addProductToCart?: (product: productType) => void
  deleteProductFromCart?: (product: productType) => void
}

export default function Cards({
  product,
  addProductToCart,
  deleteProductFromCart,
}: ProductProps) {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    if (product.amount <= 0) return
    setIsClicked(true)
    if (addProductToCart) {
      addProductToCart(product)
    } else if (deleteProductFromCart) {
      deleteProductFromCart(product)
    }
  }
  return (
    <div className={style.card}>
      <img src={product.image} alt="Imagem" className={style.card_img} />
      <div className={style.card_body}>
        <div>
          <h2 className={style.card_name}>{product.name}</h2>
          <p className={style.card_price}> Tipo: {product?.category?.name}</p>
          <p className={style.card_price}>
            Preço: R$ {parseFloat(product.price).toFixed(2).replaceAll('.', ',')}
          </p>
        </div>
        <div className={style.button}>
          <button
            className={`${style.card_button} ${isClicked ? style.card_button_clicked : ''}`}
            onClick={handleClick}
          >
            {product.amount > 0
              ? addProductToCart
                ? 'Adicionar no carrinho'
                : deleteProductFromCart
                  ? 'Remover do carrinho'
                  : ''
              : 'Indisponível'}
          </button>
        </div>
      </div>
    </div>
  )
}
