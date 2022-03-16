
export interface IError {
  message: string;
}

export class IStudentTestCreate {
  score: { [key: string]: number };
  testType: string;
  gradeLevel: number;
  testDate: string;
  PK!: string;
  SK!: string;
}

export class IQueryData {
  sd_id: string;
  sc_id: string;
  cl_yr: string;
}