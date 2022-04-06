import { YMaps, Map } from 'react-yandex-maps';
import React, { useState } from "react";

import "./maps.scss";

function Maps(props) {

  return (   
    <YMaps>
      <div className="map yandex_map">
        <Map defaultState={{ center: [props.coord.coord.lat, props.coord.coord.lon], zoom: 9 }} />
      </div>
      
    </YMaps>
  );
}

export default Maps;
