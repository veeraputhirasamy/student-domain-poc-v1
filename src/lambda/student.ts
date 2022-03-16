import AWS from 'aws-sdk';
import { IStudentTestCreate, IQueryData } from '../models/apiModels';
const db = new AWS.DynamoDB.DocumentClient();
const TABLENAME = process.env.TABLE_NAME || 'StudentTestTable';

exports.createNewTest = async function (event: any) {
  try {
    const data:IStudentTestCreate =
      typeof event.body === 'object' ? event.body : JSON.parse(event.body);
    data.PK = `STUDENT#${Math.floor(32 * Math.random()*4)}`;
    data.SK = `TEST#${Math.floor(32 * Math.random()*4)}`;

    const params = {
      TableName: TABLENAME,
      Item: data,
    };

    const response = await db.put(params).promise();
    console.log(response);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/json' },
      body: JSON.stringify(response),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/json' },
      body: JSON.stringify(err),
    };
  }
};

exports.updateStudentTest = async function (event: any) {
  try {
    const data =
      typeof event.body === 'object' ? event.body : JSON.parse(event.body);

    console.log(data);
    const params = {
      TableName: TABLENAME,
      Key: {
        PK: event.query.PK,
        SK: event.query.SK,
      },
      UpdateExpression: 'set info.plot = :i',
      ExpressionAttributeValues: {
        ':i': data.info.plot,
      },
      ReturnValues: 'UPDATED_NEW',
    };
    const response = await db.update(params).promise();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/json' },
      body: JSON.stringify(response),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/json' },
      body: JSON.stringify(err),
    };
  }
};

exports.getStudentTest = async function (event: any) {
  try {
    console.log('event.queryStringParameters', event.queryStringParameters);

    const query:IQueryData = event.queryStringParameters;
    let params;

    params = {
      TableName: TABLENAME,
      KeyConditionExpression: '#PK = :SDID and #SchoolId= :SCID',
      ExpressionAttributeNames: {
        '#PK': 'PK',
        '#SchoolId': 'SchoolId',
      },
      ExpressionAttributeValues: {
        ':SDID': query.sd_id,
        ':SCID': query.sc_id,
      },
    };
    // if (query.sc_id) {
    //   console.log('sc_id');
    //   params = {
    //     TableName: TABLENAME,
    //     KeyConditionExpression: '#PK = :SCID',
    //     ExpressionAttributeNames: {
    //       '#PK': 'PK',
    //     },
    //     ExpressionAttributeValues: {
    //       ':SCID': query.sc_id,
    //     },
    //   };
    //   params = {
    //     TableName: TABLENAME,
    //     KeyConditionExpression: '#PK = :SDID AND #SchoolId = :SCID',
    //     ExpressionAttributeNames: {
    //       '#PK': 'PK',
    //       '#SchoolId': 'SchoolId',
    //     },
    //     ExpressionAttributeValues: {
    //       ':SDID': query.sd_id,
    //       ':SCID': query.sc_id,
    //     },
    //   };
    // } else if (query.sc_id && query.sd_id) {
    //   console.log('sc_id sd_id');

    //   params = {
    //     TableName: TABLENAME,
    //     KeyConditionExpression: '#PK = :SCID AND #SchoolId = :SDID',
    //     ExpressionAttributeNames: {
    //       '#PK': 'PK',
    //       '#SchoolId': 'SchoolId',
    //     },
    //     ExpressionAttributeValues: {
    //       ':SCID': query.sc_id,
    //       ':SDID': query.sd_id,
    //     },
    //   };
    // } else if (query.sc_id && query.cl_yr) {
    //   console.log('sc_id cl_yr');

    //   params = {
    //     TableName: TABLENAME,
    //     KeyConditionExpression: '#PK = :SCID AND #ClassYear = :CLYR',
    //     ExpressionAttributeNames: {
    //       '#PK': 'PK',
    //       '#ClassYear': 'CLYR',
    //     },
    //     ExpressionAttributeValues: {
    //       ':SCID': query.sd_id,
    //       ':CLYR': query.cl_yr,
    //     },
    //   };
    // }

    console.log(params);
    const response = await db.query(params).promise();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/json' },
      body: JSON.stringify(response),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/json' },
      body: JSON.stringify(err),
    };
  }
};