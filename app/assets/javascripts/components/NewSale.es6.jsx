class NewSale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      amount: 0.00,
      discountPercentage: 0,
      taxPercentage: props.taxPercentage,
      discount: 0.00,
      tax: 0.00,
      totalAmount: 0.00,
      timestamp: Date.now()
    };
    this.initialState = this.state;

    this.discountChanged = this.discountChanged.bind(this);
    this.addNew = this.addNew.bind(this);
    this.discountChanged = this.discountChanged.bind(this);
    this.createNewSale = this.createNewSale.bind(this);
  }

  addNew(id, quantity) {
    var item, cartItems;
    var _this = this;

    $.get('/items/' + id, function(data) {
      item = data;
      item.quantity = quantity;
      item.totalPrice = item.price * quantity;

      cartItems = React.addons.update(_this.state.cartItems, {
        $push: [item]
      });

      _this.setState({
        cartItems: cartItems
      });

      _this.updatePaymentDetails();
    });
  }

  updatePaymentDetails() {
    var calculatePayment = new CalculatePayment({
      items: this.state.cartItems,
      discountPercentage: this.state.discountPercentage,
      taxPercentage: this.state.taxPercentage
    });

    this.setState({
      amount: calculatePayment.amount(),
      discount: calculatePayment.discountAmount(),
      tax: calculatePayment.tax(),
      totalAmount: calculatePayment.totalAmount()
    });
  }

  tbody() {
    var cartItems = this.state.cartItems.map(function(item) {
      return (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td className="currency"><span className="badge badge-primary">{item.quantity}</span></td>
          <td className="currency">{formatCurrency(item.price)}</td>
          <td className="currency">{formatCurrency(item.totalPrice)}</td>
        </tr>
      );
    });
    return cartItems;
  }

  discountChanged(newDiscountPercentage) {
    this.setState({
      discountPercentage: newDiscountPercentage
    });

    this.updatePaymentDetails();
  }

  createNewSale({paymentMethod, paidAmount}) {
    var _this = this;
    var {amount, discount, tax, totalAmount} = _this.state;

    _this.setState({
      paymentMethod: paymentMethod,
      paidAmount: paidAmount
    });

    var sale = {
      amount: amount,
      discount: discount,
      tax: tax,
      total_amount: totalAmount
    };

    $.ajax({
      method: 'POST',
      url: '/sales',
      data: {
        items: _this.state.cartItems,
        sale: sale
      }
    }).done(function(msg) {
      console.log(msg);
      _this.resetState();
    });
  }

  resetState() {
    this.setState(this.initialState);
  }

  render() {
    var {amount, discount, discountPercentage, tax, taxPercentage, totalAmount} = this.state;

    return(
      <div className="row" key={this.state.timestamp}>
        <div className="col-md-12">
          <h4>New Sale</h4>
          <AddToCartForm addNewItemToCart={this.addNew} allItems={this.props.allItems}/>
        </div>
        <div className="col-md-6 new-sale">
          <Payment
            amount={amount}
            discount={discount}
            discountPercentage={discountPercentage}
            tax={tax}
            taxPercentage={taxPercentage}
            totalAmount={totalAmount}
            handleDiscountChange={this.discountChanged}
          />
          <button className="btn btn-primary pull-right checkout" data-toggle="modal" data-target="#checkout">Checkout</button>
          <Checkout totalAmount={totalAmount} handlePayment={this.createNewSale}/>
        </div>
        <div className="col-md-6 selected-items">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h5>Ordered Items</h5>
            </div>
            <table className="table table-hover table-condensed">
              <thead>
              <tr>
                <th>Name</th>
                <th className="currency">Quantity</th>
                <th className="currency">Unit Price</th>
                <th className="currency">Total Price</th>
              </tr>
              </thead>
              <tbody>
              {this.tbody()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}