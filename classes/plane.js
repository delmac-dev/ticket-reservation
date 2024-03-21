class PlaneList {
    static items = null;

    static populate(planes) {
        PlaneList.items = planes;
    }

    static get(name){
        PlaneList.items.forEach(plane => {
            if(plane.name === name) return plane;
        });
    }

    static getAll() {
        return PlaneList.items
    }
}