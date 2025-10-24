class ApiResponse {
    constructor(statusCode,
        message,
        data,
        success
    ){
        this.message="success"
        this.statusCode=statusCode
        this.data= data
        
    }
}
export default ApiResponse