import React from 'react';
import OrderForm from "./OrderForm";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { getOrders, postOrder } from '../../apiCalls'
import '@testing-library/jest-dom';
jest.mock('../../apiCalls')

describe('OrderForm', () => {
  it('should display form on load', () => {
    render(
      <OrderForm />
    );

    const nameInput = screen.getByPlaceholderText('Name');
    const firstButton = screen.getByRole('button', {name: 'beans'});
    const lastButton = screen.getByRole('button', {name: 'sour cream'});
    const submit = screen.getByRole('button', {name: 'Submit Order'});

    expect(nameInput).toBeInTheDocument();
    expect(firstButton).toBeInTheDocument();
    expect(lastButton).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
  })
  it('should update state with user name', () => {
    render(
      <OrderForm />
    );

    const nameInput = screen.getByPlaceholderText('Name');

    fireEvent.change(nameInput, {target: {value: 'Taryn'}});

    expect(nameInput.value).toBe('Taryn');
  });
  it('should allow the user to select one or more ingredients and change state', () => {
    render(
      <OrderForm />
    );

    const button1 = screen.getByRole('button', {name: 'beans'});
    const button2 = screen.getByRole('button', {name: 'cilantro'});

    fireEvent.click(button1);
    fireEvent.click(button2);

    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
  });
  it('should call a function when submit button is clicked', async () => {

    const mockPost = jest.fn();

    render(
      <OrderForm
        addOrder={mockPost}
      />
    );

    const nameInput = screen.getByPlaceholderText('Name');

    fireEvent.change(nameInput, {target: {value: 'Taryn'}});

    const button1 = screen.getByRole('button', {name: 'beans'});
    const button2 = screen.getByRole('button', {name: 'cilantro'});

    fireEvent.click(button1);
    fireEvent.click(button2);

    const submit = screen.getByRole('button', {name: 'Submit Order'});
    fireEvent.click(submit);

    await waitFor(() => expect(mockPost).toBeCalledTimes(1));


  });
  it('should not allow a user to submit if there are no ingredients selected', async () => {
    const mockPost = jest.fn();

    render(
      <OrderForm addOrder={mockPost}/>
    );

    const nameInput = screen.getByPlaceholderText('Name');

    fireEvent.change(nameInput, {target: {value: 'Taryn'}});

    const submit = screen.getByRole('button', {name: 'Submit Order'});
    fireEvent.click(submit);

    const message = await waitFor(() => screen.getByText('Please choose at least one ingredient for your order'));

    expect(message).toBeInTheDocument();
  });
  it('should not allow a user to submit if there is no name input', async () => {
    const mockPost = jest.fn();

    render(
      <OrderForm addOrder={mockPost}/>
    );

    const button1 = screen.getByRole('button', {name: 'beans'});
    const button2 = screen.getByRole('button', {name: 'cilantro'});

    fireEvent.click(button1);
    fireEvent.click(button2);

    const submit = screen.getByRole('button', {name: 'Submit Order'});
    fireEvent.click(submit);

    const message = await waitFor(() => screen.getByText('Please enter a name for your order'))

    expect(message).toBeInTheDocument();
  });
  it('should not allow a user to submit if there are no ingredients selected or name inputted', () => {
    const mockPost = jest.fn();

    render(
      <OrderForm addOrder={mockPost}
      />
    )

    const submit = screen.getByRole('button', {name: 'Submit Order'});

    fireEvent.click(submit);

    const message = screen.getByText('Please enter a name and one ingredient for your order')

    expect(message).toBeInTheDocument();
  });
})
