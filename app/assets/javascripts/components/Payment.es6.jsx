class Payment extends React.Component {
  constructor(props) {
    super(props)
  }

  discountOptions() {
    var options = [...Array(100).keys()].map(function(i) {
      return (
        <option value={i} key={i}>{i}%</option>
      );
    });
    return options;
  }

  changeDiscount() {
    var discountPercentage = parseInt(this.refs.discountPercentage.value);
    if(discountPercentage > 0) {
      this.props.handleDiscountChange(discountPercentage);
    }
  }

  render() {
    var {subTotal, discount, tax, taxPercentage, total} = this.props;

    return (
      <div className="panel panel-primary payment-details">
        <div className="panel-heading">
          <h5>Payment</h5>
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-md-6"><h3>Subtotal</h3></div>
            <div className="col-md-6 currency"><h3>{formatCurrency(subTotal)}</h3></div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h3>
                Discount
                <div className="form-group select-discount">
                  <select ref="discountPercentage" onChange={this.changeDiscount.bind(this)} className="form-control">
                    {this.discountOptions()}
                  </select>
                </div>
              </h3>
            </div>
            <div className="col-md-6 currency"><h3>{formatCurrency(discount)}</h3></div>
          </div>
          <div className="row">
            <div className="col-md-6"><h3>Tax({taxPercentage}%)</h3>
            </div>
            <div className="col-md-6 currency"><h3>{formatCurrency(tax)}</h3></div>
          </div>
          <div className="row">
            <div className="col-md-6"><h2>Total</h2></div>
            <div className="col-md-6 currency"><h2>{formatCurrency(total)}</h2></div>
          </div>
        </div>
      </div>
    );
  }
}