import React from 'react'
import CartCount from './Cart/CartCount'
import CartEmpty from './Cart/CartEmpty'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems, selectCartState, setCloseCart } from '../app/CartSlice'
import CartItems from './Cart/CartItems'

const Cart = () => {

  const ifCartState = useSelector(selectCartState)
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)

  //console.log(selectCartItems);

  const onCartToggle = () => {
    dispatch(setCloseCart({
      cartState: false
    }))
  }

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 blur-effect-theme w-full h-screen z-[250] transition-opacity  ${ifCartState ? 'transform translate-x-0 opacity-100' : 'transform translate-x-full opacity-0'
          }`}
      >
        <div className={`blur-effect-theme h-screen max-w-xl w-full absolute right-0`}>
          <CartCount onCartToggle={onCartToggle} />

          {cartItems.length === 0 ? <CartEmpty /> : <CartItems cartItems={cartItems} />}
        </div>

      </div>
    </>
  )
}

export default Cart