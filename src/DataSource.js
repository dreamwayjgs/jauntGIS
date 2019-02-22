import React, { Component } from 'react'
import $ from 'jquery'
import Dock from 'react-dock'
import RandomColor from 'randomcolor'
import FileForm from './FileForm'
import DataSrc from './DataSrc'

import Debugger from './Debugger'

/* TODO SQL 대응 */
//import SqlForm from "./SqlForm"

class DataSource extends Component {
    state = {
        dataSources: [],
        dataSrcId: 0
    }

    closePanel = () => {
        this.props.onClose(this.state)
    }

    handleFile = (data) => {
        console.log(data)        
        let datasrc = new DataSrc(
            this.state.dataSrcId,
            data.file.name, 
            'csv', RandomColor({ seed: data.file.name }).replace("#", ""), 
            data.csv.data, 
            data.csv.meta.fields)
        this.setState((state) => ({
            dataSrcId: state.dataSrcId + 1,
            dataSources: state.dataSources.concat(datasrc)
        }))        
        this.props.onDataUpdate(this.state)
    }

    removeDataSrc = (e) => {        
        let row = e.target.parentNode.parentNode                
        // get current position of datasrc in dataSources
        let id = parseInt($(row).attr("datasrcid"))        

        this.setState({
            dataSources: this.state.dataSources.filter(datasrc => datasrc.id !== id)
        }, () => {
            if(this.state.dataSources.length == 0){
                this.setState({
                    dataSrcId: 0
                })
            }
        })
        Debugger.p(this, 'src removed')
        this.props.onDataUpdate(this.state)
    }

    componentDidUpdate(prevProps, prevState) {
        Debugger.p(this, 'render after')
        // DataMaster Upload CSV clicked                
    }    
    shouldComponentUpdate(nextProps, nextState){
        Debugger.p(this, 'beforeUpdate', this.props, nextProps, this.state, nextState)
        if(this.props.isSrcUpdated){
            return true
        }
        switch (nextProps.promptType){
            case 'csv':
                $("#fileform").modal('show')
                break
            case 'sql':
                break
            case 'api':
                break
        }
        
        if(this.props.isVisible === nextProps.isVisible){
            return false
        } 
        return true
    }

    render() {       
        Debugger.p(this, 'render') 
        const list = this.state.dataSources.map((datasrc) => {            
            return (<tr key={datasrc.id} datasrcid={datasrc.id}>
            <th scope="row">{datasrc.id}</th>
            <td>{datasrc.name}</td>
            <td>{datasrc.type}</td>
            <td style={{backgroundColor:'#'+datasrc.color}}>{datasrc.color}</td>
            <td>{datasrc.positions.length}</td>
            <td><button className="btn btn-danger" onClick={this.removeDataSrc}>Remove</button></td>
        </tr>)})

        return (            
            <Dock position='right' zIndex={1100} dimMode='none' isVisible={this.props.isVisible}>
                <div className="container-fluid m-2">
                    <div className="row my-2">
                        <div className="col d-flex align-items-center">
                            <button className="btn btn-danger" onClick={this.closePanel}> Close </button>
                        </div>
                        <div className="col d-flex align-items-center">
                            <h5>Data Sources</h5>
                        </div>
                        <div className="d-flex col justify-content-end">
                        <div className="btn-group">
                            <button className="btn btn-success" data-toggle="modal" data-target="#fileform"> CSV </button>
                            <button className="btn btn-primary" > SQL </button>
                            <button className="btn btn-info" > API </button>
                        </div>
                        </div>
                    </div>
                    <div className="row my-2">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope='col'>id</th>
                                    <th scope='col'>name</th>
                                    <th scope='col'>type</th>
                                    <th scope='col'>color</th>
                                    <th scope='col'>positions</th>
                                    <th scope='col'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {list}
                            </tbody>
                        </table>
                    </div>
                </div>
                <FileForm onCreate={this.handleFile} />
            </Dock>
        )
    }
}

export default DataSource
