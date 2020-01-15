import React, { Component } from 'react';
import './Basket.css';

class BasketItem extends Component {
  render() {
    const { name, quantity, itemTotal } = this.props;

    return (
      <div className="item-row">
        <span className="item-column item-title item-description">{name}</span>
        <span className="item-column item-price"> ${itemTotal}</span>
        <div className="item-column item-quantity">
          <input
            className="item-quantity-input"
            name={name}
            value={quantity}
            onChange={event => {
              parseInt(event.target.value) &&
                -1 < event.target.value &&
                event.target.value < 100 &&
                this.props.onChange(event);
            }}
            type="number"
          />
          <button
            className="btn btn-delete"
            onClick={() => this.props.onClear(name)}
          >
            Remove
          </button>
        </div>
      </div>
    );
  }
}

export default BasketItem;
