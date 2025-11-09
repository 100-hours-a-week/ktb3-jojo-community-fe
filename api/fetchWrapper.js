const _fetch = () => {
  const baseRequestOptions = (method) => ({
    method,
    headers: { "Content-Type": "application/json" },
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
      const requestOptions = {
        ...baseRequestOptions("POST"),
        body: JSON.stringify(payload),
      };
      const res = await fetch(url, requestOptions);
      return handleResponse(res, onSuccess, onError);
    },

    put: async ({ url, payload, onSuccess, onError }) => {
      const requestOptions = {
        ...baseRequestOptions("PUT"),
        body: JSON.stringify(payload),
      };
      const res = await fetch(url, requestOptions);
      return handleResponse(res, onSuccess, onError);
    },

    patch: async ({ url, payload, onSuccess, onError }) => {
      const requestOptions = {
        ...baseRequestOptions("PATCH"),
        body: JSON.stringify(payload),
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
  const data = await response.json();

  if (response.ok) {
    onSuccess?.(data);
    return data;
  }

  const error = data?.message || response.statusText;
  onError?.(error);
  return data;
}

export const fetchWrapper = _fetch();
