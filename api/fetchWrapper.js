export const fetchWrapper = {
  get: async ({ url, onSuccess, onError }) => {
    const requestOptions = {
      method: "GET",
    };
    const res = await fetch(url, requestOptions);
    return handleResponse(res, onSuccess, onError);
  },

  post: async ({ url, payload, onSuccess, onError }) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    };
    const res = await fetch(url, requestOptions);
    return handleResponse(res, onSuccess, onError);
  },

  put: async ({ url, payload, onSuccess, onError }) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    };
    const res = await fetch(url, requestOptions);
    return handleResponse(res, onSuccess, onError);
  },

  patch: async ({ url, payload, onSuccess, onError }) => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    };
    const res = await fetch(url, requestOptions);
    return handleResponse(res, onSuccess, onError);
  },

  _delete: async ({ url, onSuccess, onError }) => {
    const requestOptions = {
      method: "DELETE",
    };
    const res = await fetch(url, requestOptions);
    return handleResponse(res, onSuccess, onError);
  },
};

/**
 *
 * @param {Response} response
 * @returns
 */
function handleResponse(response, onSuccess, onError) {
  const data = response.json();

  if (response.ok) {
    onSuccess(response.statusText);
    return data;
  }

  const error = data?.message || response.statusText;
  onError(error);
  return data;
}
