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
