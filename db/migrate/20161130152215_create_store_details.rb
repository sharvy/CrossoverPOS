class CreateStoreDetails < ActiveRecord::Migration
  def change
    create_table :store_details do |t|
      t.string :name
      t.text :description
      t.decimal :tax_rate
      t.string :email
      t.string :phone
      t.string :website
      t.text :address
      t.string :city
      t.string :state
      t.string :zip
      t.string :country

      t.timestamps null: false
    end
  end
end
