class Subject {
    private _name: any;
    constructor(name) {
        this.name = name;
    }
    get name() {
        return this.name;
    }
    set name(value) {
        this._name = value;
    }
}

export default Subject;