export interface MethodResponse<DataType = null> {
  Message: string;
  data?: DataType;
  Status: number;
  Sucess: boolean;
}