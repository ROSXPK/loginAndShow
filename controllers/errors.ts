


export const catchError = async (err: any) => {
    let e = { err }
    console.log("catchError");
    console.log(e);
    let message: any
    if (err.keyPattern) {
        Object.keys(err.keyValue).forEach((key) => {
            message = `Path '${key}' duplication.`
        });
    }
    else if (err.name == "ValidationError") {
        Object.keys(err.errors).forEach((key) => {
            message = err.errors[key].message
        });
    }
    else if (err.name == "CastError")
        message = `Invalid ObjectId '${err.value}'`
    else
        message = err
    return { message }
}






