"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeStackId = exports.StudentDomainStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const apigateway = __importStar(require("aws-cdk-lib/aws-apigateway"));
const dynamodb = __importStar(require("aws-cdk-lib/aws-dynamodb"));
const lambda = __importStar(require("aws-cdk-lib/aws-lambda"));
class StudentDomainStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props = {}) {
        var _a;
        super(scope, id, props);
        // define resources here...
        const StudentTestTable = new dynamodb.Table(this, 'StudentTestTable', {
            partitionKey: { name: 'PK', type: dynamodb.AttributeType.STRING },
            sortKey: { name: 'SK', type: dynamodb.AttributeType.STRING },
        });
        const createStudentTest = new lambda.Function(this, `createTest-${configEnv}`, {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('src/lambda'),
            handler: 'student.createNewTest',
            environment: {
                TABLE_NAME: StudentTestTable.tableName,
                PARTITION_KEY: 'PK',
            },
        });
        const getStudentTest = new lambda.Function(this, `getTest-${configEnv}`, {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('src/lambda'),
            handler: 'student.getStudentTest',
            environment: {
                TABLE_NAME: StudentTestTable.tableName,
                PARTITION_KEY: 'PK',
            },
        });
        const updateStudentTest = new lambda.Function(this, `updateTest-${configEnv}`, {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('src/lambda'),
            handler: 'student.updateStudentTest',
            environment: {
                TABLE_NAME: StudentTestTable.tableName,
                PARTITION_KEY: 'PK',
            },
        });
        StudentTestTable.grantReadWriteData(createStudentTest);
        StudentTestTable.grantReadWriteData(updateStudentTest);
        StudentTestTable.grantReadWriteData(getStudentTest);
        const api = new apigateway.RestApi(this, 'studentApi', {
            restApiName: `Student-Domain-Api${configEnv}`,
        });
        const studentApi = api.root.addResource('student');
        studentApi.addMethod('GET', new apigateway.LambdaIntegration(getStudentTest));
        studentApi.addMethod('POST', new apigateway.LambdaIntegration(createStudentTest));
        studentApi.addMethod('PUT', new apigateway.LambdaIntegration(updateStudentTest));
        new aws_cdk_lib_1.CfnOutput(this, 'API URL', {
            value: (_a = api.url) !== null && _a !== void 0 ? _a : 'Bad action',
        });
    }
}
exports.StudentDomainStack = StudentDomainStack;
// for development, use account/region from cdk cli
const devEnv = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
};
const app = new aws_cdk_lib_1.App();
function makeStackId(length = 6, lowerCaseOnly = false) {
    let result = '';
    let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    if (!lowerCaseOnly) {
        characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZ${characters}`;
    }
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
exports.makeStackId = makeStackId;
const configEnv = (_a = process.env.NODE_CONFIG_ENV) !== null && _a !== void 0 ? _a : 'dev';
new StudentDomainStack(app, `StudentDomainApi-${configEnv}`, { env: devEnv });
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQWdFO0FBQ2hFLHVFQUF5RDtBQUN6RCxtRUFBcUQ7QUFDckQsK0RBQWlEO0FBSWpELE1BQWEsa0JBQW1CLFNBQVEsbUJBQUs7SUFDM0MsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxRQUFvQixFQUFFOztRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QiwyQkFBMkI7UUFFM0IsTUFBTSxnQkFBZ0IsR0FBQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFO1lBQ2xFLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO1lBQ2pFLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO1NBQzdELENBQUMsQ0FBQztRQUVILE1BQU0saUJBQWlCLEdBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxjQUFjLFNBQVMsRUFBRSxFQUFFO1lBQzNFLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQztZQUN6QyxPQUFPLEVBQUUsdUJBQXVCO1lBQ2hDLFdBQVcsRUFBRTtnQkFDWCxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsU0FBUztnQkFDdEMsYUFBYSxFQUFFLElBQUk7YUFDcEI7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLGNBQWMsR0FBQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFdB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S0FDM0U7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBWEQsa0NBV0M7QUFHRCxNQUFNLFNBQVMsR0FBRyxNQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxtQ0FBSSxLQUFLLENBQUM7QUFFdkQsSUFBSSxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsb0JBQW9CLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFFOUUsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwLCBTdGFjaywgU3RhY2tQcm9wcywgQ2ZuT3V0cHV0IH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgYXBpZ2F0ZXdheSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtYXBpZ2F0ZXdheSc7XG5pbXBvcnQgKiBhcyBkeW5hbW9kYiBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZHluYW1vZGInO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEnO1xuXG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcblxuZXhwb3J0IGNsYXNzIFN0dWRlbnREb21haW5TdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IFN0YWNrUHJvcHMgPSB7fSkge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgLy8gZGVmaW5lIHJlc291cmNlcyBoZXJlLi4uXG5cbiAgICBjb25zdCBTdHVkZW50VGVzdFRhYmxlPW5ldyBkeW5hbW9kYi5UYWJsZSh0aGlzLCAnU3R1ZGVudFRlc3RUYWJsZScsIHtcbiAgICAgIHBhcnRpdGlvbktleTogeyBuYW1lOiAnUEsnLCB0eXBlOiBkeW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklORyB9LFxuICAgICAgc29ydEtleTogeyBuYW1lOiAnU0snLCB0eXBlOiBkeW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklORyB9LFxuICAgIH0pO1xuXG4gICAgY29uc3QgY3JlYXRlU3R1ZGVudFRlc3Q9bmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCBgY3JlYXRlVGVzdC0ke2NvbmZpZ0Vudn1gLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCxcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCgnc3JjL2xhbWJkYScpLFxuICAgICAgaGFuZGxlcjogJ3N0dWRlbnQuY3JlYXRlTmV3VGVzdCcsXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBUQUJMRV9OQU1FOiBTdHVkZW50VGVzdFRhYmxlLnRhYmxlTmFtZSxcbiAgICAgICAgUEFSVElUSU9OX0tFWTogJ1BLJyxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBnZXRTdHVkZW50VGVzdD1uZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsIGBnZXRUZXN0LSR7Y29uZmlnRW52fWAsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdzcmMvbGFtYmRhJyksXG4gICAgICBoYW5kbGVyOiAnc3R1ZGVudC5nZXRTdHVkZW50VGVzdCcsXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBUQUJMRV9OQU1FOiBTdHVkZW50VGVzdFRhYmxlLnRhYmxlTmFtZSxcbiAgICAgICAgUEFSVElUSU9OX0tFWTogJ1BLJyxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCB1cGRhdGVTdHVkZW50VGVzdD1uZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsIGB1cGRhdGVUZXN0LSR7Y29uZmlnRW52fWAsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdzcmMvbGFtYmRhJyksXG4gICAgICBoYW5kbGVyOiAnc3R1ZGVudC51cGRhdGVTdHVkZW50VGVzdCcsXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBUQUJMRV9OQU1FOiBTdHVkZW50VGVzdFRhYmxlLnRhYmxlTmFtZSxcbiAgICAgICAgUEFSVElUSU9OX0tFWTogJ1BLJyxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBTdHVkZW50VGVzdFRhYmxlLmdyYW50UmVhZFdyaXRlRGF0YShjcmVhdGVTdHVkZW50VGVzdCk7XG4gICAgU3R1ZGVudFRlc3RUYWJsZS5ncmFudFJlYWRXcml0ZURhdGEodXBkYXRlU3R1ZGVudFRlc3QpO1xuICAgIFN0dWRlbnRUZXN0VGFibGUuZ3JhbnRSZWFkV3JpdGVEYXRhKGdldFN0dWRlbnRUZXN0KTtcblxuICAgIGNvbnN0IGFwaSA9IG5ldyBhcGlnYXRld2F5LlJlc3RBcGkodGhpcywgJ3N0dWRlbnRBcGknLCB7XG4gICAgICByZXN0QXBpTmFtZTogYFN0dWRlbnQtRG9tYWluLUFwaSR7Y29uZmlnRW52fWAsXG4gICAgfSk7XG5cbiAgICBjb25zdCBzdHVkZW50QXBpID0gYXBpLnJvb3QuYWRkUmVzb3VyY2UoJ3N0dWRlbnQnKTtcbiAgICBzdHVkZW50QXBpLmFkZE1ldGhvZCgnR0VUJywgbmV3IGFwaWdhdGV3YXkuTGFtYmRhSW50ZWdyYXRpb24oZ2V0U3R1ZGVudFRlc3QpKTtcbiAgICBzdHVkZW50QXBpLmFkZE1ldGhvZCgnUE9TVCcsIG5ldyBhcGlnYXRld2F5LkxhbWJkYUludGVncmF0aW9uKGNyZWF0ZVN0dWRlbnRUZXN0KSk7XG4gICAgc3R1ZGVudEFwaS5hZGRNZXRob2QoJ1BVVCcsIG5ldyBhcGlnYXRld2F5LkxhbWJkYUludGVncmF0aW9uKHVwZGF0ZVN0dWRlbnRUZXN0KSk7XG5cblxuICAgIG5ldyBDZm5PdXRwdXQodGhpcywgJ0FQSSBVUkwnLCB7XG4gICAgICB2YWx1ZTogYXBpLnVybCA/PyAnQmFkIGFjdGlvbicsXG4gICAgfSk7XG4gIH1cbn1cblxuLy8gZm9yIGRldmVsb3BtZW50LCB1c2UgYWNjb3VudC9yZWdpb24gZnJvbSBjZGsgY2xpXG5jb25zdCBkZXZFbnYgPSB7XG4gIGFjY291bnQ6IHByb2Nlc3MuZW52LkNES19ERUZBVUxUX0FDQ09VTlQsXG4gIHJlZ2lvbjogcHJvY2Vzcy5lbnYuQ0RLX0RFRkFVTFRfUkVHSU9OLFxufTtcblxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFrZVN0YWNrSWQobGVuZ3RoID0gNiwgbG93ZXJDYXNlT25seSA9IGZhbHNlKTogc3RyaW5nIHtcbiAgbGV0IHJlc3VsdCA9ICcnO1xuICBsZXQgY2hhcmFjdGVycyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknO1xuICBpZiAoIWxvd2VyQ2FzZU9ubHkpIHtcbiAgICBjaGFyYWN0ZXJzID0gYEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJHtjaGFyYWN0ZXJzfWA7XG4gIH1cbiAgY29uc3QgY2hhcmFjdGVyc0xlbmd0aCA9IGNoYXJhY3RlcnMubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgcmVzdWx0ICs9IGNoYXJhY3RlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3RlcnNMZW5ndGgpKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbmNvbnN0IGNvbmZpZ0VudiA9IHByb2Nlc3MuZW52Lk5PREVfQ09ORklHX0VOViA/PyAnZGV2JztcblxubmV3IFN0dWRlbnREb21haW5TdGFjayhhcHAsIGBTdHVkZW50RG9tYWluQXBpLSR7Y29uZmlnRW52fWAsIHsgZW52OiBkZXZFbnYgfSk7XG5cbmFwcC5zeW50aCgpOyJdfQ==