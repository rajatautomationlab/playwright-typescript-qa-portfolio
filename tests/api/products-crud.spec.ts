import { test, expect } from '../../fixtures/test-fixtures';
import { newProduct, fullUpdate, partialUpdate } from '../../test-data/products';

test.describe('DummyJSON API - Product CRUD Tests', { tag: ['@api', '@regression'] }, () => {

  test('TC_API_003 - Create a product using POST', async ({ productService }) => {
    const response = await productService.createProduct(newProduct);

    expect(response.status()).toBe(201);

    const product = await response.json();

    expect(product.id).toBeTruthy();
    expect(product.title).toBe(newProduct.title);
    expect(product.price).toBe(newProduct.price);
    expect(product.category).toBe(newProduct.category);
  });

  test('TC_API_004 - Update a product using PUT', async ({ productService }) => {
    const response = await productService.updateProduct(1, fullUpdate);

    expect(response.status()).toBe(200);

    const product = await response.json();

    expect(product.id).toBe(1);
    expect(product.title).toBe(fullUpdate.title);
    expect(product.price).toBe(fullUpdate.price);
  });

  test('TC_API_005 - Partially update a product using PATCH', async ({ productService }) => {
    const response = await productService.partiallyUpdateProduct(1, partialUpdate);

    expect(response.status()).toBe(200);

    const product = await response.json();

    expect(product.id).toBe(1);
    expect(product.title).toBe(partialUpdate.title);
    expect(product.price).toBe(partialUpdate.price);
  });

  test('TC_API_006 - Delete a product using DELETE', async ({ productService }) => {
    const response = await productService.deleteProduct(1);

    expect(response.status()).toBe(200);

    const deletedProduct = await response.json();

    expect(deletedProduct.id).toBe(1);
    expect(deletedProduct.isDeleted).toBe(true);
    expect(deletedProduct.deletedOn).toBeTruthy();
  });

});