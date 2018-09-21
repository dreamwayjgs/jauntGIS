import React, {Component} from 'react';
import axios, {post} from 'axios';

class SqlForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sql: null,
            result: null
        }
    }

    onFormSubmit(e) {
        e.preventDefault() // Stop form submit
        console.log("DOING")
        let traccarServer = 'http://127.0.0.1:8000/api/posdb/'
        axios.get(traccarServer).then(response => {
            console.log("in comp:", response.data['positions']);
            this.setState({
                result: response.data['positions']
            })
            this.props.onCreate(this.state);
        });
    }

    onChange(e) {
        this.setState({sql: e.target.value})
    }

    render() {
        return (
            <div className='w3-wide w3-display-container query'>
                <form onSubmit={this.onFormSubmit}>
                    <span>SQL</span>
                    <input className='w3-input' type="text" name="sql" onChange={this.onChange}/>
                    <button className='w3-button' type="submit">Query</button>
                </form>
            </div>
        )
    }
}

export default SqlForm;