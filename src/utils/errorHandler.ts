export class ErrorHandler extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(<string>message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}
