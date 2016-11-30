json.extract! item, :id, :sku, :name, :description, :price, :making_cost, :stock_count, :sold_count, :available, :item_category_id, :created_at, :updated_at
json.url item_url(item, format: :json)