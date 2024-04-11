import service from "./http-service";

export interface QuoteReq {
    square_footage: number;
    no_of_furnace: string;
    furnace_location?: string;
    exit_point?: string;
}

export interface QuoteRes {
    status: boolean;
    message: string;
    data : {
        air_duct_cleaning_price: number;
        dryer_vent_cleaning_price?: number;
        total: number;
    }
}

export default service('/get-quotes');