class productControl {
  constructor() {
    this.id = 1;
    this.arrayProducts = [];
    this.editId = null;
  }

  clean() {
    document.getElementById('name').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('unit').value = '';
    document.getElementById('price').value = '';
    document.getElementById('freight').value = '';
    document.getElementById('buttonSave').innerText = 'Salvar';
    this.editId = null;
  }

  editProduct(productData) {
    this.editId = productData.id;
    document.getElementById('name').value = productData.nameProduct;
    document.getElementById('quantity').value = productData.purchaseQuantity;
    document.getElementById('unit').value = productData.unitOfMeasurement;
    document.getElementById('price').value = productData.purchasePrice;
    document.getElementById('freight').value = productData.shippingCost;
    document.getElementById('buttonSave').innerText = 'Atualizar';
  }

  editStock() {

  }

  listTable() {
    let writeList = document.getElementById('tbodyContainer');
    writeList.innerText = '';
    for(let i = 0; i < this.arrayProducts.length; i++) {
      let lineInsert= writeList.insertRow();

      let columnId = lineInsert.insertCell();
      let columnName = lineInsert.insertCell();
      let columnQuantity = lineInsert.insertCell();
      let columnUnit = lineInsert.insertCell();
      let columnPrice = lineInsert.insertCell();
      let columnFreight = lineInsert.insertCell();
      let columnStock = lineInsert.insertCell();
      let columnCost = lineInsert.insertCell();
      let columnAction = lineInsert.insertCell();

      columnId.innerText = this.arrayProducts[i].id;
      columnName.innerText = this.arrayProducts[i].nameProduct;
      columnQuantity.innerText = this.arrayProducts[i].purchaseQuantity;
      columnUnit.innerText = this.arrayProducts[i].unitOfMeasurement;
      columnPrice.innerText = this.arrayProducts[i].purchasePrice;
      columnFreight.innerText = this.arrayProducts[i].shippingCost;
      columnStock.innerText = this.arrayProducts[i].stockQuantity;
      columnCost.innerText = this.arrayProducts[i].unitCost;

      columnId.classList.add('centerText');
      columnQuantity.classList.add('centerText');
      columnUnit.classList.add('centerText');
      columnPrice.classList.add('centerText');
      columnFreight.classList.add('centerText');
      columnStock.classList.add('centerText');
      columnCost.classList.add('centerText');
      columnAction.classList.add('centerText');

      /*Inserir -> <i class="fa fa-plus-square-o"> <i class="fa fa-pencil"> < class="fa fa-eraser">
      const imageStock;
      const imageEdit;
      imageEdit.setAtribute("onclick","product.editProduct("+JSON.stringify(this.arrayProducts[i])+")");
      const imageDelet;
      imageStock.setAtribute("onclick","product.remove("+this.arrayProducts[i].id+")");


      columnAction.appendChild('imageStock');
      columnAction.appendChild('imageEdit');
      columnAction.appendChild('imageDelet');*/
    }
  }

  readData() {
    let product = {}
    product.id = this.id;
    product.nameProduct = document.getElementById('name').value;
    product.purchaseQuantity = document.getElementById('quantity').value;
    product.unitOfMeasurement = document.getElementById('unit').value;
    product.purchasePrice = document.getElementById('price').value;
    product.shippingCost = document.getElementById('freight').value;
    product.stockQuantity = 0;
    product.unitCost = ((document.getElementById('price').value + document.getElementById('freight').value) / document.getElementById('quantity').value);
    return product;
  }

  remove(idRemove) {
    if(confirm('Deseja realmente deletar o produto do ID '+idRemove)) {
      let writeList = document.getElementById('tbodyContainer');
      for(let i = 0; i < this.arrayProducts.length; i++) {
        if(this.arrayProducts[i].id == idRemove) {
          this.arrayProducts.splice(i, 1);
          writeList.deleteRow(i);
        }
      }
    }
    alert('Item removido com sucesso!');
  }

  save() {
    let product = this.readData();
    if(this.validation(product) == true) {
      if(this.editId == null) {
      this.write(product);
      } else {
        this.updateProduct(this.editId, product);
      }
    }
    this.listTable();
    this.clean();
  }

  updateProduct(idUpdate, productUpdate) {
    for(let i = 0; i < this.arrayProducts.length; i++) {
      if(this.arrayProducts[i].id == idUpdate) {
        this.arrayProducts[i].nameProduct = productUpdate.nameProduct;
        this.arrayProducts[i].purchaseQuantity = productUpdate.purchaseQuantity;
        this.arrayProducts[i].unitOfMeasurement = productUpdate.unitOfMeasurement;
        this.arrayProducts[i].purchasePrice = productUpdate.purchasePrice;
        this.arrayProducts[i].shippingCost = productUpdate.shippingCost;
      }
    }
  }

  validation(product) {
    let message = '';
    if(product.nameProduct == ''){
      message += '- Informe o nome do produto! \n';
    }
    if(product.purchaseQuantity == ''){
      message += '- Informe a quantidade mínima de compra! \n';
    }
    if(product.unitOfMeasurement == ''){
      message += '- Informe a unidade do produto! \n';
    }
    if(product.purchasePrice == ''){
      message += '- Informe o preço do produto! \n';
    }
    if(product.shippingCost == ''){
      message += '- Informe o preço do frete! \n';
    }
    if(message != '') {
      alert(message);
      return false;
    }
    return true;
  }

  write(productWrite) {
    productWrite.purchasePrice = Math.ceil(productWrite.purchasePrice);
    productWrite.shippingCost = Math.ceil(productWrite.shippingCost);
    productWrite.unitCost = Math.ceil(productWrite.unitCost);
    this.arrayProducts.push(productWrite);
    this.id++;
  }

}

var products = new productControl();
