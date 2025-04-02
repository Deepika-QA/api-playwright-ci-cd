import express from 'express';
import { OrdersController } from '../controllers/ordersController';

const router = express.Router();
const ordersController = new OrdersController();

/**
 * @openapi
 * /api/orders:
 *   post:
 *     summary: Create an order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item:
 *                 type: string
 *               quantity:
 *                 type: number
 *               customerName:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created order.
 */
router.post('/orders', (req, res) => {
    const order = ordersController.createOrder(req.body);
    res.status(201).json(order);
});
/**
 * @openapi
 * /api/orders/search:
 *   get:
 *     summary: Search for orders by item name
 *     parameters:
 *       - in: query
 *         name: item
 *         schema:
 *           type: string
 *         required: true
 *         description: The item name to search for.
 *     responses:
 *       200:
 *         description: An array of orders matching the search criteria.
 */
router.get('/orders/search', (req, res) => {
    const orders = ordersController.searchOrders(req.query.item as string);
    res.json(orders);
});
/**
 * @openapi
 * /api/orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Order id
 *     responses:
 *       200:
 *         description: The requested order.
 *       404:
 *         description: Order not found.
 */
router.get('/orders/:id', (req, res) => {
    const order = ordersController.getOrder(Number(req.params.id));
    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});



export default router;
