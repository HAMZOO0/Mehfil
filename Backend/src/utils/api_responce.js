// we we send respoence then we use this class
class API_Responce {
  constructor(status_code, data, message = "Success ") {
    this.status_code = status_code;
    this.data = data;
    this.message = message;
    this.success = status_code < 400; // < 400 good
  }
}

export { API_Responce };
