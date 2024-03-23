class AirlineList {
    static items = null;

    static populate(planes) {
        AirlineList.items = planes;
    }

    static get(airline){
        let foundPlane = null;
        AirlineList.items.forEach(plane => {
            if(plane.airline === airline) foundPlane  = plane;
        });

        return foundPlane;
    }

    static getAll() {
        return AirlineList.items;
    }
}

export default AirlineList;