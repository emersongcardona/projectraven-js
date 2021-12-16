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
        this.topic = this._topic(topic);
        this.payload = this._payload(message);
        this.error = ""
    }


    // · 
    _topic(topic) {

        // return data extracted form the MQTT topic string
        // example: 
        //      :deviceid/:schema/:unitid
        //      raven-1001/data/T1
        topic = topic.split('/')

        // the topic must contain at least two parameters to be valid
        if (topic.length < 2) { return this.valid = false; }

        // deviceid and schema are mandatory
        if (topic[0] == '' || topic[1] == '') { return this.valid = false; }

        return { 
            device: topic[0],
            schema: topic[1],
            unitid: topic[2]
        }

    }


    // · 
    _payload(message) {

        if (this.topic.schema === 'data') { 
            return this._payloadData(message) 
        }

        this.valid = false
        this.error = "not_valid_payload"

    }


    // · 
    _payloadData(message) {

        let value = Number(message)

        if (value === NaN) {
            value = message.toString()
        }

        return {
            v: value,
            d: new Date()
        }

    }

}


// · 
module.exports = RavenRecord
