'use client'

import { toast } from '@/components/use-toast'
import { api } from '@/services/api'
import { productType } from '@/types/product'
import { useEffect, useState } from 'react'
import Card from '@/components/site componentes/cards/card'
import style from './style.module.css'
import Navbar from '@/components/site componentes/navbar/navbar'
import Footer from '@/components/site componentes/footer/footer'

export default function Home() {
  const [products, setProducts] = useState<productType[]>()

  const [cart, setCart] = useState<productType[]>()

  const addProductToCart = (product: productType) => {
    setCart([...(cart || []), product])
    console.log(cart)
  }

  const deleteProductFromCart = (product: productType) => {
    let removed = false
    setCart(
      cart?.filter((item) => {
        if (removed) return true
        if (item.id === product.id) {
          removed = true
          return false
        }
        return true
      }),
    )
    console.log(cart)
  }

  const total = () => {
    let total = 0
    cart?.forEach((product) => {
      total += parseFloat(product.price)
    })
    return total.toFixed(2).replaceAll('.', ',')
  }

  const requestData = async () => {
    try {
      const response: productType[] = await api.get('/products')
      setProducts(response)
    } catch (e) {
      toast({
        title: `${e}`,
      })
    }
  }

  const buy = async () => {
    if (!cart) return
    try {
      for (const product of cart) {
        await api.post('/decreaseAmount/' + product.id)
      }
      setCart([])
    } catch (e) {
      toast({
        title: `${e}`,
      })
    }
  }

  useEffect(() => {
    requestData()
  }, [])

  return (
    <>
      <div className={style.productspage}>
        <Navbar logo=""></Navbar>
        <div className={style.wrapper}>
          {products?.map((product: productType, index: number) => (
            <Card
              product={product}
              key={index}
              addProductToCart={addProductToCart}
            />
          ))}
        </div>
        <div className={style.cartTitle}>Carrinho: </div>
        <div className={style.wrapper}>
          {cart?.map((product: productType, index: number) => (
            <Card
              product={product}
              key={index}
              deleteProductFromCart={deleteProductFromCart}
            />
          ))}
        </div>
        <div className={style.cartTitle}>Total: R$ {total()}</div>
        <button
          className={`${style.card_button} ${style.card_button_clicked}`}
          onClick={buy}
        >
          Comprar
        </button>
        <Footer></Footer>
      </div>
    </>
  )
}
