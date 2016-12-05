class CreateSales < ActiveRecord::Migration
  def change
    create_table :sales do |t|
      t.decimal :amount
      t.decimal :discount
      t.decimal :tax
      t.decimal :total_amount
      t.text    :note
      t.references :customer, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
