import { test, expect } from '../../fixtures/test-fixtures';

test.describe('DummyJSON API - Product Tests', { tag: ['@api', '@regression'] }, () => {

  test('TC_API_001 - Get all products', { tag: '@smoke' }, async ({ productService }) => {
    const response = await productService.getAllProducts();

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products.length).toBeGreaterThan(0);
    expect(body.total).toBeGreaterThan(0);
  });

  test('TC_API_002 - Get a product by ID', { tag: '@smoke' }, async ({ productService }) => {
    const response = await productService.getProductById(1);

    expect(response.status()).toBe(200);

    const product = await response.json();

    expect(product.id).toBe(1);
    expect(product.title).toBeTruthy();
    expect(product.price).toBeGreaterThan(0);
    expect(product.category).toBeTruthy();
  });

});