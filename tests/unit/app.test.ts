import request from 'supertest';
import app from '../../src/app';

describe('API Endpoints', () => {
    it('should create a new order', async () => {
        const newOrder = {
            item: 'Test Item',
            quantity: 2,
            price: 20.00
        };

        const response = await request(app)
            .post('/api/orders')
            .send(newOrder)
            .expect('Content-Type', /json/)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.item).toBe(newOrder.item);
        expect(response.body.quantity).toBe(newOrder.quantity);
        expect(response.body.price).toBe(newOrder.price);
    });

    it('should retrieve an order by ID', async () => {
        const orderId = 1; // Assuming an order with ID 1 exists

        const response = await request(app)
            .get(`/api/orders/${orderId}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('id', orderId);
    });

    it('should return 404 for a non-existing order', async () => {
        const nonExistingOrderId = 999; // Assuming this ID does not exist

        const response = await request(app)
            .get(`/api/orders/${nonExistingOrderId}`)
            .expect(404);
    });

    it('should search for orders', async () => {
        const searchQuery = 'Test Item';

        const response = await request(app)
            .get(`/api/orders/search?item=${searchQuery}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
    });
});