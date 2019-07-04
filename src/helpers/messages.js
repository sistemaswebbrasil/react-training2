export const serverErrorsToFormErrors = response => {
  let errorObject = {};

  if (typeof response === "undefined") {
    Object.assign(errorObject, {
      general: { message: "Server not available", title: "Service Unavailable" }
    });
    return errorObject;
  }

  console.log(response);

  switch (response.status) {
    case 401:
      // return response.data.message;

      Object.assign(errorObject, {
        unauthorized: { message: response.data.message, title: response.statusText }
      });
      return errorObject;

    case 422:
      for (var key in response.data) {
        if (response.data.hasOwnProperty(key)) {
          console.log(key.toLowerCase()); // Email
          console.log(response.data[key]); // The Email field is required
          Object.assign(errorObject, { [key.toLowerCase()]: response.data[key] });
        }
      }

      // response.data.forEach(item => {
      //   console.log(item);
      //   Object.assign(errorObject, { [item]: item.message });
      // });
      return errorObject;
    case 404:
      Object.assign(errorObject, {
        general: { message: response.data.error.message, title: response.statusText }
      });
      return errorObject;
    default:
      Object.assign(errorObject, {
        general: { message: response.data.error.message, title: response.statusText }
      });
      return errorObject;
  }
};
