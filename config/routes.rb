Rails.application.routes.draw do
  resources :sales
  resources :customers
  resources :items
  resources :item_categories
  devise_for :users
  get 'home/index'

  root 'sales#index'
end
