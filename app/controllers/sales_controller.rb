class SalesController < ApplicationController
  before_action :set_sale, only: [:show, :edit, :update, :destroy]

  def index
    @sales = Sale.all || []
  end

  def show

  end

  def new
    @sale = Sale.new
    @items = Item.all
    @tax_percentage = StoreDetail.last.try(:tax_rate) || StoreDetail::DEFAULT_TAX_PERCENTAGE
  end

  def edit
  end

  def create
    @sale = Sale.new(sale_params)
    if @sale.save
      associate_cart_items_with_sale

      render json: @sale, status: :created
    else
      render json: @sale.errors, status: :unprocessable_entity
    end
  end

  def update
    respond_to do |format|
      if @sale.update(sale_params)
        format.html { redirect_to @sale, notice: 'Sale was successfully updated.' }
        format.json { render :show, status: :ok, location: @sale }
      else
        format.html { render :edit }
        format.json { render json: @sale.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @sale.destroy
    respond_to do |format|
      format.html { redirect_to sales_url, notice: 'Sale was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  def set_sale
    @sale = Sale.find(params[:id])
  end

  def sale_params
    params.require(:sale).permit(:amount, :discount, :tax, :total_amount, :customer_id)
  end

  def cart_items
    params['items']
  end

  def associate_cart_items_with_sale
    LineItemsAssigner.new(cart_items, @sale).assign
  end
end
