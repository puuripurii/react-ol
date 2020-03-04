import * as React from "react";
import Map from './Map'
import Point from './Point'

export default class Development extends React.Component<any,any> {

  render() {
    return(
      <Map>
        <Point center useCurrentLocation icon="UserMale" label="This is you"></Point>
        <Point latitude={14.5910506} longitude={121.0598379} icon="HandPointDown" label="Somewhere in the Philippines"></Point>
      </Map>
    )
  }
}