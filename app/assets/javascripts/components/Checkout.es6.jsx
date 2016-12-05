class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changeAmount: 0.00
    };
    this.initialState = this.state;

    this.handlePayment          = this.handlePayment.bind(this);
    this.handlePaidAmountChange = this.handlePaidAmountChange.bind(this);

  }

  paymentMethods() {
    var methods = ['Card', 'Cash'].map(function(method) {
      return(
        <option value={method} key={method}>{method}</option>
      );
    });
    return methods;
  }

  handlePaidAmountChange() {
    var paidAmount = this.refs.paidAmount.value;
    var totalAmount = this.props.totalAmount;
    var changeAmount = paidAmount - totalAmount;

    this.setState({
      changeAmount: changeAmount
    });
  }

  handlePayment() {
    var paymentMethod = this.refs.paymentMethod.value;
    var paidAmount    = this.refs.paidAmount.value;

    this.props.handlePayment({
      paymentMethod: paymentMethod,
      paidAmount: paidAmount
    });

    this.resetState();
  }

  resetState() {
    this.refs.paidAmount.value = '';
    this.setState(this.initialState);
  }

  render() {
    return (
      <div className="modal fade" id="checkout" role="dialog" aria-labelledby="checkout">
        <div className="modal-dialog modal-md" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="checkoutLabel">Checkout</h4>
            </div>
            <div className="modal-body checkout-modal">
              <div className="form-group">
                <select ref="paymentMethod" defaultValue="" className="form-control">
                  <option value="" disabled>Select payment method</option>
                  {this.paymentMethods()}
                </select>

                <br/>

                <div className="input-group">
                  <span className="input-group-addon">$</span>
                  <input type="text" readOnly value={this.props.totalAmount.toFixed(2)} className="form-control"/>
                </div>

                <br/>

                <div className="input-group">
                  <span className="input-group-addon">$</span>
                  <input type="text" ref="paidAmount" defaultValue="" onChange={this.handlePaidAmountChange} className="form-control" placeholder="Paid Amount"/>
                </div>

                <br/>
                <hr/>
                <div className="col-md-6"><h3>Change</h3></div>
                <div className="col-md-6"><h3>{this.state.changeAmount}</h3></div>
                <br/>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
              <button type="button"  className="btn btn-success" data-dismiss="modal" onClick={this.handlePayment}>Pay</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}