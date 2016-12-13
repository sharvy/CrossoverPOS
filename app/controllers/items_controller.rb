class ItemsController < ApplicationController
  before_action :set_item, only: [:update, :destroy]

  def index
    @items = Item.all
    @item_categories = ItemCategory.all
  end

  def create
    @item = Item.new(item_params)

    if @item.save
      render json: @item
    else
      render json: @item.errors, status: :unprocessable_entity
    end
  end

  def update
    if @item.update(item_params)
      render json: @item
    else
      render json: @item.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @item.destroy
    head :no_content
  end

  private
    def set_item
      @item = Item.find(params[:id])
    end

    def item_params
      params.require(:item).permit(:sku, :name, :description, :price, :making_cost, :stock_count, :active, :item_category_id)
    end
end