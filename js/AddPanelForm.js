import m from 'mithril';
import CloseButton from './CloseButton.js';

export default class AddPanelForm {

  constructor() {}

  view(vnode) {
    return m('div', {class: 'full-form'}, [
      m(CloseButton, {isVisible: vnode.attrs.isVisible}),
      m('div', 'field1'),
      m('div', 'field2'),
      m('div', 'field3')
    ]);
  }

}
