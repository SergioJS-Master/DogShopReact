/* eslint-disable no-param-reassign */
import { useState } from 'react'

/* eslint-disable jsx-a11y/label-has-associated-control */
export function PasswordOpenClose(type) {
  const [isOpen, setOpen] = useState(false)

  type = (isOpen ? 'text' : 'password')
  console.log(type)

  return (
    <div>
      <label>
        <input
          onClick={() => setOpen(!isOpen)}
          type="checkbox"
          className="password-checkbox"
        />
        {' '}
        Показать пароль
      </label>
    </div>
  )
}
