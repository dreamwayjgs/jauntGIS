async function getAddress(lat, lng) {
    let result = await coord2AddressDaum(lat, lng);
    return result;
}

function coord2AddressDaum(lat, lng) {
    return new Promise(resolve => {
        let geocoder = new DaumMap.services.Geocoder();
        geocoder.coord2Address(lng, lat, (result, status) => {
            if (status === DaumMap.services.Status.OK) {
                resolve(result[0].address.address_name);
            }
        })
    })
}

export default DaumMapAPIs;