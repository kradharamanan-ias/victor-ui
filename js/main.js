import m from 'mithril';
import Index from './Index.js';
import AddPanelForm from './AddPanelForm.js';

void function() {

  m.route(document.getElementById('app'), '/', {
    '/': Index,
    '/addReport': AddPanelForm
  });

}();
