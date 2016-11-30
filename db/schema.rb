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

  create_table "customers", force: :cascade do |t|
    t.string   "first_name", limit: 255
    t.string   "last_name",  limit: 255
    t.string   "email",      limit: 255
    t.string   "phone",      limit: 255
    t.text     "address",    limit: 65535
    t.string   "city",       limit: 255
    t.string   "state",      limit: 255
    t.string   "country",    limit: 255
    t.string   "zip",        limit: 255
    t.boolean  "active",                   default: true
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
  end

  create_table "item_categories", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.text     "description", limit: 65535
    t.boolean  "active",                    default: true
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
  end

  create_table "items", force: :cascade do |t|
    t.string   "sku",              limit: 255
    t.string   "name",             limit: 255
    t.text     "description",      limit: 65535
    t.decimal  "price",                          precision: 10
    t.decimal  "making_cost",                    precision: 10
    t.integer  "stock_count",      limit: 4
    t.integer  "sold_count",       limit: 4
    t.boolean  "active",                                        default: true
    t.integer  "item_category_id", limit: 4
    t.datetime "created_at",                                                   null: false
    t.datetime "updated_at",                                                   null: false
  end

  add_index "items", ["item_category_id"], name: "index_items_on_item_category_id", using: :btree

  create_table "line_items", force: :cascade do |t|
    t.integer  "item_id",     limit: 4
    t.integer  "sale_id",     limit: 4
    t.integer  "quantity",    limit: 4
    t.decimal  "unit_price",            precision: 10
    t.decimal  "total_price",           precision: 10
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
  end

  add_index "line_items", ["item_id"], name: "index_line_items_on_item_id", using: :btree
  add_index "line_items", ["sale_id"], name: "index_line_items_on_sale_id", using: :btree

  create_table "payments", force: :cascade do |t|
    t.integer  "sale_id",      limit: 4
    t.integer  "payment_type", limit: 4
    t.decimal  "amount",                 precision: 10
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
  end

  add_index "payments", ["sale_id"], name: "index_payments_on_sale_id", using: :btree

  create_table "roles", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "sales", force: :cascade do |t|
    t.decimal  "billed_amount",                          precision: 10
    t.decimal  "discount",                               precision: 10
    t.decimal  "billed_amount_after_discount",           precision: 10
    t.decimal  "paid_amount",                            precision: 10
    t.decimal  "tax",                                    precision: 10
    t.integer  "customer_id",                  limit: 4
    t.integer  "user_id",                      limit: 4
    t.datetime "created_at",                                            null: false
    t.datetime "updated_at",                                            null: false
  end

  add_index "sales", ["customer_id"], name: "index_sales_on_customer_id", using: :btree
  add_index "sales", ["user_id"], name: "index_sales_on_user_id", using: :btree

  create_table "store_details", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.text     "description", limit: 65535
    t.decimal  "tax_rate",                  precision: 10
    t.string   "email",       limit: 255
    t.string   "phone",       limit: 255
    t.string   "website",     limit: 255
    t.text     "address",     limit: 65535
    t.string   "city",        limit: 255
    t.string   "state",       limit: 255
    t.string   "zip",         limit: 255
    t.string   "country",     limit: 255
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.integer  "role_id",                limit: 4
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
