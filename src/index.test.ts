import app from './index';
import { describe, it, expect } from 'vitest';

describe("app", () => {

  it('should respond with 200 OK', async () => {
    const response = await app.request('/');
    expect(response.status).toBe(200);
  });
});
