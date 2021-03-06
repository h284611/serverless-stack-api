import uuid from 'uuid';
import * as dynamoDbLib from "./lib/dynamodb-lib";
import { success, internalServerError } from "./lib/response-lib";

const createNote = async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now()
        }
    };

    try {
        const dbRet = await dynamoDbLib.call('put', params);
        return success(params.Item);
    } catch (error) {
        return internalServerError();
    }
};

export { createNote };
