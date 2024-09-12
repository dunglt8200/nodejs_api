class ThongKeModel {
    constructor(id, name, total) {
        this.id = id;
        this.name = name;
        this.total = total;
    }

    // Method to format the response for the frontend
    toResponse() {
        return {
            id: this.id,
            name: this.name,
            total: this.total
        };
    }
}

module.exports = ThongKeModel;
