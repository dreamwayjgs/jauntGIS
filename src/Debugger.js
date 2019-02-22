import MapProvider from "./MapProvider";

class Debugger {
    static p(){
        // 찍고 싶은 모듈에 주석을 처리
        let caller = arguments[0].constructor.name
        switch(caller){
            case 'App':

            case 'DataMaster':
            case 'DataControl':
            case 'DataSource':     
            case 'FileForm':
            
            case 'MapProvider':
            case 'CoordForm':       
            return
        }
        let msg = {}
        for(let i = 1; i < arguments.length;i++){
            msg[i] = arguments[i]
        }                
    }
}

export default Debugger