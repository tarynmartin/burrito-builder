import React from 'react';
import Orders from "./Orders";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
jest.mock('../../apiCalls.js');
import { deleteOrder } from '../../apiCalls'

describe('Orders', () => {
  it('should remove an order when delete button is pressed', async () => {
    const allOrders = [
      {id: 1,
      name: 'Taryn',
      ingredients: ['beans', 'sour cream']
      }
    ]

    const mockDelete = jest.fn();

    render(
      <Orders
        orders={allOrders}
        deleteOrder={mockDelete}
      />
    )

    const orderName = await waitFor(() =>screen.getByText('Taryn'));
    const ingredient1 = screen.getByRole('listitem', {name: 'beans'});
    const ingredient2 = screen.getByRole('listitem', {name: 'sour cream'});

    expect(orderName).toBeInTheDocument();
    expect(ingredient1).toBeInTheDocument();
    expect(ingredient2).toBeInTheDocument();

    const button = screen.getByRole('button', {name: 'Delete'});

    fireEvent.click(button);

    await waitFor(() => expect(mockDelete).toBeCalledTimes(1))
  })
})
