import * as React from "react";
import * as actions from '../actions';
import * as ol from 'ol';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { Vector } from 'ol/source';
import { defaults as defaultInteractions, DragRotateAndZoom } from 'ol/interaction';
import Utils from '../utils'


import '../css/ol.css';
import '../css/geol.css';

interface Props {
  zoom: number
  children: React.ReactNode
}

class Map extends React.Component<Props> {

  map: ol.Map;
  points: any[] = [];
  center: any[] = [0, 0];
  zoom: number = this.props.zoom || 13;
  defaultLocation: any[];

  componentDidMount() {

    this.initiateMap()
    this.getCurrentLocation()
  }

  componentDidUpdate() {
    this.parseChildren();
    this.initiateMap()
  }

  getCurrentLocation() {
    if ( !navigator.geolocation ) return []
    navigator.geolocation.getCurrentPosition((position) => {
      this.defaultLocation = [ position.coords.longitude, position.coords.latitude ]
    });
  }

  initiateMap() {
    console.log({props: this.props, default: this.defaultLocation})
    this.resetMap();
    let streetLayer = new TileLayer({
      source: new OSM()
    })

    let vectorsAndIcons = new VectorLayer({
      source: new Vector({
        features: [
          ...this.points
        ]
      })
    })

    this.map = new ol.Map({
      target: 'l-react-map',
      interactions: defaultInteractions().extend([
        new DragRotateAndZoom()
      ]),
      layers: [
        streetLayer,
        vectorsAndIcons
      ],
      view: new ol.View({
        center: this.center,
        zoom: this.zoom
      })
    });
  }

  resetMap() {
    document.getElementById('l-react-map').innerHTML = ""
  }

  parseChildren() {
    // Todo: Transfer this to utils

    let children: any = Utils.findAllChild(this.props.children)
    let parsedPoints = new actions.Point({ points: children.points, defaultLocation: this.defaultLocation })


    this.center = parsedPoints.center
    this.points = parsedPoints.points
  }

  render() {
    return <div id="l-react-map"></div>
  }
}




export default Map;