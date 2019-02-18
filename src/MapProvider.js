/* global daum */

import React, {Component} from 'react';
import CoordForm from "./CoordForm";

const DaumMap = window.daum.maps;

class MapProvider extends Component {

    state = {
        centerLat: 0,
        centerLng: 0,
        address: '',
        map: null,
        coordList: this.props.coordList,
        markers: [] //marker elements
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let coords = []
        let markers = []

        console.log("Current Markers", nextProps.markers, "/", prevState.markers)

        // 새 코드 업로드 -- 디폴트: 기존 마커 전부 삭제
        if (nextProps.coordList !== null) {
            //기존 마커 삭제
            for (let i in prevState.markers){
                prevState.markers[i].setMap(null)
            }

            //새 코드 리스트
            Object.keys(nextProps.coordList).map((k) => {
                coords.push(nextProps.coordList[k]);
                let marker = new DaumMap.Marker({
                    position: new DaumMap.LatLng(nextProps.coordList[k]['lat'], nextProps.coordList[k]['lng'])
                });
                marker.setMap(prevState.map);
                markers.push(marker);
            });

        }

        return {
            coordList: nextProps.coordList,
            markers: markers
        };
    }

    componentDidMount() {
        DaumMap.load(() => {
            console.log("새로 그립니다");
            let el = document.getElementById('map');
            console.log("지금의 맵코드", this.props.coordList);

            let initlatlng = new DaumMap.LatLng(37.5568932, 127.04465341)

            this.setState({
                centerLat: initlatlng.getLat(),
                centerLng: initlatlng.getLng(),
            });

            getAddress(this.state.centerLat, this.state.centerLng).then(result => {
                this.setState({
                    address: result
                })
            })
            //지도 생성
            let map = new DaumMap.Map(el, {
                center: initlatlng,
                level: 3
            });

            this.setState({
                map: map
            });

            //이동시 지도 중앙 좌표와 동 갱신
            DaumMap.event.addListener(map, 'dragend', () => {
                let latlng = map.getCenter();
                this.setState({
                    centerLat: latlng.getLat(),
                    centerLng: latlng.getLng()
                });

                getAddress(this.state.centerLat, this.state.centerLng).then(result => {
                    this.setState({
                        address: result
                    })
                })
            })
        })
    }

    handleCreate = (data) => {
        this.setState({
            centerLat: data.lat,
            centerLng: data.lng
        });

        getAddress(this.state.centerLat, this.state.centerLng).then(result => {
            this.setState({
                address: result
            })
        })

        this.state.map.setCenter(new DaumMap.LatLng(data.lat, data.lng));

    };

    render() {
        return (                                        
            <div className="col">                
                <div className="row">
                    <div className="col">
                        <CoordForm onCreate={this.handleCreate} />
                    </div>                                
                    <div className="col" id="currentpos">
                        현재 중심: {this.state.centerLat}, {this.state.centerLng} <br/> 주소: {this.state.address}
                    </div>
                </div>                       
                <div className="row map-wrapper">                                
                    <div className="col" id="map">지도 표시되는 공간</div>            
                </div>            
            </div>
        );
    }
}

async function getAddress(lat, lng) {
    let result = await coord2AddressDaum(lat, lng);
    return result;
}

function coord2AddressDaum(lat, lng) {
    return new Promise(resolve => {
        let geocoder = new DaumMap.services.Geocoder();
        geocoder.coord2Address(lng, lat, (result, status) => {
            if (status === DaumMap.services.Status.OK) {
                resolve(result[0].address.address_name);
            }
        })
    })
}

export default MapProvider;

/*
<div className='w3-bar w3-card w3-white w3-container w3-border-bottom' id='map-dashboard'>
                    <div className='w3-bar-item w3-padding'>현재
                        중심: {this.state.centerLat}, {this.state.centerLng} <br/> 주소: {this.state.address}</div>
                    <CoordForm className='w3-right'
                               onCreate={this.handleCreate}
                    />
                </div>
                */