import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './App.css';

import MapProvider from "./MapProvider";
import FileForm from "./FileForm";
import SqlForm from "./SqlForm"

class App extends Component {

    state = {
        coordList: null
    }

    constructor(props) {
        super(props)
        this.handleFile = this.handleFile.bind(this)
        this.handleMap = this.handleMap.bind(this)
        this.handleSql = this.handleSql.bind(this)
    }

    render() {
        return (
            <div className="container-fluid">
                <MapProvider coordList={this.state.coordList} />

            </div>
        );
    }

    handleMap = () => {

    };

    handleSql = (data) => {
        console.log("on APPjs", data.result);
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

/*
                <div className='w3-bar-item w3-border-left sql' id='upload-console-sql'>SQL 쿼리로 받아오기
                    <SqlForm
                    onCreate={this.handleSql} />
            </div>
            */