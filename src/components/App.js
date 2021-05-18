import GetInfoWrap from './GetInfoWrap';
import GetFilterWrap from './GetFilterWrap';

export default function App() {
  return `
    <div class="info-wrap">
      ${GetInfoWrap()}
    </div>
    <div class="main-wrap">
      ${GetFilterWrap()}
    </div>  
  `;
}
