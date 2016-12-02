class CalculatePayment {
  constructor(params) {
    this.items = params.items;
    this.discountPercentage = params.discountPercentage;
    this.taxPercentage = params.taxPercentage;
  }

  subTotal() {
    return this.items.reduce(function(a, b) {
      return { totalPrice: a.totalPrice + b.totalPrice };
    }, { totalPrice: 0 }).totalPrice;
  }

  discountAmount() {
    return (this.subTotal() * this.discountPercentage) / 100;
  }

  tax() {
    return (this.subTotal() - this.discountAmount()) * this.taxPercentage / 100;
  }

  total() {
    return this.subTotal() - this.discountAmount() + this.tax();
  }
}