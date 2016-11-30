class Item < ActiveRecord::Base
  belongs_to :item_category
  has_many :line_items
  has_many :sales, through: :line_items
end
