import { env } from '../config/env';
import { APIRequestContext, APIResponse } from '@playwright/test';

export class ProductService {
  private readonly request: APIRequestContext;
  private readonly baseUrl = env.apiBaseUrl;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getAllProducts(): Promise<APIResponse> {
    return await this.request.get(`${this.baseUrl}/products`);
  }

  async getProductById(id: number): Promise<APIResponse> {
    return await this.request.get(`${this.baseUrl}/products/${id}`);
  }

  async createProduct(productData: object): Promise<APIResponse> {
    return await this.request.post(`${this.baseUrl}/products`, {
      data: productData
    });
  }

  async updateProduct(id: number, productData: object): Promise<APIResponse> {
    return await this.request.put(`${this.baseUrl}/products/${id}`, {
      data: productData
    });
  }

  async partiallyUpdateProduct(id: number, productData: object): Promise<APIResponse> {
    return await this.request.patch(`${this.baseUrl}/products/${id}`, {
      data: productData
    });
  }

  async deleteProduct(id: number): Promise<APIResponse> {
    return await this.request.delete(`${this.baseUrl}/products/${id}`);
  }
}
