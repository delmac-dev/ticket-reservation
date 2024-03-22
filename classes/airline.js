class AirlineList {
    static items = null;

    static populate(planes) {
        AirlineList.items = planes;
    }

    static get(name){
        AirlineList.items.forEach(plane => {
            if(plane.name === name) return plane;
        });
    }

    static getAll() {
        return AirlineList.items;
    }
}

export default AirlineList;