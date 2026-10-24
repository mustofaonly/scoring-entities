export type ErrorResponseCode =
  | 400
  | 401
  | 403
  | 404
  | 500
  | 502
  | 503
  | 504
  | 505;

export type ErrorResponse = {
  success: false;
  code: ErrorResponseCode;
  message: string;
};

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
