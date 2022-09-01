class CustomError extends Error {
    constructor(message,status) {
        super(message);
        this.status = status;
    }
}
const CustomErrorHandler = (err,req,res,next) => {
    const customError = err;
    if(err.name === 'SyntaxError'){
      customError = new CustomError("Unexpected syntax error",400);
    }   
    if(err.code === 11000){
        customError = new customError("Duplicate key found error",400);
    }
    if(err.name === "CastError"){
        customError = new customError("please provide a valid id",400);
    }
    if(err.name === 'validationError'){
        customError = new customError(err.message,400);
    }
    res.status( CustomError.status || 500).json({
        success: false,
        message: err.message || "server error"
    })
}

export default CustomErrorHandler;