export const serverErrorsToFormErrors = response => {
  let errorObject = {};
  switch (response.status) {
    case 401:
    case 422:
      response.data.forEach(item => {
        Object.assign(errorObject, { [item.field]: item.message });
      });
      return errorObject;
    default:
      console.log(response.data.error);
      Object.assign(errorObject, {
        general: { message: response.data.error.message, title: response.data.error.name }
      });
      return errorObject;
  }
};
