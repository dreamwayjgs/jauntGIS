import React, { Component } from 'react'
import DataSource from "./DataSource"
import DataControl from "./DataControl"

import Debugger from './Debugger'


class DataMaster extends Component {
    state = {
        data: null,
        isVisiableDataSource: true,
        isVisiableDataControl: true,
        promptType: null,        
        dataSources: [],
        isSrcUpdated: false,
        fixes: this.props.fixes,
        focusFixId: this.props.focusFixId
    }        

    componentDidUpdate(prevProps, prevState){
        // Reset UI Properties
        if(this.state.promptType === 'csv'){
            this.setState({
                promptType: null
            })
        }

        if(this.state.isSrcUpdated){
            Debugger.p(this, '업뎃 트랜잭션 종료')
            this.setState({
                isSrcUpdated: false
            })
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        Debugger.p(this, 'beforeUpdate/sourceupdated?', this.state, nextState)        
        return true
    }

    closeDataControl = () => {        
        this.setState({
            isVisiableDataControl: false
        })
    }
    
    toggleDataControl = () => {
        this.setState({
            isVisiableDataControl : !this.state.isVisiableDataControl
        }, () => {console.log("토글DC", this.state.isVisiableDataControl)})        
        
    } 

    updateFixes = (fixes) => {
        Debugger.p(this, 'updated fixes', fixes)
        this.setState({
            fixes: fixes
        })
        this.props.updateFixes(fixes)
    }

    // Data Source Control    
    openWithCsv = () => {                
        this.setState({
            isVisiableDataSource: true,
            promptType: 'csv'
        })
    }

    closeDataSource = () => {        
        this.setState({
            isVisiableDataSource: false,
            promptType: null
        })
    }

    toggleDataSource = () => {       
        Debugger.p(this, 'toggle')
        this.setState({
            isVisiableDataSource : !this.state.isVisiableDataSource,
            promptType: null
        })                
    }   
    
    dataUpdate = (data) => {    
        Debugger.p(this,'src list change')    
        this.setState({
            dataSources: data.dataSources,
            isSrcUpdated: true
        })
    }

    render() {
        Debugger.p(this, 'render')
        return (
            <div className="dataMaster">                
                <div className="d-flex justify-content-starts">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light col">
                        <a className="navbar-brand" href="/">DataMaster</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <div className="navbar-nav">                                                                                                
                                <button className="btn btn-outline-primary mx-2" onClick={this.toggleDataControl}>Data Control</button>                               
                                <div className="btn-group mx-2">                                
                                    <button className="btn btn-outline-success" onClick={this.toggleDataSource}>Data Sources</button>                                                                
                                    <button className="btn btn-secondary" onClick={this.openWithCsv}>Upload CSV</button>                                
                                    <button className="btn btn-secondary" >Connect SQL</button>           
                                    <button className="btn btn-secondary" >Traccar API</button>           
                                </div>                                
                            </div>
                        </div>
                    </nav>
                </div>
                <DataSource 
                    onDataUpdate={this.dataUpdate} 
                    onClose={this.closeDataSource} 
                    isVisible={this.state.isVisiableDataSource} 
                    promptType={this.state.promptType} 
                    dataSources={this.state.dataSources} 
                    isSrcUpdated={this.state.isSrcUpdated}
                />
                <DataControl 
                    onClose={this.closeDataControl}
                    onUpdate={this.updateFixes}
                    isVisible={this.state.isVisiableDataControl}
                    dataSources={this.state.dataSources}
                    isSrcUpdated={this.state.isSrcUpdated}
                    focusFixId={this.props.focusFixId}
                />       
            </div>
        )
    }
}

export default DataMaster