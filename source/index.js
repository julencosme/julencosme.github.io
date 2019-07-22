// To use jQuery, first install it as a dependency: `npm install --save jquery`.
// Then include `import $ from 'jquery';` at the top every JavaScript file that uses jQuery.
// $('span').mouseover(() => {
//   alert('span span!');
// });
// import $ from 'jquery'; Before using jQuery, install it with `npm install --save jquery`
// import './more-javascript/more.js';
// import 'normalize.css'; // Note this

import './style/style.scss';

const saySomething = something => {
  console.log(something); // eslint-disable-line no-console
};

saySomething('Something! (index.js)');
