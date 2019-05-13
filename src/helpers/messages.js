export const serverErrorsToFormErrors = response => {
  let errorObject = {};

  if (typeof response === "undefined") {
    Object.assign(errorObject, {
      general: { message: "Server not available", title: "Service Unavailable" }
    });
    return errorObject;
  }

  switch (response.status) {
    case 401:
    case 422:
      response.data.forEach(item => {
        Object.assign(errorObject, { [item.field]: item.message });
      });
      return errorObject;
    case 404:
      Object.assign(errorObject, {
        general: { message: response.data.error.message, title: response.statusText }
      });
      return errorObject;
    default:
      Object.assign(errorObject, {
        general: { message: response.data, title: response.data }
      });
      return errorObject;
  }
};
