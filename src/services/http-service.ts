import apiClient from "./api-client";

class HTTPService {

    endpoint : string;

    constructor(endpoint: string){
        this.endpoint = endpoint;
    }

  getQuote<T>(reqData : T){
    return apiClient.post(this.endpoint,reqData);
  }

}

const service = (endpoint : string) => new HTTPService(endpoint);
export default service;