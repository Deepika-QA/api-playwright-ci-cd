import { test, expect } from '@playwright/test';

test.describe('API End-to-End Tests', () => {
    const apiUrl = 'http://localhost:3000/api'; // Adjust the URL based on your setup

    test('Create an order', async ({ request }) => {
        const response = await request.post(`${apiUrl}/orders`, {
            data: {
                item: 'Product 1',
                quantity: 2,
                customerName: 'John Doe'
            }
        });
        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('id');
        expect(responseBody.item).toBe('Product 1');
    });

    test('Get an order', async ({ request }) => {
        const createResponse = await request.post(`${apiUrl}/orders`, {
            data: {
                item: 'Product 2',
                quantity: 1,
                customerName: 'Jane Doe'
            }
        });
        const orderId = (await createResponse.json()).id;

        const response = await request.get(`${apiUrl}/orders/${orderId}`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('id', orderId);
        expect(responseBody.item).toBe('Product 2');
    });

    test('Search for orders', async ({ request }) => {
        await request.post(`${apiUrl}/orders`, {
            data: {
                item: 'Product 3',
                quantity: 3,
                customerName: 'Alice Smith'
            }
        });

        const response = await request.get(`${apiUrl}/orders/search?item=Product 3`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toBeInstanceOf(Array);
        expect(responseBody.length).toBeGreaterThan(0);
        expect(responseBody[0]).toHaveProperty('item', 'Product 3');
    });
});
