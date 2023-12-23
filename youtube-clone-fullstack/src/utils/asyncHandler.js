const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) =>
            next(err),
        );
    };
};

export default asyncHandler;

//try chatch method

// const asyncHandler = (requestHandler) => { async(req, res, next) =>{
//     try{
//        await requestHandler(req, res, next);
//     }catch(err){
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message || "Internal Server Error"
//         });
//         next(err);
//     }
//     }
// }
