import React, {Component} from 'react';
import Papa from 'papaparse';

class FileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            fileName: ".CSV",
            csv: null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }

    onFormSubmit(e) {
        e.preventDefault() // Stop form submit
        let config = {
            delimiter: ",",	// auto-detect
            header: true
        }

        console.dir(this.state.file)
        let fileName = this.state.file.name
        Papa.parse(this.state.file, {
            complete: (results) => {
                console.log("Finished:", results.data);
                this.setState({
                    csv: results,
                    fileName: fileName
                })
                this.props.onCreate(this.state);
            }
        }, config);
        console.log(Papa.parse("37.14,128.11"))

        // this.fileUpload(this.state.file).then((response) => {
        //     console.log(response.data);
        // })
    }

    onChange(e) {
        this.setState({file: e.target.files[0], fileName: e.target.files[0].name})
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
                    <label htmlFor="file-upload" className="custom-file-upload w3-botton">
                        <i className="fa fa-cloud-upload"></i> <span>{this.state.fileName}</span>
                    </label>
                    <input id="file-upload" type="file"  onChange={this.onChange}/>
                    <button className='w3-button query' type="submit">Upload</button>
                </form>
            </div>
        )
    }
}

export default FileForm;