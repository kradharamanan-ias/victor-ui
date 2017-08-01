import m from 'mithril';
import Index from './Index.js';

void function() {

  m.route(document.body, "/", {
    "/": Index
  });

}();
