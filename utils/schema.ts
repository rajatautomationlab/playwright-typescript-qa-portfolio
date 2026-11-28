import { expect } from '@playwright/test';
import { z } from 'zod';

/**
 * Validates data against a Zod schema.
 * On failure, the assertion message lists every field that broke the contract.
 */
export function expectValidSchema<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);

  expect(
    result.success,
    result.success ? '' : JSON.stringify(result.error.issues, null, 2)
  ).toBe(true);

  return result.data as T;
}