import React, { Component } from 'react';
import './App.css';
import { getOrders, postOrder, deleteOrder } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: [],
      message: ''
    }
  }

  componentDidMount() {
    getOrders()
      .then(orders => {
        this.setState({orders: orders.orders})
      })
      .catch(err => console.error('Error fetching:', err));
  }

  addNewOrder = (newOrder) => {
    postOrder(newOrder)
      .then(order => {
        const oldOrders = this.state.orders;
        oldOrders.push(order);
        this.setState({orders: oldOrders})
      })
      .catch(error => {
        console.log('Error posting')
      })
  }

  removeOrder = (order) => {
    const id = order.id;
    const orders = this.state.orders;
    deleteOrder(id)
      .then((response) => {
        const newOrders = orders.filter(order => {
          if(order.id !== id) {
            return order;
          }
        })
        console.log(response);
        this.setState({orders: newOrders, message: 'Deleted!'});
      })
      .catch(error => console.log('Could not delete'))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={this.addNewOrder}/>
        </header>
        {this.state.message !== '' &&
          <>
            <p>{this.state.message}</p>
          </>
        }
        <Orders orders={this.state.orders} deleteOrder={this.removeOrder}/>
      </main>
    );
  }
}


export default App;
