import React from 'react';
import './Orders.css';

const Orders = props => {
  const orderEls = props.orders.map(order => {
    return (
      <div className="order">
        <button className='remove' onClick={(event) => props.deleteOrder(order)}>Delete</button>
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map(ingredient => {
            return (
              <li aria-label={ingredient}>{ingredient}</li>
            )
          })}
        </ul>
      </div>
    )
  });

  return (
    <section>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;

// could give data-testid if aria doesn't work
