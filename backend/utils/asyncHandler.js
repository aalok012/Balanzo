// const asyncHandler = (requestHandler) => {
// (req,res,next)=> { Promise.resolve(requestHandler(req,res,next)
// ).reject( (error)=> {
//     status: 404,
//     message: "error.message"
//  }
// )
// }
// }


//wrapper function for the handling async function everywhere

const asyncHandler = (fn) => async (req,res,next) => {
     try{
           await fn(req,res,next)
    }
    catch(error){
            const statusCode =
                typeof error?.StatusCode === "number"
                  ? error.StatusCode
                  : typeof error?.statusCode === "number"
                  ? error.statusCode
                  : typeof error?.code === "number"
                  ? error.code
                  : 500;

            res.status(statusCode).json({
                success: false,
                message: error?.message || "Something went wrong."
            })
    }
}
export { asyncHandler}