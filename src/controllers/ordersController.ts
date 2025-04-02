export class OrdersController {
    private orders: Array<{ id: number; item: string; quantity: number }> = [];
    private currentId: number = 1;

    public createOrder(orderRequest: { item: string; quantity: number }) {
        const newOrder = { id: this.currentId++, ...orderRequest };
        this.orders.push(newOrder);
        return newOrder;
    }

    public getOrder(id: number) {
        return this.orders.find(order => order.id === id) || null;
    }

    public searchOrders(item: string) {
        return this.orders.filter(order => order.item.includes(item));
    }
}
