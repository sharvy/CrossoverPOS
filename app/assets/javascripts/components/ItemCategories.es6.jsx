class ItemCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemCategories: props.itemCategories
    };
    this.addNew = this.addNew.bind(this);
  }

  addNew(itemCategory) {
    var newItemCategoriesArray = React.addons.update(this.state.itemCategories, {
      $push: [itemCategory]
    });

    this.setState({
      itemCategories: newItemCategoriesArray
    });
  }

  render() {
    var itemCategories = this.state.itemCategories.map(function(itemCategory) {
      return (
        <ItemCategory itemCategory={itemCategory} key={itemCategory.id} />
      );
    });

    return (
      <div className="row itemCategories">
        <div>
          {itemCategories}
        </div>
        <div className="col-sm-12">
          <a className="btn btn-primary pull-right" href="#" data-toggle="modal" data-target="#new-item-category">+ Add New Item Category</a>
        </div>
        <NewItemCategory itemCategories={this.props.itemCategories} itemCategoriesPath={this.props.itemCategoriesPath} addNew={this.addNew}/>
      </div>
    );
  }
}