"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
test_1.test.describe('API End-to-End Tests', () => {
    const apiUrl = 'http://localhost:3000'; // Adjust the URL based on your setup
    (0, test_1.test)('Create an order', ({ request }) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post(`${apiUrl}/orders`, {
            data: {
                item: 'Product 1',
                quantity: 2,
                customerName: 'John Doe'
            }
        });
        (0, test_1.expect)(response.status()).toBe(201);
        const responseBody = yield response.json();
        (0, test_1.expect)(responseBody).toHaveProperty('id');
        (0, test_1.expect)(responseBody.item).toBe('Product 1');
    }));
    (0, test_1.test)('Get an order', ({ request }) => __awaiter(void 0, void 0, void 0, function* () {
        const createResponse = yield request.post(`${apiUrl}/orders`, {
            data: {
                item: 'Product 2',
                quantity: 1,
                customerName: 'Jane Doe'
            }
        });
        const orderId = (yield createResponse.json()).id;
        const response = yield request.get(`${apiUrl}/orders/${orderId}`);
        (0, test_1.expect)(response.status()).toBe(200);
        const responseBody = yield response.json();
        (0, test_1.expect)(responseBody).toHaveProperty('id', orderId);
        (0, test_1.expect)(responseBody.item).toBe('Product 2');
    }));
    (0, test_1.test)('Search for orders', ({ request }) => __awaiter(void 0, void 0, void 0, function* () {
        yield request.post(`${apiUrl}/orders`, {
            data: {
                item: 'Product 3',
                quantity: 3,
                customerName: 'Alice Smith'
            }
        });
        const response = yield request.get(`${apiUrl}/orders/search?item=Product 3`);
        (0, test_1.expect)(response.status()).toBe(200);
        const responseBody = yield response.json();
        (0, test_1.expect)(responseBody).toBeInstanceOf(Array);
        (0, test_1.expect)(responseBody.length).toBeGreaterThan(0);
        (0, test_1.expect)(responseBody[0]).toHaveProperty('item', 'Product 3');
    }));
});
