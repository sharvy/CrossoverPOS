class ItemCategoriesController < ApplicationController
  before_action :set_item_category, only: [:update, :destroy]

  def index
    @item_categories = ItemCategory.all
  end

  def create
    @item_category = ItemCategory.new(item_category_params)

    if @item_category.save
      render json: @item_category
    else
      render json: @item_category.errors, status: :unprocessable_entity
    end
  end

  def update
    if @item_category.update(item_category_params)
      render json: @item_category
    else
      render json: @item_category.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @item_category.destroy
    head :no_content
  end

  private
    def set_item_category
      @item_category = ItemCategory.find(params[:id])
    end

    def item_category_params
      params.require(:item_category).permit(:name, :description)
    end
end