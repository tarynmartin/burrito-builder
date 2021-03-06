export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
      .then(response => response.json())
}

export const postOrder = (newOrder) => {
  return fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newOrder)
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('error')
    }
  })
}

export const deleteOrder = (id) => {
  return fetch(`http://localhost:3001/api/v1/orders/${id}`, {
    method: 'DELETE',
    headers: {
    'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if(response.ok) {
        return ('Success')
      } else {
        throw new Error('Did not remove order')
      }
    })
}
