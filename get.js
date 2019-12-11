import * as dynamoDbLib from "./lib/dynamodb-lib";
import { success, failure } from "./lib/response-lib";

const getNote = async (event, context) => {
    const params = {
        TableName: process.env.tableName,
        // 'Key' defines the partition key and sort key of the item to be retrieved
        // - 'userId': Identity Pool identity id of the authenticated user
        // - 'noteId': path parameter
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }
    };

    try {
        const dbRet = await dynamoDbLib.call('get', params);
        if (dbRet) {
            console.log(dbRet);
            return success(dbRet.Item);
        } else {
            return failure({ status: false, error: 'record not found' })
        }
    } catch (error) {
        return failure({ status: false });
    }
};

export { getNote };
