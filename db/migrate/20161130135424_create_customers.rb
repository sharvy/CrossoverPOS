class CreateCustomers < ActiveRecord::Migration
  def change
    create_table :customers do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :phone
      t.text :address
      t.string :city
      t.string :state
      t.string :country
      t.string :zip
      t.boolean :active, default: true

      t.timestamps null: false
    end
  end
end
