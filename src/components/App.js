/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement, createFragment, useState } from '../framework';
import Header from './Header';
import Footer from './Footer';
import GetInfoWrap from './GetInfoWrap';
import GetFilterWrap from './GetFilterWrap';
import { infoWrap, mainWrap } from './App.css';

function App() {
  const [selectLanguage, setLanguage] = useState('ru');
  const [compareList, setCompareList] = useState([]);
  const addToCompareList = id => {
    setCompareList([...compareList, id]);
  };

  return (
    <>
      <Header setLanguage={setLanguage} />
      <main>
        <div class={infoWrap}>
          <GetInfoWrap
            selectLanguage={selectLanguage}
            compareList={compareList}
            setCompareList={setCompareList}
          />
        </div>
        <div class={mainWrap}>
          <GetFilterWrap selectLanguage={selectLanguage} addToCompareList={addToCompareList} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
