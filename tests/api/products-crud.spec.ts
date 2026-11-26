
import { test, expect } from '@playwright/test';
import { ProductService } from '../../services/ProductService';

test.describe('FakeStoreAPI - Product CRUD Tests', () => {

  let productService: ProductService;

  test.beforeEach(async ({ request }) => {
    productService = new ProductService(request);
  });

  const newProduct = {
    title: 'QA Automation Test Product',
    price: 49.99,
    description: 'Product created through Playwright API automation',
    image: 'https://i.pravatar.cc',
    category: 'electronics'
  };

  test('TC_API_003 - Create a product using POST', async () => {
    const response = await productService.createProduct(newProduct);

    expect(response.status()).toBe(201);

    const product = await response.json();

    expect(product.id).toBeTruthy();
    expect(product.title).toBe(newProduct.title);
    expect(product.price).toBe(newProduct.price);
    expect(product.category).toBe(newProduct.category);
  });

  test('TC_API_004 - Update a product using PUT', async () => {
    const updatedProduct = {
      title: 'Updated QA Automation Product',
      price: 79.99,
      description: 'Product updated through Playwright API automation',
      image: 'https://i.pravatar.cc',
      category: 'electronics'
    };

    const response = await productService.updateProduct(1, updatedProduct);

    expect(response.status()).toBe(200);

    const product = await response.json();

    expect(product.id).toBe(1);
    expect(product.title).toBe(updatedProduct.title);
    expect(product.price).toBe(updatedProduct.price);
  });

  test('TC_API_005 - Partially update a product using PATCH', async () => {
    const updatedData = {
      title: 'Partially Updated Product',
      price: 99.99
    };

    const response = await productService.partiallyUpdateProduct(1, updatedData);

    expect(response.status()).toBe(200);

    const product = await response.json();

    expect(product.id).toBe(1);
    expect(product.title).toBe(updatedData.title);
    expect(product.price).toBe(updatedData.price);
  });

  test('TC_API_006 - Delete a product using DELETE', async () => {
    const response = await productService.deleteProduct(1);

    expect(response.status()).toBe(200);

    const deletedProduct = await response.json();

    expect(deletedProduct.id).toBe(1);

    console.log('Delete response:', deletedProduct);
  });

});
