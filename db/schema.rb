# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161130152215) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "customers", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "phone"
    t.text     "address"
    t.string   "city"
    t.string   "state"
    t.string   "country"
    t.string   "zip"
    t.boolean  "active",     default: true
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "item_categories", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.boolean  "active",      default: true
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  create_table "items", force: :cascade do |t|
    t.string   "sku"
    t.string   "name"
    t.text     "description"
    t.decimal  "price"
    t.decimal  "making_cost"
    t.integer  "stock_count"
    t.integer  "sold_count"
    t.boolean  "active",           default: true
    t.integer  "item_category_id"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
  end

  add_index "items", ["item_category_id"], name: "index_items_on_item_category_id", using: :btree

  create_table "line_items", force: :cascade do |t|
    t.integer  "item_id"
    t.integer  "sale_id"
    t.integer  "quantity"
    t.decimal  "unit_price"
    t.decimal  "total_price"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "line_items", ["item_id"], name: "index_line_items_on_item_id", using: :btree
  add_index "line_items", ["sale_id"], name: "index_line_items_on_sale_id", using: :btree

  create_table "payments", force: :cascade do |t|
    t.integer  "sale_id"
    t.integer  "payment_type"
    t.decimal  "amount"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "payments", ["sale_id"], name: "index_payments_on_sale_id", using: :btree

  create_table "roles", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sales", force: :cascade do |t|
    t.decimal  "amount"
    t.decimal  "discount"
    t.decimal  "tax"
    t.decimal  "total_amount"
    t.text     "note"
    t.integer  "customer_id"
    t.integer  "user_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "sales", ["customer_id"], name: "index_sales_on_customer_id", using: :btree
  add_index "sales", ["user_id"], name: "index_sales_on_user_id", using: :btree

  create_table "store_details", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.decimal  "tax_rate"
    t.string   "email"
    t.string   "phone"
    t.string   "website"
    t.text     "address"
    t.string   "city"
    t.string   "state"
    t.string   "zip"
    t.string   "country"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.integer  "role_id"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "items", "item_categories"
  add_foreign_key "line_items", "items"
  add_foreign_key "line_items", "sales"
  add_foreign_key "payments", "sales"
  add_foreign_key "sales", "customers"
  add_foreign_key "sales", "users"
end
