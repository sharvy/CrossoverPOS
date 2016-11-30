json.extract! sale, :id, :billed_amount, :discount, :paid_amount, :tax, :customer_id, :created_at, :updated_at
json.url sale_url(sale, format: :json)