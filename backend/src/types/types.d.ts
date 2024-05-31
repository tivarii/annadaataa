declare namespace Express{
    export interface Request{
        user:any
    }
    export interface Response{
        user:any
    }
}

export interface UserAuthInfoRequest extends Request{
    user?:any;
    params?:any,
    body?:any,
    file?:any
}

export type FoodRequest={
    donorId:string;
    foodName: string;
    description: string;
    quantity: number;
    location:string;
    donationDate: Date;
}