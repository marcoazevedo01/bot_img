const axios = require('axios');

exports.getImage = async (url) => {
    try {
        const returnReq = await axios({
            url,
            responseType: 'arraybuffer',
        })
        return returnReq.data;

    } catch (error) {
        return false;
    }
}
