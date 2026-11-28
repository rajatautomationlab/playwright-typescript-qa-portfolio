import { test, expect } from '../../fixtures/test-fixtures';
import { productListSchema, errorSchema } from '../../schemas/product.schema';
import { expectValidSchema } from '../../utils/schema';

test.describe('DummyJSON API - Negative and Response Validation Tests', { tag: ['@api', '@regression'] }, () => {

  test('TC_API_007 - Verify response for a non-existing product ID', async ({ productService }) => {
    const response = await productService.getProductById(9999);

    expect(response.status()).toBe(404);

    const body = expectValidSchema(errorSchema, await response.json());

    expect(body.message).toContain('not found');
  });

  test('TC_API_008 - Validate every product matches the schema', async ({ productService }) => {
    const response = await productService.getAllProducts();

    expect(response.status()).toBe(200);

    // The schema validates every product in the list, so one bad record fails the test
    expectValidSchema(productListSchema, await response.json());
  });

});