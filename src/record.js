"use strict"
/*
Lesli

Copyright (c) 2020, Lesli Technologies, S. A.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.

RavenParser - JavaScript data parser for ProjectRaven

Powered by https://www.lesli.tech
Building a better future, one line of code at a time.

@contact  <hello@lesli.tech>
@website  <https://lesli.tech>
@license  GPLv3 http://www.gnu.org/licenses/gpl-3.0.en.html

// · ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~
// · 
*/


// · 
class RavenRecord {


    // · 
    constructor(topic, message) {
        this.valid = true
        this.error = ""
        this.topic = ""
        this.meshid = ""
        this.device = ""
        this.payload = ""
        this._topic(topic);
        this._payload(message);
    }


    // · 
    _topic(topic) {

        try {

            // return data extracted from the MQTT topic string
            // example: 
            //      :meshid/:schema
            //      raven-1001/data

            topic = topic.split('/')

            // the topic must contain at least two parameters to be valid
            if (topic.length < 2) { return this.valid = false; }

            // deviceid and schema are mandatory
            if (topic[0] == '' || topic[1] == '') { return this.valid = false; }

            this.meshid = topic[0]
            this.topic = topic[1]
        } catch (error) {
            this.valid = false;

        }

    }


    // · 
    _payload(message) {

        try {
            message = JSON.parse(message.toString())
            // Get the device id
            this.device = message.id

            // if payload does not include deviceid
            // we attach the data to the main device
            if (!this.device) {
                this.device = this.meshid
                return this.valid = false;

            }

            delete (message.id)

            //
            if (this.topic === 'data') {
                this.payload = this._payloadData(message)
            }

            if (this.topic === 'event') {
                this.payload = this._payloadWarning(message)
            }

            if (this.topic === 'config') {
                this.payload = this._payloadParams(message)
            }
            return
        } catch (error) {
            return this.valid = false;
        }


        // //return
        // if (this.topic.schema === 'event') {
        //     return this._payloadWarning(message)
        // }

        // this.valid = false
        // this.error = "not_valid_payload"
        // return

    }


    // · parse payload as measurable data
    _payloadData(message) {

        var units = []

        for (let [u, v] of Object.entries(message)) {
            let value = Number(v)

            if (value === NaN) {
                value = v
            }
            units.push({
                u: u,                    // unitid   //col
                v: value,                // final value
                d: new Date()            // timestamp
            })

        }

        return units;

    }


    // · parse data for a log of warning events
    _payloadWarning(message) {
        var units = []
        const keyWord = Object.keys(message)
        //let [u, v] = 
        units.push({
            u: keyWord[0],
            v: message[keyWord[0]],
            d: new Date()
        })
        return units

    }

    // · parse data for a log of params events
    _payloadParams(message) {
        var units = []
        units.push({
            u: "parameters",
            ip: message.ip,
            name: message.name,
            tmin: message.tmin,
            tmax: message.tmax,
            hmin: message.hmin,
            hmax: message.hmax,
            clock: message.clock,
            start: message.start,
            finish: message.finish,
            always: message.always,
            precise: message.precise,
            d: new Date()
        })
        return units
    }

}



// · 
module.exports = RavenRecord
