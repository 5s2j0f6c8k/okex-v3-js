import fetch from 'node-fetch';

export default class{

    constructor(url){
        this.url = url
    }

    async getOkexTime(){
        return await fetch(`${this.url}/api/general/v3/time`)
    }
}