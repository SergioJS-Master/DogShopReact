/* eslint-disable linebreak-style */
import logoTwo from '../Img/logoTwo.png'
import footerStyles from './Footer.module.css'

export function Footer() {
  return (
    <div className={footerStyles.footerContainer}>
      <img src={logoTwo} alt="logo" />
      <div className={footerStyles.footerGroup}>
        <h2>Бренды</h2>
        <p>PRO PLAN</p>
        <p>Monge</p>
        <p>Welldog</p>
        <p>ROYAL CANIN</p>
        <p>Abba</p>
      </div>
      <div className={footerStyles.footerGroup}>
        <h2>Контакты</h2>
        <p>
          Instagram
          {' '}
          <i className="fa-brands fa-instagram" />
        </p>
        <p>
          Whatsapp
          {' '}
          <i className="fa-brands fa-whatsapp" />
        </p>
        <p>
          Telegram
          {' '}
          <i className="fa-brands fa-telegram" />
        </p>
        <p>8-800-555-35-35</p>
      </div>
      <div className={footerStyles.footerGroup}>
        <h2>Адрес</h2>
        <p>г. Росто-на-Дону</p>
        <p>ул. Пушкина, д. 1</p>
        <p>Режим работы:</p>
        <p>09:00-21:00(МСК)</p>
      </div>
    </div>
  )
}

// {/* <footer>
//       <div className="footer-container">
//         Интернет-магазин "Dog food"
//         <div className="footer-container-label">
//           <img src={visa} alt="icon-visa" />
//           <img src={mastercard} alt="icon-mastercard" />
//           <img src={mir} alt="icon-mir" />
//         </div>
//       </div>
//       <div className="footer-container">
//         8(800)-974-00-00 <br></br>
//       <small>dog-food@gmail.com</small>
//         <div className="footer-container-label">
//           <img src={telegramm} alt="icon-telegramm" />
//           <img src={whatsapp} alt="icon-whatsapp" />
//           <img src={viber} alt="icon-viber" />
//           <img src={instagram} alt="icon-instagram" />
//           <img src={vk} alt="icon-vk" />
//         </div>
//       </div>

//       <div className="footer-container">
//         <br />
//         Контакты <br />
//         <address>
//           <br />
//           г.Люберцы
//           <br />
//           пр-кт Космонавтов д.148
//           <br />
//           Пн-Пт: 9:00-20:00 <br />
//           Сб-Вс: 10:00-18:00
//           <br />
//           <br />
//         </address>
//       </div>
//     </footer> */}
