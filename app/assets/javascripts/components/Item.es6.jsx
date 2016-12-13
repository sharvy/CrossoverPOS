class Item extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var {name, price} = this.props.item;

    return (
      <div className="item col-sm-6 col-md-3">
        <div className="thumbnail item-thumbnail">
          <div className="caption text-center">
            <span className="item-name">{name}</span>
            <span className="item-price">${price}</span>
          </div>
        </div>
      </div>
    );
  }
}