
import { test, expect } from '@playwright/test';
import { ProductService } from '../../services/ProductService';

test.describe('FakeStoreAPI - Product Tests', () => {

  let productService: ProductService;

  test.beforeEach(async ({ request }) => {
    productService = new ProductService(request);
  });

  test('TC_API_001 - Get all products', async () => {
    const response = await productService.getAllProducts();

    expect(response.status()).toBe(200);

    const products = await response.json();

    expect(Array.isArray(products)).toBeTruthy();
    expect(products.length).toBeGreaterThan(0);

    console.log('Total products:', products.length);
  });

  test('TC_API_002 - Get a product by ID', async () => {
    const response = await productService.getProductById(1);

    expect(response.status()).toBe(200);

    const product = await response.json();

    expect(product.id).toBe(1);
    expect(product.title).toBeTruthy();
    expect(product.price).toBeGreaterThan(0);
    expect(product.category).toBeTruthy();
  });

});
