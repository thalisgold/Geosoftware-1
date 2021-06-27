/**
 * Stores a class for geographic coordinates
 * @author Fabian Schumacher
 * @since 1.4.0
 * 
 */
/**
 * @class 
 * These class saves geographic coordinates.
 */
 class Coordinate {

    /**
     * Creates an Coordinate object with arguments latitude an longitude.
     * @param {number} latitude The Latitude as a number.
     * @param {number} longitude The Longitude as a number.
     * 
     */
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    /**
     * Getter-Function
     * @returns The Latitude
     */
    getLatitude() {
        return this.latitude;
    }


    /**
     * Getter-Function
     * @returns The Longitude
     */
    getLongitude() {
        return this.longitude;
    }


    /**
     * Getter-Function
     * @returns Coordinate as an Array in form [Lat,Long]
     */
    asArrayLatLong() {
        return [this.latitude, this.longitude];
    }


    /**
     * Getter-Function
     * @returns Coordinate as an Array in form [Long,Lat]
     */
    asArrayLongLat() {
        return [this.longitude, this.latitude];
    }

    /**
     * Creates an String represantation from the coordinate.
     * @returns represantation of the coordinate
     */
    toString() {
        return "Lat: " + this.latitude + ", Long: " + this.longitude;
    }
}