'use client'

import { useEffect, useState } from 'react'
import style from './style.module.css'
import { toast } from '@/components/use-toast'
import { getSession } from 'next-auth/react'

interface NavbarProps {
  logo: string
}

export default function Navbar({ logo }: NavbarProps) {
  const [isAuth, setIsAuuth] = useState<boolean>(false)

  const requestDataSession = async () => {
    try {
      const sessionResponse = await getSession()
      setIsAuuth(!!sessionResponse?.user)
    } catch (e) {
      toast({
        title: `${e}`,
      })
    }
  }

  useEffect(() => {
    requestDataSession()
  })

  return (
    <nav className={style.navbar}>
      <div className={style.navbar_nav}>
        <a href="#">
          <img className={style.logo} src={logo} alt="" />
        </a>
        <ul className={style.nav_links}>
          <li className={style.nav_item}>
            <a href="#" className={style.nav_button}>
              Inicio
            </a>
          </li>
          <li className={style.nav_item}>
            <a href="#" className={style.nav_button}>
              Categorias
            </a>
          </li>
          <li className={style.nav_item}>
            <a href="#" className={style.nav_button}>
              Nossa Historia
            </a>
          </li>
          <li className={style.nav_item}>
            <a href="/admin" className={style.icon_button}>
              {isAuth ? 'Logado' : 'Sign-in'}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
