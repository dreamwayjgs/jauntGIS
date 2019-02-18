import React, {Component} from 'react'
import FileForm from "./FileForm"
/* TODO SQL 대응 */
//import SqlForm from "./SqlForm"


class DataConsole extends Component {
    state = {
        data: null
    }
    
    handleFile = () => {
       
    }

    render () {
        return (
            <div className="col">
            <nav className="navbar navbar-expand-lg fixed-bottom navbar-light bg-light">
                <a className="navbar-brand" href="#">DataConsole</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#" data-toggle="modal"  data-target="#fileform">Upload CSV</a>                    
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Features</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Pricing</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
                    </li>
                    </ul>
                </div>
            </nav>
            <FileForm />
            </div>
        )
    }    
}

export default DataConsole