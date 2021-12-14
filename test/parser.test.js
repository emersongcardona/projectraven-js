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
let odinJs = require("../index")



// · 
describe("parserJs", function() {

    describe("get info from topic", function() {

        before(function() {
            this.result = odinJs.parser.describeTopic("raven-1001/data/T1")
        })

        it("return data extracted form the MQTT topic string", function() {
            expect(this.result).to.be.an("Object")
            expect(this.result).to.deep.eql({ 
                device: 'raven-1001',
                topic: 'data',
                unitid: 'T1'
            });
        })

    })

    describe("topic structure error", function(){
        
        it("is expected to throw an error when no topic is given", function(){
            expect(odinJs.parser.describeTopic).to.throw()
        })

        it("is expected to throw an error when an invalid topic is given", function(){
            expect(() => odinJs.parser.describeTopic("hello")).to.throw()
        })

    })

})
