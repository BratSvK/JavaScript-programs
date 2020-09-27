class Product {
//   title = "DEFAULT";
//   imageUrl;
//   description;
//   price;

  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  renderItem() {
    const prodEl = document.createElement("li");
    prodEl.className = "product-item";
    prodEl.innerHTML = `
                  <div>
                    <img src="${this.product.imageUrl}" alt="${this.product.title}">
                    <div class="product-item__content">
                        <h2>${this.product.title}</h2>
                        <h3>${this.product.price}</h3>
                        <p>${this.product.description}</p>
                        <button>Add to Cart</button>
                    </div>
                  </div>
                  `;

    return prodEl;
  }
}

class ProductList {
  products = [
    new Product(
      "A pillow",
      "https://media.istockphoto.com/photos/pillow-isolated-on-white-background-picture-id899226398?k=6&m=899226398&s=612x612&w=0&h=JtsWJqDPEQGmJnqWCkgUcHGHhCmjId1OkELo-uVeY-o=",
      19.99,
      "A soft pillow!"
    ),
    new Product(
      "A Carpet",
      "https://karabagh.lu/wp-content/uploads/2016/05/carpets-8.jpg",
      89.99,
      "A carpet which you might like - or not."
    ),
  ];

  constructor() {}

  render() {
    const renderHook = document.getElementById("app");
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    // render a single product
    for (const product of this.products) {
      const productItem = new ProductItem(product);
      const prodEl = productItem.renderItem();
      prodList.append(prodEl);
    }
    renderHook.append(prodList);
  }
}

const productList = new ProductList();
productList.render();
