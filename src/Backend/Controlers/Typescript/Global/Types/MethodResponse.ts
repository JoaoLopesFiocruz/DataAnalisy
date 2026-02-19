export interface MethodResponse<DataType> {
  Message: string;
  data?: DataType;
  Status: number;
  Sucess: boolean;
}
 