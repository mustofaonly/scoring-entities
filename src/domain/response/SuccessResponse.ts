export type SuccessResponseCodeType =
  | 200
  | 201
  | 202
  | 203
  | 204
  | 205
  | 206
  | 207
  | 208
  | 226;

export type SuccessResponse<T = unknown> = {
  success: true;
  data: T;
  code: SuccessResponseCodeType;
  message: string;
};
