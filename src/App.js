import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { Component } from 'react';

import './App.css';
import Debugger from './Debugger'

import MapProvider from "./MapProvider";
import DataMaster from "./DataMaster"

class App extends Component {
    
    state = {
        fixes: [],
        isFixUpdated: false,
        focusFixId: 0
    }

    componentDidUpdate(){
        Debugger.p(this, 'after render')

        if(this.state.isFixUpdated){
            Debugger.p(this, '업뎃 트랜잭션 종료')
            this.setState({
                isFixUpdated: false
            })
        }
    }

    updateFixes = (data) => {        
        Debugger.p(this, 'get updated fixes:', data)
        this.setState({
            fixes: data,
            isFixUpdated: true
        })
    }

    focusFix = (fixId) =>{
        console.log("이마커가 찍힘", fixId)
        this.setState({
            focusFixId: fixId
        })
    }

    render() {        
        Debugger.p(this, 'render')
        return (
            <div className="d-flex flex-column app">            
                <DataMaster
                    fixes={this.state.fixes} 
                    updateFixes={this.updateFixes} 
                    focusFixId={this.state.focusFixId} />                                
                <MapProvider 
                    fixes={this.state.fixes} 
                    isFixUpdated={this.state.isFixUpdated} 
                    onFocus={this.focusFix} />
            </div>
        );
    }
}

export default App;