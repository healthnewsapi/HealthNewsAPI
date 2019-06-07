import * as restify from "restify";

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
