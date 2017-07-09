import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  myPlaces = [
    {
      'name': 'Imax',
      'lat': '50.262558',
      'lng': '19.006231'
    },
    {
      'name': 'Silesia City Center',
      'lat': '50.269929',
      'lng': '19.002848'
    },
    {
      'name': 'Wesołe Miasteczko',
      'lat': '50.273820',
      'lng': '18.991426'
    }
  ]

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    let latLng = new google.maps.LatLng(50.262951, 19.006107);
    let mapOptions = {
      center: latLng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    for (let place of this.myPlaces) {
      this.addMarker(place, place['name']);
    }

  }

  addMarker(posInfo, info) {
    let position = new google.maps.LatLng(posInfo['lat'], posInfo['lng']);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: position
    });
    let markerInfo = '<b>' + info + '</b>';
    this.addInfoWindow(marker, markerInfo);
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker)
    });
  }

  focusMap(place) {
    let position = new google.maps.LatLng(place['lat'], place['lng']);
    this.map.setCenter(position);
    this.map.setZoom(16);
  }

}
