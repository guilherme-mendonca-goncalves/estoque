class productControl {
  constructor() {
    this.id = 0;
    this.nameProduct = "";
    this.purchaseQuantity = 0;
    this.unit = "";
    this.purchasePrice = 0;
    this.shippingCost = 0;
  }

  add() {
    alert('Produto adicionado com sucesso!');
  }

  clean() {
    alert('Lista limpada com sucesso!');
  }
}

var product = new productControl();
