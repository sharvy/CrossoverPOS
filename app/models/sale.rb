class Sale < ActiveRecord::Base
  belongs_to :customer
  belongs_to :user
  has_many :line_items
  has_many :items, through: :line_items
end
