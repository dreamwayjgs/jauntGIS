/* global daum */

import React, { Component } from 'react';
import CoordForm from "./CoordForm";
import DaumMapApi from "./DaumMapApi"


import Debugger from './Debugger'

const DaumMap = window.daum.maps;

class MapProvider extends Component {

    state = {
        centerLat: 0,
        centerLng: 0,
        address: '',
        map: null,
        markers: [],
        fixes: []
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.markers !== this.state.markers) {
            // 마커 바뀜
            this.state.markers.map((marker, index) => {                
                DaumMap.event.addListener(marker, 'click', () => {
                    // 마커 클릭 이벤트                    
                    this.moveMapCenter(marker.getPosition().getLat(), marker.getPosition().getLng())                                        
                    this.props.onFocus(index)                    
                    let fixes = this.state.fixes
                    let infoWindow = new DaumMap.InfoWindow({
                        content: `<div>
                        <span>Src: ${fixes[index].srcId} </span>
                        <span>Id: ${fixes[index].id} </span>
                        <span style='background-color:#${fixes[index].color};'>${fixes[index].color}</span>
                        </div>`,
                        removable: true
                    })
                    infoWindow.open(this.state.map, marker)
                })
            })
        }
    }

    /**
     * 
     * @param {*} nextProps 
     * @param {*} nextState 
     * 렌더링 전. props의 정보에 따라 마커를 렌더링 해야한다
     */
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.isFixUpdated) {
            Debugger.p(this, 'marker update', this.props, nextProps, this.state, nextState)
            // 렌더링 전에 받아놓은 fixes 로 마커를 처리            

            let fixes = nextProps.fixes            
            let center = [this.state.centerLat, this.state.centerLng]
            if(fixes.length > this.state.fixes.length){
                // Source added
                center = [fixes[this.state.fixes.length].lat, fixes[this.state.fixes.length].lng]
            }            
            // 마커 그리기
            this.setState({
                fixes: fixes,
                markers: fixes.map(fix => (
                    fix.daumMarker(this.state.map)
                )),
                centerLat: center[0],
                centerLng: center[1]
            }, () => {
                console.log("marker OK")
                this.moveMapCenter(this.state.centerLat, this.state.centerLng)
            })
        }
        return true
    }

    componentDidMount() {
        DaumMap.load(() => {
            // init location
            let lat = 37.555589
            let lng = 127.049051

            //지도 생성
            let map = new DaumMap.Map(document.getElementById('map'), {
                center: new DaumMap.LatLng(33.4863, 126.489),
                level: 3,
            });
            DaumMapApi.getAddress(lat, lng).then(result => {
                this.setState({
                    address: result,
                    centerLat: lat,
                    centerLng: lng,
                    map: map
                })
            })

            //이동시 지도 중앙 좌표와 동 갱신
            DaumMap.event.addListener(map, 'dragend', () => {
                let latlng = map.getCenter();

                DaumMapApi.getAddress(latlng.getLat(), latlng.getLng()).then(result => {
                    this.setState({
                        centerLat: latlng.getLat(),
                        centerLng: latlng.getLng(),
                        address: result
                    })
                })
            })
        })
    }

    moveMapCenter = (lat, lng) => {
        this.setState({
            centerLat: lat,
            centerLng: lng,
        }, () => {
            this.state.map.setCenter(new DaumMap.LatLng(lat, lng));
            DaumMapApi.getAddress(lat, lng).then(result => {
                this.setState({
                    address: result
                })
            })
        })
    }

    updateMapCenter = (data) => {
        this.moveMapCenter(data.lat, data.lng)
    };

    render() {
        Debugger.p(this, 'render')
        return (
            <div className="d-flex flex-column h-100">
                <div className="d-flex justify-content-center">
                    <div className="px-1">
                        <CoordForm updateMapCenter={this.updateMapCenter} />
                    </div>
                    <div className="px-1" id="currentpos">
                        현재 중심: {this.state.centerLat}, {this.state.centerLng} <br /> 주소: {this.state.address}
                    </div>
                </div>
                <div className="d-flex h-100">
                    <div className="w-100 h-100" id="map">지도 표시되는 공간</div>
                </div>
            </div>
        );
    }
}

export default MapProvider;