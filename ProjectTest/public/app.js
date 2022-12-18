const $root = document.getElementById('root');

const render = (() => {
  console.log(document.cookie);

  $root.innerHTML = `<form id="signin-form">
      <input id="userid" type="text" />
      <input id="userpw" type="text" />
      <button>LogIn</button>
    </form>`;
})();

const request = async e => {
  e.preventDefault();
  if (!e.target.matches('#signin-form')) return;

  const payload = { email: e.target.userid.value, password: e.target.userpw.value };

  try {
    const { data: user } = await axios.post('/signin', payload);
    // const { data: user } = await axios.post('/signin');
    console.log('😀 LOGIN SUCCESS!');
  } catch (e) {
    console.log('LOGIN FAILED!');
  }
};

$root.addEventListener('submit', request);
