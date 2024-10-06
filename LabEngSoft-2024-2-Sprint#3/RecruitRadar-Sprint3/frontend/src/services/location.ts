import axios from "axios";

export const API_KEY = 'AIzaSyAY29bRdTYObjae7dMm4xo5uBSMiItmHOI';

async function getLocationInfo(cep: string) {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY}&address=${cep}`);
    console.log(response.data.results[0].geometry.location.lat + '' + response.data.results[0].geometry.location.lng);
    console.log(response.data.results[0].formatted_address);

    return {
        address: response.data.results[0].formatted_address,
        city: response.data.results[0].address_components[3].long_name,
        state: response.data.results[0].address_components[4].short_name,
        postal_code: response.data.results[0].address_components[0].short_name
    };
}


export default getLocationInfo;

