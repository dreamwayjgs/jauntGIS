import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { Component } from 'react';

import './App.css';

import MapProvider from "./MapProvider";
import DataConsole from "./DataConsole"

class App extends Component {

    state = {
        coordList: null
    }

    constructor(props) {
        super(props)
        this.handleMap = this.handleMap.bind(this)
        this.handleDataConsole = this.handleDataConsole.bind(this)
    }

    render() {
        return (
            <div className="app">
            <div className="">
                    <DataConsole />
                </div>
            <div className="">                
                <MapProvider coordList={this.state.coordList} />                
            </div>                
                
            </div>
        );
    }

    handleMap = () => {

    }

    handleDataConsole = (groups) => {
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