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
    document.getElementById('buttonClean').innerText = 'Limpar';
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
    document.getElementById('buttonClean').innerText = 'Cancelar';
  }

  editStock(idEditStock) {
    if(confirm('Deseja realmente alterar a quantidade do produto do ID '+idEditStock)) {
    this.editId = idEditStock.id;
    const stockModify = prompt('Qual a quantidade em estoque do produto do ID '+idEditStock);
    /*Corrigir mensagens de alerta que não aparecem*/
    for(let i = 0; i < this.arrayProducts.length; i++) {
      if(this.arrayProducts[i].id == idEditStock) {
        this.arrayProducts[i].stockQuantity = stockModify;
      }
    }
    this.listTable();
    alert('Estoque alterado com sucesso!');
    }
  }

  addIcon (iconType, id) {
    let icon = document.createElement("i");
    icon.classList.add('fa');
    icon.classList.add(iconType);
    icon.setAttribute("onclick", "products.editStock("+id+")");
    return icon;
  }

  listTable() {
    //Converter número para R$
    const convertToReal = (value) => {
      const formattedValue = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

      return formattedValue;
    }

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
      columnPrice.innerText = convertToReal(this.arrayProducts[i].purchasePrice);
      columnFreight.innerText = convertToReal(this.arrayProducts[i].shippingCost);
      columnStock.innerText = this.arrayProducts[i].stockQuantity;
      columnCost.innerText = convertToReal(this.arrayProducts[i].unitCost);

      columnId.classList.add('centerText');
      columnQuantity.classList.add('centerText');
      columnUnit.classList.add('centerText');
      columnPrice.classList.add('centerText');
      columnFreight.classList.add('centerText');
      columnStock.classList.add('centerText');
      columnCost.classList.add('centerText');
      columnAction.classList.add('centerText');
      columnAction.classList.add('alignedActions');

      columnAction.append(
        products.addIcon('fa-plus-square-o',this.arrayProducts[i].id),
        products.addIcon('fa-pencil',this.arrayProducts[i].id),
        products.addIcon('fa-eraser',this.arrayProducts[i].id)
      );
    }
  }

  readData() {
    let product = {}
    product.id = this.id;
    product.nameProduct = document.getElementById('name').value;
    product.purchaseQuantity = parseFloat(document.getElementById('quantity').value);
    product.unitOfMeasurement = document.getElementById('unit').value;
    product.purchasePrice = parseFloat(document.getElementById('price').value);
    product.shippingCost = parseFloat(document.getElementById('freight').value);
    product.stockQuantity = 0;
    product.unitCost = (product.purchasePrice + product.shippingCost) / product.purchaseQuantity;
    return product;
  }

  remove(idRemove) {
    if(confirm('Deseja realmente deletar o produto do ID '+idRemove)) {
      let writeList = document.getElementById('tbodyContainer');
      for(let i = 0; i < this.arrayProducts.length; i++) {
        if(this.arrayProducts[i].id == idRemove) {
          this.arrayProducts.splice(i, 0);
          writeList.deleteRow(i);
          alert('Item removido com sucesso!');
        }
      }
    } else {
      alert('Item não removido!');
    }
  }

  save() {
    let product = this.readData();
    let valid = this.validation(product);
    if(valid == true) {
      if(this.editId == null) {
      this.write(product);
      } else {
        this.updateProduct(this.editId, product);
      }
    }
    this.listTable();
    if (valid) {
      this.clean();
    }
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
    if(isNaN(product.purchaseQuantity)){
      message += '- Informe a quantidade mínima de compra! \n';
    }
    if(product.unitOfMeasurement == ''){
      message += '- Informe a unidade do produto! \n';
    }
    if(isNaN(product.purchasePrice)) {
      message += '- Informe o preço do produto! \n';
    }
    if(isNaN(product.shippingCost)) {
      message += '- Informe o preço do frete! \n';
    }
    if(message != '') {
      alert(message);
      return false;
    }
    return true;
  }

  write(productWrite) {
    this.arrayProducts.push(productWrite);
    this.id++;
  }
}

var products = new productControl();
