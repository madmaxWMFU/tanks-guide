import languageList from '../data/languageList';
import { getRomeNumber } from '../utils';

export default function getVehicleInfo(id = null) {
  if (id) {
    const { language } = window.dataStore.init.param;
    const { modal } = languageList[language];
    const vehicle = window.dataStore.cache.searchData[id];
    const modalWrap = document.querySelector('.modal.modal-vehicle');

    modalWrap.classList.add('modal--active');
    modalWrap.innerHTML = `     
    <div class="modal-body">
        <div class="modal-header">
        <button 
            class="modal-header_btn" 
            onclick="(window.closeModal)(this, 'modal-vehicle');"
        >x</button>
        </div>
        <div class="modal-content">
        <div class="modal-wrap">
            <div class="vehicle-item">
            <span 
                class="vehicle-type 
                ${vehicle.is_premium ? `type-${vehicle.type}--premium` : `type-${vehicle.type}`}"
            >
                ${getRomeNumber(vehicle.tier)}
            </span>
            <span 
                class="vehicle-flag vehicle-flag-${vehicle.nation}"
            ></span>
            <img 
                class="vehicle-img"
                src="${vehicle.images.big_icon}"
                alt="${vehicle.short_name}"
            > 
            </div>
            <div>
            <p class="modal-wrap_title vehicle-prop">
                <b class="vehicle-name">${vehicle.name}</b> - 
                <b class="vehicle-price ${vehicle.price_credit ? 'price-silver' : 'price-gold'}">
                ${
                  vehicle.price_credit
                    ? vehicle.price_credit
                    : vehicle.price_gold
                    ? vehicle.price_gold
                    : '-'
                } 
                </b>
            </p>
            <p class="vehicle-prop vehicle-description">${vehicle.description}</p>
            </div>
        </div>
        <div>
            <h2>
            ${modal.armor}
            </h2>
            <p>
            <span>
                ${modal.hp}: 
            </span>
            <b>
                ${vehicle.default_profile.hp}
            </b>
            </p>
            <p>
            <span>
                ${modal.hull}:
            </span>
            <b>
                ${Object.values(vehicle.default_profile.armor.hull).join(' / ')}
            </b>
            </p>
            ${
              vehicle.default_profile.armor.turret
                ? `<p>
                    <span>
                    ${modal.turret}: 
                    </span>
                    <b>
                    ${Object.values(vehicle.default_profile.armor.turret).join(' / ')}
                    </b>
                </p>`
                : ''
            }
            <p>
            <span>
            ${modal.weight}:
            </span>
            <b>
                ${vehicle.default_profile.weight}
            </b>
            </p>
        </div>
        <div>
            <h2>
            ${modal.ammo}
            </h2>
            <p>
            <span>
                ${modal.damage}: 
            </span>
            <b>
                ${vehicle.default_profile.ammo
                  .map(item => {
                    return item.damage[1];
                  })
                  .join(' / ')}
            </b>
            </p>
            <p>
            <span>
                ${modal.penetration}: 
            </span>
            <b>
                ${vehicle.default_profile.ammo
                  .map(item => {
                    return item.penetration[1];
                  })
                  .join(' / ')}
            </b>
            </p>
            <p>
            <span>
                ${modal.fire_rate}: 
            </span>
            <b>
                ${vehicle.default_profile.gun.fire_rate}
            </b>
            </p>
            <p>
            <span>
                ${modal.aim_time}: 
            </span>
            <b>
                ${vehicle.default_profile.gun.aim_time}
            </b>
            </p>
            <p>
            <span>
                ${modal.dispersion}: 
            </span>
            <b>
                ${vehicle.default_profile.gun.dispersion}
            </b>
            </p>
            <p>
            <span>
                ${modal.max_ammo}: 
            </span>
            <b>
                ${vehicle.default_profile.max_ammo}
            </b>
            </p>
        </div>
        <div>
            <h2>
            ${modal.crew}
            </h2>
            <p>
            ${vehicle.crew
              .map((member, key) => {
                return `${++key}. ${Object.values(member.roles).join('-')}`;
              })
              .join('<br>')}
            </p>
        </div>
        <div>
            <h2>
            ${modal.range}
            </h2>
            <p>
            <span>
                ${modal.view_range}:
            </span>
            <b>
                ${vehicle.default_profile.turret.view_range}
            </b>
            </p>        
            <p>
            <span>
                ${modal.signal_range}:
            </span>
            <b>
                ${vehicle.default_profile.radio.signal_range}
            </b>
            </p>
        </div>
        <div>
            <h2>
            ${modal.speed}
            </h2>
            <p>
            <span>
                ${modal.speed_forward}:
            </span>
            <b>
                ${vehicle.default_profile.speed_forward}
            </b>
            </p>
            <p>
            <span>
                ${modal.speed_backward}:
            </span>
            <b>
                ${vehicle.default_profile.speed_backward}
            </b>
            </p>
        </div>
        </div>
        <div class="modal-footer">
            <button 
            class="modal-footer_btn" 
            onclick="
                window.dataStore.vehicle_compare.push(${vehicle.tank_id});
                (window.closeModal)(this, 'modal-vehicle');"
            >
            ${modal.btn_add_compare}
            </button>
        </div>
    </div>
    `;
  } else {
    return '';
  }
}
