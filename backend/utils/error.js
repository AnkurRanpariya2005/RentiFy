export const errorHandler = (statusCode, message) => {
    const error = new Error();

    error.statusCode = statusCode;
    error.message = message;

    return error;
}

// this file help to create error it create Error() and gives statuscode and message from the argument then return error.