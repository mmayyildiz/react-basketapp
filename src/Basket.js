import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import './Basket.css';
import BasketItem from './BasketItem';

const INITIAL_STATE = {
  total: 0,
  items: [
    { name: 'Mountain Dew', quantity: 0, itemTotal: 0, unitPrice: 1.2 },
    { name: 'Desperados', quantity: 0, itemTotal: 0, unitPrice: 2.7 },
    { name: 'Jack Daniels', quantity: 0, itemTotal: 0, unitPrice: 0.8 }
  ]
};

class Basket extends PureComponent {
  state = {
    ...INITIAL_STATE
  };

  changeQuantity = (name, quantity) => {
    let total = 0;
    this.setState({
      items: this.state.items.map(item => {
        let newItem = Object.assign({}, item);
        if (item.name === name) {
          newItem.quantity = quantity;
          newItem.itemTotal = +(quantity * item.unitPrice).toFixed(2);
        }
        total += newItem.itemTotal;
        return newItem;
      }),
      total: +total.toFixed(2)
    });
  };

  changeQuantityHandler = event => {
    this.changeQuantity(event.target.name, event.target.value);
  };

  clearItem = itemName => {
    this.changeQuantity(itemName, 0);
  };

  clearAll = () => {
    this.setState({
      ...INITIAL_STATE
    });
  };

  render() {
    return (
      <div className="container">
        <h2 className="cart-header">CART</h2>
        <div className="items">
          <div className="item-row">
            <span className="item-column item-header item-title">TITLE</span>
            <span className="item-column item-header item-price">PRICE</span>
            <span className="item-column item-header item-quantity">
              QUANTITY
            </span>
          </div>
          {this.state.items.map((item, key) => {
            return (
              <BasketItem
                key={key}
                {...item}
                onChange={this.changeQuantityHandler}
                onClear={this.clearItem}
              />
            );
          })}
        </div>
        <div className="cart-total">
          <span className="cart-total-title">TOTAL</span>
          <span className="cart-total-price">${this.state.total}</span>
        </div>
        <a className="clear-items" onClick={this.clearAll}>
          Clear All
        </a>
        <button className="btn btn-primary btn-purchase">PURCHASE</button>
      </div>
    );
  }
}

Basket.propTypes = {
  total: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.object)
};

export default Basket;
