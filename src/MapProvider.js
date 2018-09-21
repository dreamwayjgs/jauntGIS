import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import CoordForm from "./CoordForm";

const DaumMap = window.daum.maps;

class MapProvider extends Component {
    state = {
        centerLat: 0,
        centerLng: 0,
        address: '',
        map: null
    }

    componentDidMount() {
        let el = document.getElementById('map');

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
            <div>
                <div className='w3-bar w3-card w3-white w3-container w3-border-bottom' id='map-dashboard'>
                    <div className='w3-bar-item w3-padding'>현재
                        중심: {this.state.centerLat}, {this.state.centerLng} <br /> 주소: {this.state.address}</div>
                    <CoordForm className='w3-right'
                               onCreate={this.handleCreate}
                    />
                </div>
                <div id="map">지도 표시되는 공간</div>
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