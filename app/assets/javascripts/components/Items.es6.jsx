class Items extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: props.items
    };
  }

  render() {
    var items = this.state.items.map(function(item) {
      return (
        <div className="item col-sm-6 col-md-3" key={item.id}>
          <div className="thumbnail">
            <div className="caption text-center">
              <h3>{item.name}</h3>
              <p>${item.price}</p>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>{items}</div>
    );
  }
}