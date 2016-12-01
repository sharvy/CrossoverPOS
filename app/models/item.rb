class Item < ActiveRecord::Base
  belongs_to :item_category
  has_many :line_items
  has_many :sales, through: :line_items

  before_save :set_sku

  def set_sku
    self.sku = generate_sku(6) if sku.empty?
  end

  private
  def generate_sku(size = 6)
    charset = %w(2 3 4 6 7 9 A C D E F G H J K M N P Q R T V W X Y Z)

    loop do
      sku = (0...size).map{ charset.to_a[rand(charset.size)] }.join
      break sku unless Item.exists?(sku: sku)
    end
  end
end