class ItemCategory extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var {name, description} = this.props.itemCategory;

    return (
      <div className="item-category col-sm-6 col-md-3">
        <div className="thumbnail item-category-thumbnail">
          <div className="caption text-center">
            <span className="item-category-name">{name}</span>
          </div>
        </div>
      </div>
    );
  }
}