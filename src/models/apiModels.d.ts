export interface IError {
    message: string;
}
export declare class IStudentTestCreate {
    score: {
        [key: string]: number;
    };
    testType: string;
    gradeLevel: number;
    testDate: string;
    PK: string;
    SK: string;
}
export declare class IQueryData {
    sd_id: string;
    sc_id: string;
    cl_yr: string;
}
