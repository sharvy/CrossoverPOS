class CreatePayments < ActiveRecord::Migration
  def change
    create_table :payments do |t|
      t.references :sale, index: true, foreign_key: true
      t.integer :payment_type
      t.decimal :amount

      t.timestamps null: false
    end
  end
end
