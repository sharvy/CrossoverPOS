class CalculatePayment {
  constructor(params) {
    this.items = params.items;
    this.discountPercentage = params.discountPercentage;
    this.taxPercentage = params.taxPercentage;
  }

  amount() {
    return this.items.reduce(function(a, b) {
      return { totalPrice: a.totalPrice + b.totalPrice };
    }, { totalPrice: 0 }).totalPrice;
  }

  discountAmount() {
    return (this.amount() * this.discountPercentage) / 100;
  }

  tax() {
    return (this.amount() - this.discountAmount()) * this.taxPercentage / 100;
  }

  totalAmount() {
    return this.amount() - this.discountAmount() + this.tax();
  }
}