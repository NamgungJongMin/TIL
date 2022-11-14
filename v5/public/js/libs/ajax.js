const req = (method, url, payload) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(payload));

    xhr.addEventListener('load', () => {
      if (xhr.status === 200 || xhr.status === 201) resolve(JSON.parse(xhr.response));
      else reject(new Error(xhr.status));
    });
  });
// const xhr = new XMLHttpRequest();
// xhr.open(method, url);
// xhr.setRequestHeader('content-type', 'application/json');
// xhr.send(JSON.stringify(payload));

// xhr.addEventListener('load', () => {
//   if (xhr.status === 200 || xhr.status === 201) onSuccess(JSON.parse(xhr.response));
//   else onFailure(xhr.status);
// });
export default {
  get(url) {
    return req('GET', url);
  },
  post(url, payload) {
    return req('POST', url, payload);
  },
  patch(url, payload) {
    return req('PATCH', url, payload);
  },
  delete(url) {
    return req('DELETE', url);
  },
};
