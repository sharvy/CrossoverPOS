class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :sku
      t.string :name
      t.text :description
      t.decimal :price
      t.decimal :making_cost
      t.integer :stock_count
      t.integer :sold_count
      t.boolean :active, default: true
      t.references :item_category, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
