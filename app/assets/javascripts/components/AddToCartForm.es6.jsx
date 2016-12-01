class AddToCartForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var allItems = this.props.allItems.map(function(item) {
      return (
        <option value={item.id}>{item.name}</option>
      );
    });

    return (
      <form action="" className="form-inline">
        <div className="form-group">
          <select name="item" ref="name" className="form-control">
            {allItems}
          </select>
        </div>
      </form>
    );
  }
}