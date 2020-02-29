
export interface Shipment {
    id: string;
    prods: Product[];
    totalInputCost: number;
    isBreakEven: boolean;
    breakEvenPoint: number;
}
export class ShipmentBuilder {
    private shipment: Shipment;
    constructor(shipment: any) {
        this.shipment = shipment;
    }
    public build(): Shipment {
        this.calculateTotalInputCost(this.shipment);
        this.determineIsBreakEvent(this.shipment)
        return this.shipment;
    }
    private calculateTotalInputCost(shipment: Shipment) {
        shipment.prods.forEach(p => shipment.totalInputCost += p.input);
        return shipment;
    }
    private determineIsBreakEvent(shipment: Shipment) {
        let totalSold = 0;
        shipment.prods.forEach(s => {
            if (s.sold) {
                totalSold += s.input;
            }
        })
        let isBreakEvent = shipment.totalInputCost > totalSold ? false : true;
        shipment.isBreakEven = isBreakEvent;
        return shipment;
    }
}
export interface Product {
    id: string;
    strorageId: string;
    input: number;
    price: number;
    sold: boolean;
}
