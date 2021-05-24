/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement } from './element';

let Component, Target;

function renderApp(componentFunction = null, target = null) {
  if (componentFunction) Component = componentFunction;
  if (target) Target = target;
  Target.innerHTML = '';
  Target.appendChild(<Component />);
}

export default renderApp;
