import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }
  handleIngredientChange = (event) => {
    event.preventDefault();
    const oldIngredients = this.state.ingredients;
    const newIngredients = oldIngredients.push(event.target.name);
    this.setState({ ingredients: oldIngredients})
  }

  handleNameChange = (event) => {
    const inputKey = event.target.name;
    const inputValue = event.target.value;
    this.setState({[inputKey]: inputValue})
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.name !== '' && this.state.ingredients.length > 0) {
      const newOrder = {
        name: this.state.name,
        ingredients: this.state.ingredients
      }

      this.props.addOrder(newOrder);
    } else if (this.state.name === '' && this.state.ingredients.length > 0){
      return alert('Please enter a name for your order')
    } else if (this.state.name !== '' && this.state.ingredients.length === 0) {
      return alert('Please choose at least one ingredient for your order')
    } else {
      return alert('Please enter a name and one ingredient for your order')
    }
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
