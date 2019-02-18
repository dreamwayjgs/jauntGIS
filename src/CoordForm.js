import React, {Component} from 'react';

class CoordForm extends Component {
    state = {
        lat: '',
        lng: ''
    }
    handleChange = (e) => {
        /* TODO
        위도 쪽에 comma 를 감지해서 해당 경우에는 자동으로 lat, lng을 보내는 기능
         */

        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        // 페이지 리로딩 방지
        e.preventDefault();
        // 상태값을 onCreate 를 통하여 부모에게 전달
        this.props.onCreate(this.state);

    }

    render() {
        return (
            <div className="float-right">
            <form onSubmit={this.handleSubmit}>
                <div className="form-row align-items-center">
                    <div className="col-auto">
                    <label className="sr-only" htmlFor="inlineFormInput">Latitude</label>
                    <input type="text" className="form-control mb-2 coord" id="inlineFormInput" placeholder="Latitude" value={this.state.lat}
                    onChange={this.handleChange}
                    name="lat" />
                    </div>
                    <div className="col-auto">
                    <label className="sr-only" htmlFor="inlineFormInput">Latitude</label>
                    <input type="text" className="form-control mb-2 coord" id="inlineFormInput" placeholder="Longitude" value={this.state.lng}
                    onChange={this.handleChange}
                    name="lng" />
                    </div>                    
                    <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-2">Go</button>
                    </div>
                </div>
            </form>
            </div>
        );
    }
}

export default CoordForm;