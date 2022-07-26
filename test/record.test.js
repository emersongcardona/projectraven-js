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
const sharedBehavior = require("./helpers/sharedBehaviors")
// · 
let { record: RavenRecord } = require("../index")
const { faker } = require('@faker-js/faker');

let temperature = faker.random.numeric(2)
let humidity = faker.random.numeric(2)
let dataMessage = { "device_id": "raven-1001", "T1": temperature, "H1": humidity }
let eventMessage = { "device_id": "raven-1001", "E": `S${faker.datatype.number({ min: 0, max: 10 })}` }
let tokenMessage = { "device_id": "raven-1001", "token": `S${faker.random.alphaNumeric(5)}` }
let configMessage = {
    "device_id": "raven-1001",
    "ip": faker.internet.ip(),
    "name": faker.name.jobArea(),
    "t_min": faker.random.numeric(2),
    "t_max": faker.random.numeric(2),
    "h_min": faker.random.numeric(2),
    "h_max": faker.random.numeric(2),
    "start": faker.datatype.number({ min: 0, max: 23 }),
    "finish": faker.datatype.number({ min: 0, max: 23 }),
    "precise": faker.datatype.number({ min: 0, max: 7 }),
    "always": faker.datatype.number({ min: 0, max: 1 }),
    "clock": faker.datatype.number({ min: 0, max: 1 }),
    "account_id": faker.random.alphaNumeric(27)
}

describe("RavenRecord data topic", () => {

    before(function () {
        this.ravenRecord = new RavenRecord("raven-1001/data", dataMessage)
    })

    sharedBehavior.standardMqttFormatMessage()

    it("is expected to be an instance of RavenRecord", function () {
        expect(this.ravenRecord).to.be.an.instanceof(RavenRecord);
    })

    it("is expected to be on topic data", function () {
        expect(this.ravenRecord.topic).to.equal("data");
    })

    it("is expected that the raven record has a valid payload", function () {
        this.ravenRecord.payload.forEach(element => {
            expect(element).to.have.keys(["u", "v", "d"])
            expect(element.u).to.be.a("String")
            expect(element.v).to.be.a("number")
            expect(element.d).to.be.a("Date")
        });

    })

})

describe("RavenRecord config topic", () => {

    before(function () {
        this.ravenRecord = new RavenRecord("raven-1001/config", configMessage)
    })

    sharedBehavior.standardMqttFormatMessage()

    it("is expected to be an instance of RavenRecord", function () {
        expect(this.ravenRecord).to.be.an.instanceof(RavenRecord);
    })

    it("is expected to be on topic config", function () {
        expect(this.ravenRecord.topic).to.equal("config");
    })

    it("is expected that the instance has all the keys", function () {
        expect(this.ravenRecord.payload[0]).to.have.keys(["ip", "name", "t_max", "t_min", "h_max", "h_min", "start", "finish", "precise", "clock", "d", "always", "account_id"]);
    })

})




describe("RavenRecord event topic", () => {

    before(function () {
        this.ravenRecord = new RavenRecord("raven-1001/event", eventMessage)
    })

    sharedBehavior.standardMqttFormatMessage()

    it("is expected to be an instance of RavenRecord", function () {
        expect(this.ravenRecord).to.be.an.instanceof(RavenRecord);
    })

    it("is expected to be on topic event", function () {
        expect(this.ravenRecord.topic).to.equal("event");
    })

    it("is expected that the raven record has a valid payload", function () {
        expect(this.ravenRecord.payload[0]).to.have.keys(["u", "v", "d"])
        expect(this.ravenRecord.payload[0].u).to.be.a("String")
        expect(this.ravenRecord.payload[0].v).to.be.a("string")
        expect(this.ravenRecord.payload[0].d).to.be.a("Date")
    })

})


describe("RavenRecord token topic", () => {

    before(function () {
        this.ravenRecord = new RavenRecord("raven-1001/token", tokenMessage)
    })

    sharedBehavior.standardMqttFormatMessage()

    it("is expected to be an instance of RavenRecord", function () {
        expect(this.ravenRecord).to.be.an.instanceof(RavenRecord);
    })

    it("is expected to be on topic event", function () {
        expect(this.ravenRecord.topic).to.equal("token");
    })

    it("is expected that the raven record has a valid payload", function () {
        expect(this.ravenRecord.payload[0]).to.have.keys(["token", "d"])
        expect(this.ravenRecord.payload[0].token).to.be.a("String")
        expect(this.ravenRecord.payload[0].d).to.be.a("Date")
    })

})