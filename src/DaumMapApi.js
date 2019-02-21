const DaumMap = window.daum.maps;


class DaumMapApi {
    static async getAddress(lat, lng) {
        let result = await this.coord2AddressDaum(lat, lng);
        return result;
    }

    static coord2AddressDaum(lat, lng) {
        return new Promise(resolve => {
            let geocoder = new DaumMap.services.Geocoder();
            geocoder.coord2Address(lng, lat, (result, status) => {
                if (status === DaumMap.services.Status.OK) {
                    resolve(result[0].address.address_name);
                }
                resolve("해당 위치 주소 없음")
            })
        })
    }

    get markerImage() {
        let icon = new DaumMap.MarkerImage(
            'http://localimg.daum-img.net/localimages/07/2009/map/icon/blog_icon01_on.png',
            new DaumMap.Size(31, 35),
            {
                offset: new DaumMap.Point(16, 34),
                alt: "마커 이미지 예제",
                shape: "poly",
                coords: "1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33"
            }
        )
        return icon
    }
}

export default DaumMapApi;