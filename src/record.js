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

            delete(message.id)

            //
            if (this.topic === 'data') { 
                this.payload = this._payloadData(message) 
            }

        } catch (error) {
            return this.valid = false;   
        }

        return 

        if (this.topic.schema === 'warning') {
            return this._payloadWarning(message)
        }

        this.valid = false
        this.error = "not_valid_payload"

    }


    // · parse payload as measurable data
    _payloadData(message) {

        var units = []

        for (let [u,v] of Object.entries(message)) {

            let value = Number(v)

            if (value === NaN) {
                value = v
            }

            units.push({
                u:u,                    // unitid
                v:value,                // final value
                d:new Date()            // timestamp
            })

        }

        return units;

    }


    // · parse data for a log of warning events
    _payloadWarning(message) {

        // for this escenario we received the alert code within the payload 
        this.topic.unitid = message.toString()
        return new Date()

    }

}



// · 
module.exports = RavenRecord
