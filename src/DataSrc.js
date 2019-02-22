class DataSrc {
    constructor(id, name, type, color, positions, fields) {
        this.id = id
        this.name = name
        this.type = type
        this.color = color
        this.positions = positions
        this.fields = fields
    }
    get html() {
        return this.toHtmlString()
    }
    toHtmlString() {
        let str = `<tr>
        <td>${this.id}</td>
        <td>${this.name}</td>
        <td>${this.type}</td>
        <td>${this.color}</td>        
        </tr>`
        return str
    }
}

export default DataSrc
