interface Errors {
  [key: string]: String;
}
interface Error {
  name: String;
  value: String;
  path: string;
  type: String;
  errors: Array<String>;
  message: String;
  params: Object;
}
interface YupErrors {
  name: String;
  value: Object;
  errors: Array<String>;
  inner: Array<Error>;
}
export const extractYupErrors = (yupErrors: YupErrors) => {
  const errors: Errors = {};

  yupErrors.inner.forEach((error: Error) => {
    errors[error.path] = error.message;
  });

  return errors;
};
