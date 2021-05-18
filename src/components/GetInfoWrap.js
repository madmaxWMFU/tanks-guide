import GetInfoUser from './GetInfoUser';
import GetCompareList from './GetCompareList';

export default function GetInfoWrap() {
  return `
    <div class="user">
      <input class="user-input" id="userInfo" type="checkbox">
      <label class="user-link" for="userInfo"></label>
      <div class="user-wrap">
        ${GetInfoUser()}
      </div>
    </div>
    <div class="compare">
      <a 
        class="compare-link" 
        onclick="(window.getCompareList)();"
      ></a>
    </div>
    <div class='modal modal-compare'></div>
  `;
}
