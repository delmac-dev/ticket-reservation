class AirlineList {
    static items = null;

    static populate(planes) {
        AirlineList.items = planes;
    }

    static get(name){
        let foundPlane = null;
        AirlineList.items.forEach(plane => {
            if(plane.name === name) foundPlane  = plane;
        });

        return foundPlane;
    }

    static getAll() {
        return AirlineList.items;
    }
}

export default AirlineList;