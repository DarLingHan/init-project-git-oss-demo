const axios = require('axios');

module.exports = {
    post (url, params) {
        return axios({
            method: 'post',
            url,
            data: params,
            dataType: JSON,
            headers: {}
        })
    },
    get (url) {
        return axios({
            url,
            headers: {}
        })
    }
}