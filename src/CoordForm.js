import React, {Component} from 'react';

class CoordForm extends Component {
    state = {
        lat: '',
        lng: ''
    }
    handleChange = (e) => {
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
            <div className='w3-right w3-hide-small w3-border-left'>
            <form onSubmit={this.handleSubmit}>
                <input className='w3-input coord'
                    placeholder="위도"
                    value={this.state.lat}
                    onChange={this.handleChange}
                    name="lat"
                />
                <input className="w3-input coord"
                    placeholder="경도"
                    value={this.state.lng}
                    onChange={this.handleChange}
                    name="lng"
                />
                <button className="w3-button w3-black w3-section" type="submit">이동</button>
            </form>
            </div>
        );
    }
}

export default CoordForm;