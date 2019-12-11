import uuid from 'uuid';
import * as dynamoDbLib from "./lib/dynamodb-lib";
import { success, failure } from "./lib/response-lib";

export async function main(event, context, callback) {
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
        console.log(dbRet);
        return success(params.Item);
    } catch (error) {
        return failure({ status: false });
    }
}

