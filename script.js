class productControl {
  constructor() {
    this.id = 0;
    this.nameProduct = "";
    this.purchaseQuantity = 0;
    this.unitOfMeasurement = "";
    this.purchasePrice = 0;
    this.shippingCost = 0;
    this.stockQuantity = 0;
  }

  add() {
    alert('Produto adicionado com sucesso!');
  }

  edit() {

  }

  clean() {
    alert('Lista limpada com sucesso!');
  }
}

var products = new productControl();
