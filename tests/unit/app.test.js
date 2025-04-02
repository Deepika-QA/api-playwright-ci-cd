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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
describe('API Endpoints', () => {
    it('should create a new order', () => __awaiter(void 0, void 0, void 0, function* () {
        const newOrder = {
            item: 'Test Item',
            quantity: 2,
            price: 20.00
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/orders')
            .send(newOrder)
            .expect('Content-Type', /json/)
            .expect(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.item).toBe(newOrder.item);
        expect(response.body.quantity).toBe(newOrder.quantity);
        expect(response.body.price).toBe(newOrder.price);
    }));
    it('should retrieve an order by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const orderId = 1; // Assuming an order with ID 1 exists
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/api/orders/${orderId}`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toHaveProperty('id', orderId);
    }));
    it('should return 404 for a non-existing order', () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistingOrderId = 999; // Assuming this ID does not exist
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/api/orders/${nonExistingOrderId}`)
            .expect(404);
    }));
    it('should search for orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const searchQuery = 'Test Item';
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/api/orders/search?item=${searchQuery}`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(Array.isArray(response.body)).toBe(true);
    }));
});
