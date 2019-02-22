import React, {Component} from 'react';
import Papa from 'papaparse';

import Debugger from './Debugger'

class FileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            csv: null,
            fileName: "Choose Files"
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }

    onFormSubmit(e) {
        /* TODO
        여러 파일 처리 가능하게
         */
        e.preventDefault() // Stop form submit

        try {
            console.dir(this.state.file)
            let fileName = this.state.file.name
            let config = {
                delimiter: ",",	// auto-detect
                header: true,
                complete: (results) => {
                    console.log("Finished:", results.data);
                    this.setState({
                        csv: results,
                        fileName: fileName
                    })
                    this.props.onCreate(this.state);
                }
            }
            Papa.parse(this.state.file, config);            
        }
        catch(e){
            alert("잘못된 파일 또는 파일이 없습니다.", e)
        }
    }

    /**
     * 
     */
    onChange(e) {
        /* TODO
        여러 파일 처리 가능하게, input 에 multiple 속성 만들것
         */
        try {
            this.setState({file: e.target.files[0], fileName: e.target.files[0].name})
        }
        catch (e) {
            console.log("업로드 취소")
            this.setState({fileName: "Choose File"})
        }
    }

    /**
     * 
     * @param {*} file user uploaded file
     * 파일을 서버에 저장하는 함수
     */
    fileUpload(file) {
        console.log(file);        
        return -1
    }

    render() {
        Debugger.p(this, 'render')
        return (
            <div className="modal" id="fileform" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">CSV 파일 업로드</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body uploader">                                            
                    Available Headers (deviceid, lat, lng, timestamp)                    
                    <form className="form-inline" onSubmit={this.onFormSubmit}>
                        <div className="input-group container-fluid w-100">
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="csvFile" onChange={this.onChange} />
                                <label className="custom-file-label d-flex justify-content-center" htmlFor="csvFile">{this.state.fileName}</label>
                            </div>
                            <div className="input-group-append">
                                <button className="btn btn-outline-primary" type="submit">Upload</button>
                            </div>
                        </div>
                    </form>
                    </div>                    
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Done</button>                        
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FileForm;