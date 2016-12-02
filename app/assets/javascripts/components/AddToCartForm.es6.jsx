class AddToCartForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      quantity: ''
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    var itemId = this.refs.id.value;
    var itemQuantity = this.refs.quantity.value;

    if(itemId && itemQuantity) {
      this.props.addNewItemToCart(itemId, itemQuantity);
      this.refs.id.value = '';
      this.refs.quantity.value = '';
    }
  }

  render() {
    var allItems = this.props.allItems.map(function(item) {
      return (
        <option value={item.id} key={item.id}>{item.name}</option>
      );
    });

    return (
      <form action="" className="form-inline add-to-cart-form" onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <select name="item" ref="id" defaultValue="" className="form-control">
            <option value="" disabled>Select Item</option>
            {allItems}
          </select>
        </div>
        <div className="form-group">
          <input type="number" ref="quantity" className="form-control" placeholder="Quantity"/>
        </div>
        <button type="submit" className="btn btn-primary add-to-cart-btn">
          Add to cart
        </button>
      </form>
    );
  }
}