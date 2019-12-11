import * as dynamoDbLib from "./lib/dynamodb-lib";
import { success, internalServerError } from "./lib/response-lib";

const listNote = async (event, context) => {
    const params = {
        TableName: process.env.tableName,
        // 'KeyConditionExpression' defines the condition for the query
        // - 'userId = :userId': only return items with matching 'userId'
        //   partition key
        // 'ExpressionAttributeValues' defines the value in the condition
        // - ':userId': defines 'userId' to be Identity Pool identity id
        //   of the authenticated user
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": event.requestContext.identity.cognitoIdentityId
        }
    };
    try {
        const dbRet = await dynamoDbLib.call('query', params);
        return success(dbRet);
    } catch (error) {
        return internalServerError();
    }
};

export { listNote };
