const DaumMap = window.daum.maps

const MAX_FIX = 100

class LocationFix {
    constructor(srcId, deviceId, id, lat, lng, fixtime, servertime, color, ref) {
        this.srcId = srcId
        this.deviceId = deviceId
        this.id = id
        this.lat = parseFloat(lat)
        this.lng = parseFloat(lng)
        this.fixtime = fixtime ? fixtime : ("NaT")
        this.servertime = servertime ? servertime : this.fixtime        
        this.color = color
    }    
    daumMarker(map){
        let marker = new DaumMap.Marker({            
            map: map,
            clickable: true,
            position: new DaumMap.LatLng(this.lat, this.lng),                     
            image: new DaumMap.MarkerImage(
                //'http://localimg.daum-img.net/localimages/07/2009/map/icon/blog_icon01_on.png',
                "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + this.color,
                new DaumMap.Size(31, 35),
                {
                    offset: new DaumMap.Point(16, 34),
                    alt: "Source: " + this.srcId,
                    shape: "poly",
                    coords: "1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33"
                }
            )  
        })
        return marker
    }
    static srcToFixGroups(dataSrc){
        /* 소스 당 동일한 공통 파라미터 */
        let srcId = dataSrc.id
        let defaultColor = dataSrc.color    
        let limit = MAX_FIX

        // 모든 점을 파싱할 때
        // let fixGroup = []
        // fixGroup = fixGroup.concat(dataSrc.positions.map((pos, index) => {
        //     pos.deviceId = pos.deviceId ? pos.deviceId : srcId
        //     pos.id = pos.id ? pos.id : index
        //     return new LocationFix(srcId, pos.deviceId, pos.id, pos.lat, pos.lng, pos.fixtime, pos.servertime, defaultColor)
        // }))            
        //return fixGroup

        // 최대 제한 파싱 지점
        let limitFixGroup = []
        dataSrc.positions.some((pos, index) => {          
            pos.deviceId = pos.deviceId ? pos.deviceId : srcId
            pos.id = pos.id ? pos.id : index
            let fix = new LocationFix(srcId, pos.deviceId, pos.id, pos.lat, pos.lng, pos.fixtime, pos.servertime, defaultColor)
            limitFixGroup.push(fix)            
            console.log(index, limit)
            return index === (limit - 1)
        })
        
        return limitFixGroup
    }
    static flattenFixGroups(fixGroups){
        let fixes = []
        fixGroups.forEach(group => {        
            fixes = fixes.concat(group)                        
        })        
        return fixes
    }
}

export default LocationFix
