/* eslint-disable no-undef */
class DogShopApi {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl
    this.token = ''
  }

  getAuthorizationHandler() {
    return `Bearer ${this.token}`
  }

  setToken(token) {
    this.token = token
  }

  checkToken() {
    if (!this.token) throw new Error('Вы не авторизованы в системе')
  }

  // Запрос на авторизацию
  async signin(values) {
    const res = await fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    if (res.status === 401) {
      throw new Error('Неверные логин или пароль')
    }

    if (res.status === 404) {
      throw new Error('Пользователь с указанным email не найден')
    }

    if (res.status >= 300) {
      throw new Error(`Ошибка, код ${res.status}`)
    }
    return res.json()
  }

  // Запрос на регистрацию
  async signUp(values) {
    const res = await fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    if (res.status === 400) {
      throw new Error('Некорректно заполнено одно из полей')
    }

    if (res.status === 409) {
      throw new Error('Пользователь с указанным email уже существует')
    }
    if (res.status >= 300) {
      throw new Error(`Ошибка, код ${res.status}`)
    }
    return res.json()
  }

  // Запрос на получение продуктов
  async getShowAllProducts(search, token) {
    const res = await fetch(`${this.baseUrl}/products/search?query=${search}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при входе в Личный кабинет. 
      Проверьте отправляемые данные. Status: ${res.status}`)
    }

    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при получении ответа от сервера. 
      Попробуйте сделать запрос позже. Status: ${res.status}`)
    }
    return res.json()
  }

  // Запрос на получение добавление продуктов в корзину
  async getProductsByIds(ids, token) {
    return Promise.all(
      ids.map((id) => fetch(`${this.baseUrl}/products/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())),
    )
  }

  // Запрос на получение id товара
  async getDetailsProduct(id, token) {
    const res = await fetch(`${this.baseUrl}/products/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    return res.json()
  }

  // получение информации о пользователю через токен
  async getUserInfo(token) {
    const res = await fetch(`${this.baseUrl}/v2/sm9/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    return res.json()
  }

  // добавление новых отзывов
  async addReviews(productId, token, values) {
    const res = await fetch(`${this.baseUrl}/products/review/${productId}`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    return res.json()
  }

  // добавление новых товаров
  async addNewProduct(token, values) {
    const res = await fetch(`${this.baseUrl}/products`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    return res.json()
  }

  // удаление добавленного товара
  async deleteMyProduct(productId, token) {
    const res = await fetch(`${this.baseUrl}/products/${productId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    })
    if (res.status === 404) {
      throw new Error(`Ошибка. Status: ${res.status}`)
    }
    return res.json()
  }

  // редактиррование добавленного товара
  async edditAddMyProduct(productId, token, values) {
    const res = await fetch(`${this.baseUrl}/products/${productId}`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    return res.json()
  }

  // получение отзывов конкрентного товара
  async getReviewsById(token, productId) {
    const res = await fetch(`${this.baseUrl}/products/review/${productId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    return res.json()
  }
}

export const dogShopApi = new DogShopApi({
  baseUrl: 'https://api.react-learning.ru',
})
