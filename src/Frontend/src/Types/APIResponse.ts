export type APIResponse<T = unknown> = {
  message: string;
  success: boolean;
  status: number;
  data?: T; // Response format may vary depending on the endpoint
}