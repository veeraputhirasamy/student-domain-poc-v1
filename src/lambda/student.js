"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const db = new aws_sdk_1.default.DynamoDB.DocumentClient();
const TABLENAME = process.env.TABLE_NAME || 'StudentTestTable';
exports.createNewTest = async function (event) {
    try {
        const data = typeof event.body === 'object' ? event.body : JSON.parse(event.body);
        data.PK = `STUDENT#${Math.floor(32 * Math.random() * 4)}`;
        data.SK = `TEST#${Math.floor(32 * Math.random() * 4)}`;
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
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'text/json' },
            body: JSON.stringify(err),
        };
    }
};
exports.updateStudentTest = async function (event) {
    try {
        const data = typeof event.body === 'object' ? event.body : JSON.parse(event.body);
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
    }
    catch (err) {
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'text/json' },
            body: JSON.stringify(err),
        };
    }
};
exports.getStudentTest = async function (event) {
    try {
        console.log('event.queryStringParameters', event.queryStringParameters);
        const query = event.queryStringParameters;
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
    }
    catch (err) {
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'text/json' },
            body: JSON.stringify(err),
        };
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R1ZGVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0dWRlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBMEI7QUFFMUIsTUFBTSxFQUFFLEdBQUcsSUFBSSxpQkFBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUM3QyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxrQkFBa0IsQ0FBQztBQUUvRCxPQUFPLENBQUMsYUFBYSxHQUFHLEtBQUssV0FBVyxLQUFVO0lBQ2hELElBQUk7UUFDRixNQUFNLElBQUksR0FDUixPQUFPLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsRUFBRSxHQUFHLFdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLEVBQUUsR0FBRyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBRXJELE1BQU0sTUFBTSxHQUFHO1lBQ2IsU0FBUyxFQUFFLFNBQVM7WUFDcEIsSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFDO1FBRUYsTUFBTSxRQUFRLEdBQUcsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEIsT0FBTztZQUNMLFVBQVUsRUFBRSxHQUFHO1lBQ2YsT0FBTyxFQUFFLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFB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QUE4QjtRQUM5Qiw4QkFBOEI7UUFDOUIsU0FBUztRQUNULE9BQU87UUFDUCwyQ0FBMkM7UUFDM0MsZ0NBQWdDO1FBRWhDLGVBQWU7UUFDZiw0QkFBNEI7UUFDNUIsbUVBQW1FO1FBQ25FLGtDQUFrQztRQUNsQyxxQkFBcUI7UUFDckIsaUNBQWlDO1FBQ2pDLFNBQVM7UUFDVCxtQ0FBbUM7UUFDbkMsOEJBQThCO1FBQzlCLDhCQUE4QjtRQUM5QixTQUFTO1FBQ1QsT0FBTztRQUNQLDJDQUEyQztRQUMzQyxnQ0FBZ0M7UUFFaEMsZUFBZTtRQUNmLDRCQUE0QjtRQUM1QixvRUFBb0U7UUFDcEUsa0NBQWtDO1FBQ2xDLHFCQUFxQjtRQUNyQiw4QkFBOEI7UUFDOUIsU0FBUztRQUNULG1DQUFtQztRQUNuQyw4QkFBOEI7UUFDOUIsOEJBQThCO1FBQzlCLFNBQVM7UUFDVCxPQUFPO1FBQ1AsSUFBSTtRQUVKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsTUFBTSxRQUFRLEdBQUcsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWxELE9BQU87WUFDTCxVQUFVLEVBQUUsR0FBRztZQUNmLE9BQU8sRUFBRSxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUU7WUFDeEMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1NBQy9CLENBQUM7S0FDSDtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osT0FBTztZQUNMLFVBQVUsRUFBRSxHQUFHO1lBQ2YsT0FBTyxFQUFFLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRTtZQUN4QyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7U0FDMUIsQ0FBQztLQUNIO0FBQ0gsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFXUyBmcm9tICdhd3Mtc2RrJztcbmltcG9ydCB7IElTdHVkZW50VGVzdENyZWF0ZSwgSVF1ZXJ5RGF0YSB9IGZyb20gJy4uL21vZGVscy9hcGlNb2RlbHMnO1xuY29uc3QgZGIgPSBuZXcgQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KCk7XG5jb25zdCBUQUJMRU5BTUUgPSBwcm9jZXNzLmVudi5UQUJMRV9OQU1FIHx8ICdTdHVkZW50VGVzdFRhYmxlJztcblxuZXhwb3J0cy5jcmVhdGVOZXdUZXN0ID0gYXN5bmMgZnVuY3Rpb24gKGV2ZW50OiBhbnkpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBkYXRhOklTdHVkZW50VGVzdENyZWF0ZSA9XG4gICAgICB0eXBlb2YgZXZlbnQuYm9keSA9PT0gJ29iamVjdCcgPyBldmVudC5ib2R5IDogSlNPTi5wYXJzZShldmVudC5ib2R5KTtcbiAgICBkYXRhLlBLID0gYFNUVURFTlQjJHtNYXRoLmZsb29yKDMyICogTWF0aC5yYW5kb20oKSo0KX1gO1xuICAgIGRhdGEuU0sgPSBgVEVTVCMke01hdGguZmxvb3IoMzIgKiBNYXRoLnJhbmRvbSgpKjQpfWA7XG5cbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBUYWJsZU5hbWU6IFRBQkxFTkFNRSxcbiAgICAgIEl0ZW06IGRhdGEsXG4gICAgfTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGIucHV0KHBhcmFtcykucHJvbWlzZSgpO1xuICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ3RleHQvanNvbicgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSxcbiAgICB9O1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXNDb2RlOiA1MDAsXG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAndGV4dC9qc29uJyB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZXJyKSxcbiAgICB9O1xuICB9XG59O1xuXG5leHBvcnRzLnVwZGF0ZVN0dWRlbnRUZXN0ID0gYXN5bmMgZnVuY3Rpb24gKGV2ZW50OiBhbnkpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBkYXRhID1cbiAgICAgIHR5cGVvZiBldmVudC5ib2R5ID09PSAnb2JqZWN0JyA/IGV2ZW50LmJvZHkgOiBKU09OLnBhcnNlKGV2ZW50LmJvZHkpO1xuXG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgVGFibGVOYW1lOiBUQUJMRU5BTUUsXG4gICAgICBLZXk6IHtcbiAgICAgICAgUEs6IGV2ZW50LnF1ZXJ5LlBLLFxuICAgICAgICBTSzogZXZlbnQucXVlcnkuU0ssXG4gICAgICB9LFxuICAgICAgVXBkYXRlRXhwcmVzc2lvbjogJ3NldCBpbmZvLnBsb3QgPSA6aScsXG4gICAgICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiB7XG4gICAgICAgICc6aSc6IGRhdGEuaW5mby5wbG90LFxuICAgICAgfSxcbiAgICAgIFJldHVyblZhbHVlczogJ1VQREFURURfTkVXJyxcbiAgICB9O1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGIudXBkYXRlKHBhcmFtcykucHJvbWlzZSgpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAndGV4dC9qc29uJyB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpLFxuICAgIH07XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXNDb2RlOiA1MDAsXG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAndGV4dC9qc29uJyB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZXJyKSxcbiAgICB9O1xuICB9XG59O1xuXG5leHBvcnRzLmdldFN0dWRlbnRUZXN0ID0gYXN5bmMgZnVuY3Rpb24gKGV2ZW50OiBhbnkpIHtcbiAgdHJ5IHtcbiAgICBjb25zb2xlLmxvZygnZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzJywgZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzKTtcblxuICAgIGNvbnN0IHF1ZXJ5OklRdWVyeURhdGEgPSBldmVudC5xdWVyeVN0cmluZ1BhcmFtZXRlcnM7XG4gICAgbGV0IHBhcmFtcztcblxuICAgIHBhcmFtcyA9IHtcbiAgICAgIFRhYmxlTmFtZTogVEFCTEVOQU1FLFxuICAgICAgS2V5Q29uZGl0aW9uRXhwcmVzc2lvbjogJyNQSyA9IDpTRElEIGFuZCAjU2Nob29sSWQ9IDpTQ0lEJyxcbiAgICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVOYW1lczoge1xuICAgICAgICAnI1BLJzogJ1BLJyxcbiAgICAgICAgJyNTY2hvb2xJZCc6ICdTY2hvb2xJZCcsXG4gICAgICB9LFxuICAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuICAgICAgICAnOlNESUQnOiBxdWVyeS5zZF9pZCxcbiAgICAgICAgJzpTQ0lEJzogcXVlcnkuc2NfaWQsXG4gICAgICB9LFxuICAgIH07XG4gICAgLy8gaWYgKHF1ZXJ5LnNjX2lkKSB7XG4gICAgLy8gICBjb25zb2xlLmxvZygnc2NfaWQnKTtcbiAgICAvLyAgIHBhcmFtcyA9IHtcbiAgICAvLyAgICAgVGFibGVOYW1lOiBUQUJMRU5BTUUsXG4gICAgLy8gICAgIEtleUNvbmRpdGlvbkV4cHJlc3Npb246ICcjUEsgPSA6U0NJRCcsXG4gICAgLy8gICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVOYW1lczoge1xuICAgIC8vICAgICAgICcjUEsnOiAnUEsnLFxuICAgIC8vICAgICB9LFxuICAgIC8vICAgICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiB7XG4gICAgLy8gICAgICAgJzpTQ0lEJzogcXVlcnkuc2NfaWQsXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICB9O1xuICAgIC8vICAgcGFyYW1zID0ge1xuICAgIC8vICAgICBUYWJsZU5hbWU6IFRBQkxFTkFNRSxcbiAgICAvLyAgICAgS2V5Q29uZGl0aW9uRXhwcmVzc2lvbjogJyNQSyA9IDpTRElEIEFORCAjU2Nob29sSWQgPSA6U0NJRCcsXG4gICAgLy8gICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVOYW1lczoge1xuICAgIC8vICAgICAgICcjUEsnOiAnUEsnLFxuICAgIC8vICAgICAgICcjU2Nob29sSWQnOiAnU2Nob29sSWQnLFxuICAgIC8vICAgICB9LFxuICAgIC8vICAgICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiB7XG4gICAgLy8gICAgICAgJzpTRElEJzogcXVlcnkuc2RfaWQsXG4gICAgLy8gICAgICAgJzpTQ0lEJzogcXVlcnkuc2NfaWQsXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICB9O1xuICAgIC8vIH0gZWxzZSBpZiAocXVlcnkuc2NfaWQgJiYgcXVlcnkuc2RfaWQpIHtcbiAgICAvLyAgIGNvbnNvbGUubG9nKCdzY19pZCBzZF9pZCcpO1xuXG4gICAgLy8gICBwYXJhbXMgPSB7XG4gICAgLy8gICAgIFRhYmxlTmFtZTogVEFCTEVOQU1FLFxuICAgIC8vICAgICBLZXlDb25kaXRpb25FeHByZXNzaW9uOiAnI1BLID0gOlNDSUQgQU5EICNTY2hvb2xJZCA9IDpTRElEJyxcbiAgICAvLyAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZU5hbWVzOiB7XG4gICAgLy8gICAgICAgJyNQSyc6ICdQSycsXG4gICAgLy8gICAgICAgJyNTY2hvb2xJZCc6ICdTY2hvb2xJZCcsXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IHtcbiAgICAvLyAgICAgICAnOlNDSUQnOiBxdWVyeS5zY19pZCxcbiAgICAvLyAgICAgICAnOlNESUQnOiBxdWVyeS5zZF9pZCxcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgIH07XG4gICAgLy8gfSBlbHNlIGlmIChxdWVyeS5zY19pZCAmJiBxdWVyeS5jbF95cikge1xuICAgIC8vICAgY29uc29sZS5sb2coJ3NjX2lkIGNsX3lyJyk7XG5cbiAgICAvLyAgIHBhcmFtcyA9IHtcbiAgICAvLyAgICAgVGFibGVOYW1lOiBUQUJMRU5BTUUsXG4gICAgLy8gICAgIEtleUNvbmRpdGlvbkV4cHJlc3Npb246ICcjUEsgPSA6U0NJRCBBTkQgI0NsYXNzWWVhciA9IDpDTFlSJyxcbiAgICAvLyAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZU5hbWVzOiB7XG4gICAgLy8gICAgICAgJyNQSyc6ICdQSycsXG4gICAgLy8gICAgICAgJyNDbGFzc1llYXInOiAnQ0xZUicsXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IHtcbiAgICAvLyAgICAgICAnOlNDSUQnOiBxdWVyeS5zZF9pZCxcbiAgICAvLyAgICAgICAnOkNMWVInOiBxdWVyeS5jbF95cixcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgIH07XG4gICAgLy8gfVxuXG4gICAgY29uc29sZS5sb2cocGFyYW1zKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRiLnF1ZXJ5KHBhcmFtcykucHJvbWlzZSgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L2pzb24nIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXNwb25zZSksXG4gICAgfTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1c0NvZGU6IDUwMCxcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L2pzb24nIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShlcnIpLFxuICAgIH07XG4gIH1cbn07Il19