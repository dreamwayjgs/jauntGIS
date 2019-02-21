import React, { Component } from 'react'
import Dock from 'react-dock'
import ContentEditable from 'react-contenteditable'
import LocationFix from './LocationFix'
import $ from 'jquery'

import Debugger from './Debugger'
/* TODO SQL 대응 */
//import SqlForm from "./SqlForm"

class DataControl extends Component {
    state = {                
        dataSources: this.props.dataSources,
        isFixUpdated: false,
        fixGroups: [],
        fixes: [],
        lastFixId: 0,        
    }

    closePanel = () => {               
        this.props.onClose(this.state)
    }

    toggleMarker = (evt) => {
        let row = $(evt.target).closest("tr")
        let id = parseInt($(row).attr("fixid"))
        console.log("이 마커를 바꿔요", row, id)
    }    

    handleChange = evt =>{        
        // 현재 객체 지정하려면 currentTarget
        let row = $(evt.currentTarget).closest("tr")
        let id = parseInt($(row).attr("fixid"))                
        if(/^[0-9A-F]{6}$/i.test(evt.target.value)){            
            this.setState({
                fixes: this.state.fixes.map(fix => {                    
                    if(fix.id === id){                        
                        fix.color = evt.target.value
                    }
                    return fix
                })
            }, () => {
                Debugger.p('fix color 업데이트', this.state.fixes)
                this.props.onUpdate(this.state.fixes)
            })            
        }
        // For #fff type hex : https://stackoverflow.com/questions/8027423/how-to-check-if-a-string-is-a-valid-hex-color-representation/8027444
        // var isOk  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test('#ac3')
    }

    /**
     * 재렌더링을 할거냐 말거냐를 정하는 부분이다
     * 리액트는 변한 부분만 렌더링 한다... 너무 렌더링을 막을 필요는 없다.
     */     
    shouldComponentUpdate(nextProps, nextState){        
        // 소스가 변경되었을 때
        Debugger.p(this, '클릭된 마커', this.props.focusFixId)
        if(this.props.focusFixId !== nextProps.focusFixId){            
            let id = nextProps.focusFixId
            console.log("포커스 변경", id, $(`#fixtable tr[fixid='${id}']`).html())
            console.log("스크롤링", $(`#fixtable tr[fixid='${id}']`).offset().top)
            $("#datacontrol").animate({
                scrollTop: $(`#fixtable tr[fixid='${id}']`).offset().top
            }, 2000)
        }
        if(this.props.isSrcUpdated) {        
            Debugger.p(this, 'fix updates!')    
            let fixGroups = nextProps.dataSources.map(LocationFix.srcToFixGroups)                   
            this.setState({
                fixGroups: fixGroups,
                lastFixId : fixGroups.map(fixGroup => fixGroup.length).reduce((sum, item) => sum+item),
                fixes: LocationFix.flattenFixGroups(fixGroups)                
            })
            this.props.onUpdate(LocationFix.flattenFixGroups(fixGroups))
            return true
        }        
        return true
    }     

    render() {
        Debugger.p(this, 'render')
        const table = this.state.fixes.map((fix, id) => {
            return (
                <tr key={id} fixid={id} scope='row'>
                    <td>{fix.srcId}</td>
                    <td>{fix.deviceId}</td>
                    <td>{fix.id}</td>
                    <td>{fix.lat}</td>
                    <td>{fix.lng}</td>
                    <td>{fix.fixtime}</td>
                    <td>{fix.servertime}</td>
                    <td style={{backgroundColor:'#'+fix.color}}>
                        <ContentEditable                            
                        html={fix.color}
                        disabled={false}
                        onChange={this.handleChange} 
                        className={`fixid${fix.id}`}
                        />
                    </td>
                    <td className='w-15'>
                        <div className='btn-group'>
                        <button onClick={this.toggleMarker} className='btn btn-secondary'>Show/Hide</button>
                        <button className='btn btn-secondary'>Fn2</button>
                        <button className='btn btn-secondary'>Fn3</button>
                        </div>
                    </td>
                </tr>
            )
        })
        return (           
            <Dock id="datacontrol" position='bottom' zIndex={1101} dimMode='none' isVisible={this.props.isVisible}>   
                <div className="container-fluid">                    
                    <div className="row mt-2">
                        <div className="col">
                            <button className="btn btn-danger"onClick={this.closePanel}> Close </button>      
                        </div>
                        <div className="col d-flex align-items-center">
                            <h5>Data Control</h5>
                        </div>                        
                        <div className="col-3 d-flex justify-content-end mr-1">              
                            <div className="input-group">
                                <input type='number' className='form-control' placeholder="Max # of Points (100)" />
                                <div className='input-group-append'>
                                    <button className="btn btn-outline-success"> Reset (예정.. 새로고침하세요) </button>     
                                    <button className="btn btn-outline-primary"> Fn2 </button>     
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <table id="fixtable" className="table table-sm">
                        <thead>
                            <tr>
                                <th scope='col' className='w-10'>Source ID</th>
                                <th scope='col' className='w-11'>Device ID</th>
                                <th scope='col' className='w-10'>id</th>
                                <th scope='col' className='w-10'>lat</th>
                                <th scope='col' className='w-10'>lng</th>
                                <th scope='col' className='w-14'>fixtime</th>
                                <th scope='col' className='w-14'>servertime</th>
                                <th scope='col' className='w-10'>color</th>
                                <th scope='col' className='w-10'>show/hide</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {table}                           
                        </tbody>
                        </table>
                    </div>
                </div>                             
            </Dock>
        )
    }
}

export default DataControl
