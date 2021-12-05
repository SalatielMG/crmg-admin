export interface IClientModel {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    address: string;
    email?: string;
    phoneNumber?: string;
}

export class ClientModel implements IClientModel {
    address: string;
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    name: string;
    phoneNumber: string;

    constructor()
    {
        this.address = null;
        this.email = null;
        this.firstName = null;
        this.id = 0;
        this.lastName = null;
        this.name = null;
        this.phoneNumber= null;
    }
}
