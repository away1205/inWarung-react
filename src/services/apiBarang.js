const baseUrl = 'http://127.0.0.1:5000/api/products/';

// Function to get all products
export async function getAllProducts() {
  try {
    const response = await fetch(baseUrl);
    const products = await response.json();
    console.log(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Function to create a new product
export async function createProduct(product) {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const newProduct = await response.json();
    console.log('Product created:', newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
  }
}

// Function to update an existing product
export async function updateProduct(id, product) {
  try {
    const response = await fetch(`${baseUrl}${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const updatedProduct = await response.json();
    console.log('Product updated:', updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
  }
}

// Function to delete a product
export async function deleteProduct(id) {
  try {
    const response = await fetch(`${baseUrl}${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    console.log('Product deleted:', result);
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}
