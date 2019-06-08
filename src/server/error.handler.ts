import * as restify from "restify";

export class CustomError extends Error {
  public statusCode: number;
  constructor(message: string, name: string, statusCode: number) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}

export const handlerError = (req: any, resp: any, err: any, done: any) => {
  err.toJSON = () => {
    return {
      status: err.statusCode,
      title: err.name,
      detail: err.message,
    };
  };

  done();
};
