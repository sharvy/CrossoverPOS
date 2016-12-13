class NewItemCategory extends React.Component {
  constructor(props) {
    super(props);
  }

  newItemCategoryObject() {
    return {
      name: this.refs.name.value,
      description: this.refs.description.value
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    var itemCategory = this.newItemCategoryObject();
    var _this = this;

    $.ajax({
      type: 'POST',
      url: _this.props.itemCategoriesPath,
      data: {
        item_category: itemCategory
      },
      dataType: 'JSON'
    }).success(function(response) {
      console.log('New Item Category Added!');
      _this.resetAndCloseForm();
      _this.props.addNew(response);
    });
  }

  resetAndCloseForm() {
    this.refs.name.value = '';
    this.refs.description.value = '';

    $('#new-item-category').modal('toggle');
  }

  render() {
    return (
    <form ref="form" onSubmit={this.handleSubmit.bind(this)}>
      <div className="modal fade" id="new-item-category" role="dialog" aria-labelledby="new-item-category">
        <div className="modal-dialog modal-md" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="new-item-category-label">Add New Item Category</h4>
            </div>
            <div className="modal-body new-item-category-modal">

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