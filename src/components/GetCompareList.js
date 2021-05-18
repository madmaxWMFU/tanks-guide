import languageList from '../data/languageList';

export default function getCompareList() {
  const compareList = window.dataStore.vehicle_compare;
  const compareCacheList = window.dataStore.cache.compareData;

  if (compareList.length != 0) {
    if (!compareCacheList) {
      const idList = compareList.join(',');
      window.performSearch(
        'compareData',
        'encyclopedia/vehicles',
        { tank_id: idList },
        'getCompareList',
      );
    } else {
      const { language } = window.dataStore.init.param;
      const { modal } = languageList[language];
      const modalWrap = document.querySelector('.modal.modal-compare');

      modalWrap.classList.add('modal--active');
      modalWrap.innerHTML = `
          <div class="modal-body">
              <div class="modal-header">
                <button 
                  class="modal-header_btn" 
                  onclick="(window.closeModal)(this, 'modal-compare');"
                >x</button>
              </div>
              <div class="modal-content">
                <div class="modal-compare_list">
                  <div>
                    <div class="empty-wrap"></div>
                    <div>${modal.name}</div>
                    <div>${modal.hp}</div>
                    <div>${modal.hull}</div>
                    <div>${modal.turret}</div>
                    <div>${modal.weight}</div>
                    <div>${modal.damage}</div>
                    <div>${modal.penetration}</div>
                    <div>${modal.fire_rate}</div>
                    <div>${modal.aim_time}</div>
                    <div>${modal.dispersion}</div>
                    <div>${modal.view_range}</div>
                    <div>${modal.signal_range}</div>
                    <div>${modal.speed_forward}</div>
                    <div>${modal.speed_backward}</div>
                  </div>
                  ${Object.values(window.dataStore.cache.compareData)
                    .map(vehicle => {
                      return `
                          <div>
                            <img 
                              class="vehicle-img"
                              src="${vehicle.images.big_icon}"
                              alt="${vehicle.short_name}"
                            > 
                            <p>${vehicle.short_name}</p>
                            <p>${vehicle.default_profile.hp}</p>
                            <p>${Object.values(vehicle.default_profile.armor.hull).join(' / ')}</p>
                            <p>${
                              vehicle.default_profile.armor.turret
                                ? Object.values(vehicle.default_profile.armor.turret).join(' / ')
                                : '- / - / -'
                            }</p>
                            <p>${vehicle.default_profile.weight}</p>
                            <p>${vehicle.default_profile.ammo
                              .map(item => item.damage[1])
                              .join(' / ')}</p>
                            <p>${vehicle.default_profile.ammo
                              .map(item => item.penetration[1])
                              .join(' / ')}</p>
                            <p>${vehicle.default_profile.gun.fire_rate}</p>
                            <p>${vehicle.default_profile.gun.aim_time}</p>
                            <p>${vehicle.default_profile.gun.dispersion}</p>
                            <p>${vehicle.default_profile.turret.view_range}</p>
                            <p>${vehicle.default_profile.radio.signal_range}</p>
                            <p>${vehicle.default_profile.speed_forward}</p>
                            <p>${vehicle.default_profile.speed_backward}</p>
                          </div>
                      `;
                    })
                    .join('')}
                </div>   
              </div>
              <div class="modal-footer">
                <button 
                  class="modal-footer_btn" 
                  onclick="
                    (window.closeModal)(this, 'modal-compare');
                    window.dataStore.vehicle_compare = [];"
                >
                  ${modal.btn_clear_compare}
                </button>
              </div>
          </div>
        `;
    }
  }
}
