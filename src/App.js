import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { Component } from 'react';

import './App.css';

import MapProvider from "./MapProvider";
import DataMaster from "./DataMaster"

class App extends Component {

    state = {
        coordList: null
    }

    constructor(props) {
        super(props)
        this.handleMap = this.handleMap.bind(this)
        this.handleDataMaster = this.handleDataMaster.bind(this)
    }

    render() {
        return (
            <div className="d-flex flex-column app">            
                <DataMaster />                                
                <MapProvider coordList={this.state.coordList} />                                             
            
            </div>
        );
    }

    handleMap = () => {

    }

    handleDataMaster = (groups) => {
        this.setState({

        })
    }

    handleSql = (data) => {        
        this.setState({
            coordList: data.result
        });
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        return { coordList: prevState.coordList };
    }

    handleFile = (data) => {
        console.dir(data)
        console.dir(data.csv.data)
        this.setState({
            coordList: data.csv.data
        })
    }
}

export default App;