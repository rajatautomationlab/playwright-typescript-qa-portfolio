import { test, expect } from '../../fixtures/test-fixtures';
import { productSchema, productListSchema } from '../../schemas/product.schema';
import { expectValidSchema } from '../../utils/schema';

test.describe('DummyJSON API - Product Tests', { tag: ['@api', '@regression'] }, () => {

  test('TC_API_001 - Get all products', { tag: '@smoke' }, async ({ productService }) => {
    const response = await productService.getAllProducts();

    expect(response.status()).toBe(200);

    const body = expectValidSchema(productListSchema, await response.json());

    expect(body.products.length).toBeGreaterThan(0);
  });

  test('TC_API_002 - Get a product by ID', { tag: '@smoke' }, async ({ productService }) => {
    const response = await productService.getProductById(1);

    expect(response.status()).toBe(200);

    const product = expectValidSchema(productSchema, await response.json());

    expect(product.id).toBe(1);
  });

});