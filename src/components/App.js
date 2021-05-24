/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import GetInfoWrap from './GetInfoWrap';
import GetFilterWrap from './GetFilterWrap';
import { infoWrap, mainWrap } from './App.css';

function App() {
  return (
    <>
      <div class={infoWrap}>
        <GetInfoWrap />
      </div>
      <div class={mainWrap}>
        <GetFilterWrap />
      </div>
    </>
  );
}

export default App;
