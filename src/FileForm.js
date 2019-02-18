import React, {Component} from 'react';
import Papa from 'papaparse';

class FileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            csv: null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }

    onFormSubmit(e) {
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
            console.log(Papa.parse("37.14,128.11"))
        }
        catch(e){
            alert("잘못된 파일 또는 파일이 없습니다.", e)
        }


        // this.fileUpload(this.state.file).then((response) => {
        //     console.log(response.data);
        // })
    }

    onChange(e) {
        try {
            this.setState({file: e.target.files[0], fileName: e.target.files[0].name})
        }
        catch (e) {
            console.log("업로드 취소")
            this.setState({fileName: undefined})
        }
    }

    fileUpload(file) {
        console.log(file);
        // const url = 'http://example.com/file-upload';
        // const formData = new FormData();
        // formData.append('file', file)
        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // }
        return "OK"
    }

    render() {
        return (
            <div className='w3-display-container'>
                <form onSubmit={this.onFormSubmit}>
                    <div className="custom-file">
                    <input type="file" className="custom-file-input" id="validatedCustomFile" required></input>
                    <label className="custom-file-label" for="validatedCustomFile">Choose file (csv) ...</label>
                    <div className="invalid-feedback">Example invalid custom file feedback</div>
                </div>
                </form>
            </div>
        )
    }
}

export default FileForm;

/*
<label htmlFor="file-upload" className="custom-file-upload w3-botton">
                        <i className="fa fa-cloud-upload"></i> <span>파일 업로드: {this.state.fileName}</span>
                    </label>
                    <input id="file-upload" type="file" placeholder="csv 파일 찾기" onChange={this.onChange}/>
                    <button className='w3-button query' type="submit">Upload</button>
                    */