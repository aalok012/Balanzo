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
            res.status(error.code || 404).json({
                success: false,
                message: error.message
            })
    }
}
export { asyncHandler}