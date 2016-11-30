json.extract! item_category, :id, :name, :description, :created_at, :updated_at
json.url item_category_url(item_category, format: :json)