import m from 'mithril';
import Panel from './Panel.js';

export default class Index {

  constructor() {}

  view(vnode) {
    const addPanel = '';
    const removePanel = '';
    const panels = Array.from(Array(70)).map((_, idx) => m(Panel, {idx}));
    return m('div', {class: 'container'}, panels);
  }

}

