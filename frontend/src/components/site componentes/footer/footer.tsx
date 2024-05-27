'use client'

import style from './style.module.css'

export default function Footer() {
  return (
    <div>
      <div className={style.footer_content}>
        <div className={style.contacts}>
          <h1>CamiBol</h1>
          <p>A mais nova loja de robos</p>
          <div className={style.social_media}>
            <a href="#" className={style.social_media} id="instagram">
              {/* aqui vai ser os iconis */}
            </a>
            <a href="#" className={style.social_media} id="facebook">
              {/* aqui vai ser os iconis */}
            </a>
            <a href="#" className={style.social_media} id="twitter">
              {/* aqui vai ser os iconis */}
            </a>
            <a href="#" className={style.social_media} id="linkedin">
              {/* aqui vai ser os iconis */}
            </a>
            <a href="#" className={style.social_media} id="whatsapp">
              {/* aqui vai ser os iconis */}
            </a>
          </div>
        </div>
        <ul className={style.list}>
          <li>
            <h3>Nossa empresa</h3>
          </li>
          <li>
            <a href="#" className={style.sobre_link}>
              Robotic
            </a>
          </li>
          <li>
            <a href="#" className={style.sobre_link}>
              Robot for you
            </a>
          </li>
        </ul>
        <ul className={style.list}>
          <li>
            <h3>Parcerias</h3>
          </li>
          <li>
            <a href="#" className={style.sobre_link}>
              Picpay
            </a>
          </li>
          <li>
            <a href="#" className={style.sobre_link}>
              Grupfy
            </a>
          </li>
          <li>
            <a href="#" className={style.sobre_link}>
              Ifood
            </a>
          </li>
        </ul>
      </div>
      <div className={style.copyright}>
        © 2024 Robotic. Todos os direitos reservados.
      </div>
    </div>
  )
}
