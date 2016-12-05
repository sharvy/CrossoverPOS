class LineItemsAssigner
  attr_accessor :items, :sale

  def initialize(items, sale)
    @items = items
    @sale = sale
  end

  def assign
    @items.each do |index, item|
      @sale.line_items.create!(
          item_id: item['id'].to_i,
          quantity: item['quantity'].to_i,
          unit_price: item['price'].to_f,
          total_price: item['totalPrice'].to_f
      )
    end
  end
end