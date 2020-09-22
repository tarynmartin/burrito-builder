import React from 'react';
import App from "./App";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
jest.mock('../../apiCalls.js');
import { getOrders, postOrder, deleteOrder } from '../../apiCalls'

describe('App', () => {
  it('should show page and active orders on load', async () => {

    getOrders.mockResolvedValue({
      orders: [
        {id: 1,
        name: 'Taryn',
        ingredients: ['beans', 'sour cream']
        }
      ]
    })

    render(
      <App />
    )

    const orderName = await waitFor(() =>screen.getByText('Taryn'));
    const ingredient1 = screen.getByRole('listitem', {name: 'beans'});
    const ingredient2 = screen.getByRole('listitem', {name: 'sour cream'});

    expect(orderName).toBeInTheDocument();
    expect(ingredient1).toBeInTheDocument();
    expect(ingredient2).toBeInTheDocument();

  });
  it('should update orders when a new order is added', async () => {
    getOrders.mockResolvedValue({
      orders: [
        {id: 1,
        name: 'Taryn',
        ingredients: ['beans', 'sour cream']
        }
      ]
    })

    postOrder.mockResolvedValue({
      id: 2,
      name: 'Karen',
      ingredients: ['beans', 'cilantro']
    })

    render(
      <App />
    )

    const nameInput = screen.getByPlaceholderText('Name');

    fireEvent.change(nameInput, {target: {value: 'Karen'}});

    const button1 = screen.getByRole('button', {name: 'beans'});
    const button2 = screen.getByRole('button', {name: 'cilantro'});

    fireEvent.click(button1);
    fireEvent.click(button2);

    const submit = screen.getByRole('button', {name: 'Submit Order'});
    fireEvent.click(submit);

    const newOrder = await waitFor(() => screen.getByText('Karen'));
    const oldOrder = screen.getByText('Taryn')

    await waitFor(() => {
      expect(newOrder).toBeInTheDocument();
      expect(oldOrder).toBeInTheDocument();
    })
  })
  it('should update display on delete', async () => {
    getOrders.mockResolvedValue({
      orders: [
        {id: 1,
        name: 'Taryn',
        ingredients: ['beans', 'sour cream']
        }
      ]
    })

    deleteOrder.mockResolvedValue('Success');

    render(
      <App />
    )

    const orderName = await waitFor(() =>screen.getByText('Taryn'));
    const ingredient1 = screen.getByRole('listitem', {name: 'beans'});
    const ingredient2 = screen.getByRole('listitem', {name: 'sour cream'});
    const button = screen.getByRole('button', {name: 'Delete'})

    expect(orderName).toBeInTheDocument();
    expect(ingredient1).toBeInTheDocument();
    expect(ingredient2).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    const message = await waitFor(() => screen.getByText('Deleted!'))

    expect(message).toBeInTheDocument()
  })
})
