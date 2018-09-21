import React, {Component} from 'react';
import './App.css';
import FileForm from "./FileForm";
import MapProvider from "./MapProvider"
import SqlForm from "./SqlForm"

class App extends Component {
    render() {
        return (
            <div className="w3-top">
                <header className="w3-bar w3-wide w3-padding w3-black w3-card">
                    <div href="/" className="w3-bar-item w3-button">
                        <h1 className="App-title">Welcome to CSSC@Hanyang Home!</h1></div>
                </header>
                <nav className='w3-bar w3-wide w3-padding w3-card w3-white w3-display-container components'>
                    <div className='w3-bar-item w3-display-top-left w3-white' id="upload-console-title"><h3>데이터 업로드</h3>
                    </div>
                    <div className='w3-bar-item w3-border-left' id='upload-console-csv'>csv 업로드<FileForm
                        onCreate={this.handleCreate}/>
                    </div>
                    <div className='w3-bar-item w3-border-left sql' id='upload-console-sql'>SQL 쿼리로 받아오기<SqlForm
                        onCreate={this.handleSql}/></div>
                </nav>
                <MapProvider/>

            </div>
        );
    }

    handleSql = (data) => {
        console.log(data);
    };


    handleCreate = (data) => {
        console.dir(data.csv.data)
        console.log(data.csv.data[0][0])
        console.log(data.csv.data[0]['lat'])
    }

}

export default App;