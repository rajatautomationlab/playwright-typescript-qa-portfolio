import { test, expect } from '@playwright/test';
import { ProductService } from '../../services/ProductService';

test.describe('DummyJSON API - Negative and Response Validation Tests', () => {

  let productService: ProductService;

  test.beforeEach(async ({ request }) => {
    productService = new ProductService(request);
  });

  test('TC_API_007 - Verify response for a non-existing product ID', async () => {
    const response = await productService.getProductById(9999);

    expect(response.status()).toBe(404);

    const body = await response.json();

    expect(body.message).toContain('not found');
  });

  test('TC_API_008 - Validate mandatory fields in product response', async () => {
    const response = await productService.getAllProducts();

    expect(response.status()).toBe(200);

    const { products } = await response.json();

    expect(Array.isArray(products)).toBeTruthy();
    expect(products.length).toBeGreaterThan(0);

    for (const product of products) {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('title');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('description');
      expect(product).toHaveProperty('category');
      expect(product).toHaveProperty('thumbnail');
      expect(product).toHaveProperty('rating');

      expect(typeof product.id).toBe('number');
      expect(typeof product.title).toBe('string');
      expect(typeof product.price).toBe('number');
      expect(product.price).toBeGreaterThan(0);
      expect(typeof product.category).toBe('string');
    }
  });

});