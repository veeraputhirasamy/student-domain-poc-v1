import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
export declare class StudentDomainStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps);
}
export declare function makeStackId(length?: number, lowerCaseOnly?: boolean): string;
