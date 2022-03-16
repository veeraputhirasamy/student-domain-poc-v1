import { App, Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';

import { Construct } from 'constructs';

export class StudentDomainStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    // define resources here...

    const StudentTestTable=new dynamodb.Table(this, 'StudentTestTable', {
      partitionKey: { name: 'PK', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'SK', type: dynamodb.AttributeType.STRING },
    });

    const createStudentTest=new lambda.Function(this, `createTest-${configEnv}`, {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('src/lambda'),
      handler: 'student.createNewTest',
      environment: {
        TABLE_NAME: StudentTestTable.tableName,
        PARTITION_KEY: 'PK',
      },
    });

    const getStudentTest=new lambda.Function(this, `getTest-${configEnv}`, {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('src/lambda'),
      handler: 'student.getStudentTest',
      environment: {
        TABLE_NAME: StudentTestTable.tableName,
        PARTITION_KEY: 'PK',
      },
    });

    const updateStudentTest=new lambda.Function(this, `updateTest-${configEnv}`, {
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


    new CfnOutput(this, 'API URL', {
      value: api.url ?? 'Bad action',
    });
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

export function makeStackId(length = 6, lowerCaseOnly = false): string {
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


const configEnv = process.env.NODE_CONFIG_ENV ?? 'dev';

new StudentDomainStack(app, `StudentDomainApi-${configEnv}`, { env: devEnv });

app.synth();