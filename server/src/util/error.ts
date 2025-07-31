export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class InvalidParamError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidParamError";
  }
}
