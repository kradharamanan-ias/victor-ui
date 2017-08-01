import m from 'mithril';
import Panel from 'panel';

export default class Index {

  constructor() {}

  view(vnode) {
    const panels = Array.from(Array(70)).map((e, i) => m(Panel, {idx: i}));
    return m('div', {class: 'container'}, panels);
  }

}

