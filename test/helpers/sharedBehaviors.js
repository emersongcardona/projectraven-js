/*
Copyright (c) 2020, all rights reserved.

All the information provided by this platform is protected by international laws related  to 
industrial property, intellectual property, copyright and relative international laws. 
All intellectual or industrial property rights of the code, texts, trade mark, design, 
pictures and any other information belongs to the owner of this platform.

Without the written permission of the owner, any replication, modification,
transmission, publication is strictly forbidden.

For more information read the license file including with this software.

// · ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~
// · 
*/


var expect = require("chai").expect


exports.standardMqttFormatMessage = function () {

    it("is expected that the instance has all the keys", function () {
        expect(this.ravenRecord).to.have.keys(["valid", "topic", "payload", "error", "meshid", "device"]);
    })

    it("is expected to do not have an empty payload", function () {
        expect(this.ravenRecord.payload.length).to.not.equal(0)
    })

    it("is expected that the raven record is valid", function () {
        expect(this.ravenRecord.valid).to.equal(true)
    })

    it("is expected that the raven record is valid", function () {
        expect(this.ravenRecord.valid).to.equal(true)
    })

}
