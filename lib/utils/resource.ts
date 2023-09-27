type Resource<T> = {
    read: () => T;
  };
  
 export const createResource = <T>(promise: Promise<T>): Resource<T> => {
    let status: 'pending' | 'success' | 'error' = "pending";
    let result: T | any;
  
    const suspender = promise.then(
      (res) => {
        status = "success";
        result = res;
      },
      (err) => {
        status = "error";
        result = err;
      }
    );
  
    return {
      read: () => {
        if (status === "pending") {
          throw suspender;
        } else if (status === "error") {
          throw result;
        } else if (status === "success") {
          return result;
        }
      },
    };
  };
  