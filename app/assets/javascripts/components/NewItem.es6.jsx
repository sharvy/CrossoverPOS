class NewItem extends React.Component {
  constructor(props) {
    super(props);
  }

  newItemObject() {
    return {
      sku: this.refs.sku.value,
      name: this.refs.name.value,
      description: this.refs.description.value,
      price: this.refs.price.value,
      making_cost: this.refs.makingCost.value,
      stock_count: this.refs.stockCount.value,
      item_category_id: this.refs.itemCategory.value
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    var item = this.newItemObject();
    var _this = this;

    $.ajax({
      type: 'POST',
      url: _this.props.itemsPath,
      data: {
        item: item
      },
      dataType: 'JSON'
    }).success(function(response) {
      console.log('New Item Added!');
      _this.resetAndCloseForm();
      _this.props.addNew(response);
    });
  }

  resetAndCloseForm() {
    this.refs.sku.value = '';
    this.refs.name.value = '';
    this.refs.description.value = '';
    this.refs.price.value = '';
    this.refs.makingCost.value = '';
    this.refs.stockCount.value = '';
    this.refs.itemCategory.value = '';

    $('#new-item').modal('toggle');
  }

  categoryOptions() {
    var options = this.props.itemCategories.map(function(category) {
      return (
        <option value={category.id} key={category.id}>{category.name}</option>
      );
    });
    return options;
  }

  render() {
    return (
    <form ref="form" onSubmit={this.handleSubmit.bind(this)}>
      <div className="modal fade" id="new-item" role="dialog" aria-labelledby="new-item">
        <div className="modal-dialog modal-md" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="new-item-label">Add New Item</h4>
            </div>
            <div className="modal-body new-item-modal">

              <div className="form-group">
                <span className="has-float-label">
                  <input type="text" ref="sku" placeholder="SKU (leave blank to auto generate)" className="form-control"/>
                  <label htmlFor="">SKU</label>
                </span>
              </div>

              <div className="form-group">
                <span className="has-float-label">
                  <input type="text" ref="name" placeholder="Name" className="form-control"/>
                  <label htmlFor="">Name</label>
                </span>
              </div>

              <div className="form-group">
                <span className="has-float-label">
                  <input type="text" ref="description" placeholder="Description" className="form-control"/>
                  <label htmlFor="">Description</label>
                </span>
              </div>

              <div className="form-group">
                <span className="has-float-label">
                  <input type="text" ref="price" placeholder="Price" className="form-control"/>
                  <label htmlFor="">Price</label>
                </span>
              </div>

              <div className="form-group">
                <span className="has-float-label">
                  <input type="text" ref="makingCost" placeholder="making cost" className="form-control"/>
                  <label htmlFor="">Making Cost</label>
                </span>
              </div>

              <div className="form-group">
                <span className="has-float-label">
                  <input type="number" ref="stockCount" placeholder="total in stocks" className="form-control"/>
                  <label htmlFor="">Inventory</label>
                </span>
              </div>

              <div className="form-group">
                <select ref="itemCategory" className="form-control">
                  <option value="">Select Category</option>
                  {this.categoryOptions()}
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
              <button type="submit" className="btn btn-success">Create</button>
            </div>
          </div>
        </div>
      </div>
    </form>
    );
  }
}