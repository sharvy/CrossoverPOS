class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items
    };
    this.addNew = this.addNew.bind(this);
  }

  addNew(item) {
    var newItemsArray = React.addons.update(this.state.items, {
      $push: [item]
    });

    this.setState({
      items: newItemsArray
    });
  }

  render() {
    var items = this.state.items.map(function(item) {
      return (
        <Item item={item} key={item.id} />
      );
    });

    return (
      <div className="row items">
        <div>
          {items}
        </div>
        <div className="col-sm-12">
          <a className="btn btn-primary pull-right" href="#" data-toggle="modal" data-target="#new-item">+ Add New Item</a>
        </div>
        <NewItem itemCategories={this.props.itemCategories} itemsPath={this.props.itemsPath} addNew={this.addNew}/>
      </div>
    );
  }
}