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

RavenParser-JS - JavaScript data parser for ProjectRaven

Powered by https://www.lesli.tech
Building a better future, one line of code at a time.

@license  GPLv3 http://www.gnu.org/licenses/gpl-3.0.en.html
@version  0.1.0-alpha

// · ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~
// · 
*/


// · 
const { expect } = require("chai")


// · 
let { record: RavenRecord } = require("../index")


describe("RavenRecord", () => {

    before(function(){
        this.ravenRecord = new RavenRecord("raven-1001/data/T1", 1)
    })

    it("is expected to be an instance of RavenRecord", function(){
        expect(this.ravenRecord).to.be.an.instanceof(RavenRecord);
    }) 

    it("is expected that the instance has all the keys", function(){
        expect(this.ravenRecord).to.have.keys(["valid", "topic", "payload", "error"]);
    })

    it("is expected that the raven record is valid", function(){
        expect(this.ravenRecord.valid).to.equal(true)
    })

    it("is expected that the raven record has the full topic structure", function(){
        expect(this.ravenRecord.topic).to.have.keys(["device", "schema", "unitid"])

        expect(this.ravenRecord.topic.device).to.be.a("String")
        expect(this.ravenRecord.topic.schema).to.be.a("String")
        expect(this.ravenRecord.topic.unitid).to.be.a("String")
    })

    it("is expected that the raven record has a valid payload", function(){
        expect(this.ravenRecord.payload).to.have.keys(["v", "d"])

        expect(this.ravenRecord.payload.v).to.be.a("Number")
        expect(this.ravenRecord.payload.v).to.be.equal(1)
        expect(this.ravenRecord.payload.d).to.be.a("Date")
    })

    it("is expected that there is not any error", function(){
        expect(this.ravenRecord.error).to.be.a("String")
        expect(this.ravenRecord.error).to.equal("")
    })

})