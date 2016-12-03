class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changeAmount: 0.00
    };
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
    var total = this.props.total;
    var changeAmount = paidAmount - total;

    this.setState({
      changeAmount: changeAmount
    });
  }

  render() {
    return (
      <div className="modal fade" id="checkout" tabindex="-1" role="dialog" aria-labelledby="checkout">
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
                <input type="text" readonly value={this.props.total} className="form-control"/>
                <br/>
                <input type="text" ref="paidAmount" onChange={this.handlePaidAmountChange} className="form-control" placeholder="Paid Amount"/>
                <br/>
                <hr/>
                <div className="col-md-6"><h3>Change</h3></div>
                <div className="col-md-6"><h3>{this.state.changeAmount}</h3></div>
                <br/>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-success">Pay</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}