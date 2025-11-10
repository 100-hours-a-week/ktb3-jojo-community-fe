const _fetch = () => {
  const baseRequestOptions = (method, isFormData = false) => ({
    method,
    headers: isFormData ? {} : { "Content-Type": "application/json" },
    credentials: "include",
  });

  return {
    get: async ({ url, onSuccess, onError }) => {
      const requestOptions = {
        ...baseRequestOptions("GET"),
      };
      const res = await fetch(url, requestOptions);
      return handleResponse(res, onSuccess, onError);
    },

    post: async ({ url, payload, onSuccess, onError }) => {
      const isFormData = payload instanceof FormData;

      const requestOptions = {
        ...baseRequestOptions("POST", isFormData),
        body: isFormData ? payload : JSON.stringify(payload),
      };
      const res = await fetch(url, requestOptions);
      return handleResponse(res, onSuccess, onError);
    },

    put: async ({ url, payload, onSuccess, onError }) => {
      const isFormData = payload instanceof FormData;
      const requestOptions = {
        ...baseRequestOptions("PUT", isFormData),
        body: isFormData ? payload : JSON.stringify(payload),
      };
      const res = await fetch(url, requestOptions);
      return handleResponse(res, onSuccess, onError);
    },

    patch: async ({ url, payload, onSuccess, onError }) => {
      const isFormData = payload instanceof FormData;
      const requestOptions = {
        ...baseRequestOptions("PATCH", isFormData),
        body: isFormData ? payload : JSON.stringify(payload),
      };
      const res = await fetch(url, requestOptions);
      return handleResponse(res, onSuccess, onError);
    },

    _delete: async ({ url, onSuccess, onError }) => {
      const requestOptions = {
        ...baseRequestOptions("DELETE"),
      };
      const res = await fetch(url, requestOptions);
      return handleResponse(res, onSuccess, onError);
    },
  };
};
/**
 *
 * @param {Response} response
 * @param {function | undefined} onSuccess
 * @param {function | undefined} onError
 * @returns
 */

async function handleResponse(response, onSuccess, onError) {
  let data;

  try {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = null;
    }
  } catch (error) {
    console.error(error);
    data = null;
  }

  if (response.ok) {
    onSuccess?.(data);
    return data;
  }

  const error = data?.message || response.statusText;
  onError?.(error);
  return data;
}

export const fetchWrapper = _fetch();
