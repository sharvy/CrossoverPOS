json.extract! customer, :id, :first_name, :last_name, :email, :phone, :address, :city, :state, :country, :zip, :active, :created_at, :updated_at
json.url customer_url(customer, format: :json)