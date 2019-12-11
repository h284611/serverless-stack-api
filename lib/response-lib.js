const buildResponse = (statusCode, body) => {
    return {
      statusCode: statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify(body)
    };
}

const success = (body) => {
    return buildResponse(200, body);
}

const internalServerError = () => {
    return buildResponse(500, { statusCode: false, error: 'Internal server error' });
}

const notFound = (body) => {
    return buildResponse(404, { statusCode: false, error: 'Item not found' });
}


export { success, internalServerError, notFound };
