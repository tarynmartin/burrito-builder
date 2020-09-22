import React, { Component } from 'react';
import './App.css';
import { getOrders, postOrder } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: [],
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

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={this.addNewOrder}/>
        </header>

        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
