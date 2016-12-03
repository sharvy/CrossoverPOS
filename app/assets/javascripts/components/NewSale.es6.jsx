class NewSale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      subTotal: 0.00,
      discountPercentage: 0,
      taxPercentage: props.taxPercentage,
      discount: 0.00,
      tax: 0.00,
      total: 0.00
    };
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
      subTotal: calculatePayment.subTotal(),
      discount: calculatePayment.discountAmount(),
      tax: calculatePayment.tax(),
      total: calculatePayment.total()
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

  render() {
    var {subTotal, discount, discountPercentage, tax, taxPercentage, total} = this.state;

    return(
      <div className="row">
        <div className="col-md-12">
          <h4>New Sale</h4>
          <AddToCartForm addNewItemToCart={this.addNew.bind(this)} allItems={this.props.allItems}/>
        </div>
        <div className="col-md-6 new-sale">
          <Payment
            subTotal={subTotal}
            discount={discount}
            discountPercentage={discountPercentage}
            tax={tax}
            taxPercentage={taxPercentage}
            total={total}
            handleDiscountChange={this.discountChanged.bind(this)}
          />
          <button className="btn btn-primary pull-right checkout" data-toggle="modal" data-target="#checkout">Checkout</button>
          <Checkout total={total}/>
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