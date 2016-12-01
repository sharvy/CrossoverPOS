class CreateSales < ActiveRecord::Migration
  def change
    create_table :sales do |t|
      t.decimal :billed_amount
      t.decimal :discount
      t.decimal :billed_amount_after_discount
      t.decimal :paid_amount
      t.decimal :tax
      t.text    :note
      t.references :customer, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
