const req = (method, url, onSuccess, onFailure, payload) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(JSON.stringify(payload));

  xhr.addEventListener('load', () => {
    if (xhr.status === 200 || xhr.status === 201) onSuccess(JSON.parse(xhr.response));
    else onFailure(xhr.status);
  });
};
const ajax = {
  get(url, onSuccess, onFailure) {
    req('GET', url, onSuccess, onFailure);
  },
  post(url, payload, onSuccess, onFailure) {
    req('POST', url, onSuccess, onFailure, payload);
  },
  patch(url, payload, onSuccess, onFailure) {
    req('PATCH', url, onSuccess, onFailure, payload);
  },
  delete(url, onSuccess, onFailure) {
    req('DELETE', url, onSuccess, onFailure);
  },
};

export default ajax;
