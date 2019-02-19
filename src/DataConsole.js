import React, { Component } from 'react'
import DataSource from "./DataSource"
import DataControl from "./DataControl"

class DataConsole extends Component {
    state = {
        data: null,
        isVisiableDataSource: true,
        isVisiableDataControl: true,
        openPrompt: null,
        dataSources: []
    }    

    dataUpdate = (data) => {
        console.log("DataSource Now")
        console.dir(data)
        this.setState({
            dataSources: data
        })
    }

    openWithCsv = () => {                
        this.setState({
            isVisiableDataSource: true,
            openPrompt: 'csv'
        })
    }

    closeDataSource = () => {        
        this.setState({
            isVisiableDataSource: false,
            openPrompt: null
        })
    }

    closeDataControl = () => {        
        this.setState({
            isVisiableDataControl: false
        })
    }

    toggleDataSource = () => {       
        this.setState({
            isVisiableDataSource : !this.state.isVisiableDataSource,
            openPrompt: null
        })        
        console.log("토글DS", this.state.isVisiableDataSource)
    }
    
    toggleDataControl = () => {
        this.setState({
            isVisiableDataControl : !this.state.isVisiableDataControl
        })        
        console.log("토글DC", this.state.isVisiableDataControl)
    }

    render() {
        return (
            <div className="col dataConsole">                
                <div className="row">
                    <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light col">
                        <a className="navbar-brand" href="/">DataConsole</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <div className="navbar-nav">                                                                                                
                                <button className="btn btn-outline-primary mx-2" onClick={this.toggleDataControl}>Data Control</button>                               
                                <div className="btn-group mx-2">                                
                                    <button className="btn btn-outline-success" onClick={this.toggleDataSource}>Data Sources</button>                                                                
                                    <button className="btn btn-secondary" onClick={this.openWithCsv}>Upload CSV</button>                                
                                    <button className="btn btn-secondary" data-toggle="modal" data-target="#Sqlform">Connect SQL</button>           
                                </div>                                
                            </div>
                        </div>
                    </nav>
                </div>
                <DataSource 
                    onDataUpdate={this.dataUpdate} 
                    onClose={this.closeDataSource} 
                    isVisible={this.state.isVisiableDataSource} 
                    openPrompt={this.state.openPrompt} 
                    dataSources={this.state.dataSources} 
                />
                <DataControl 
                    onClose={this.closeDataControl}
                    isVisible={this.state.isVisiableDataControl}
                    dataSources={this.state.dataSoucres}
                />       
            </div>
        )
    }
}

export default DataConsole


/*<div className="nav-item">
                                    <a className="nav-link disabled" tabIndex="-1" aria-disabled="true">Disabled</a>
                                </div>
                                */