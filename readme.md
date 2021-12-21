<p align="center">
	<a href="https://raven.gt" target="_blank">
		<img width="175" alt="ProjectRaven logo" src="./docs/projectraven-logo.svg" />
	</a>
</p>

<h3 align="center">JavaScript utilities for ProjectRaven's Odin server</h3>

<hr/>

Version 0.4.0    :octocat:  



## Table of Contents
- [Installation](#installation)
- [Get Started](#get-started)
- [Usage](#usage)
	- [ConvertJS](#convertjs)
	- [RavenRecord](#ravenrecord)
- [License](#license)


### **Installation**
ProjectRavenJS is available in the Node Package Manager, so you can install it via [**npm**](https://www.npmjs.com/package/projectraven-js).   

--------

```console
    npm install projectraven-js --save
```

### **Get Started**
First of all, you have to require the library in your NodeJS project.
There are many ways to do that, it depends in the ECMAScript version your are using.

--------

_ECMAScript 5_   
```js
	// instance the ProjectRavenJS utilities
	const ProjectRavenJS = require("projectraven-js")
```   

_ECMAScript 6_    
```js
	// instance the ProjectRavenJS utilities
	import ProjectRavenJS from "projectraven-js"
```

### **Usage**

ProjectRavenJS is used as utilities for Node.js applications.    
Either for Frontend apps and Backend apps. So, you can use them in the way you need it.

--------

#### **ConvertJS**
ConvertJS class provides a method called _bytesToH_ that converts bytes and returns a value that is better to understand for human.    


> bytesToH(bytes: number, si?: boolean)    


_bytesToH_ must receive at least one parameter, that should be the _bytes_ you want to convert. And another that is optional, _si_, and is boolean.    

See the following example:     


```js
	const ProjectRavenJS = require("projectraven-js")

	// converts 1024 bytes to Kilobyte with binary base
	const bytesA = ProjectRavenJS.convert.bytesToH(1024)
	const bytesB = ProjectRavenJS.convert.bytesToH(1024, true)

	console.log(bytesA) // output: 1.0 KiB
	console.log(bytesB) // output: 1.0 kB
```

--------

#### **RavenRecord**
RavenRecord class provides features to extract data from strings given. This class uses OOP in an implicit way, so, you have to know the basics. 
These features are useful when you need to extract data from the MQTT topic string for example.

--------

> new RavenRecord(topic: string, message: number)

See the following example:

```js
	const { record: RavenRecord } = require("projectraven-js")

	const topic = new RavenRecord("raven-1001/data/T1", 1)

	// output should look like this
	console.log(topic) /*
		RavenRecord {
			valid: true,
			topic: { device: 'raven-1001', schema: 'data', unitid: 'T1' },
			payload: { v: 1, d: 2021-12-16T16:57:17.512Z },
			error: ''
		}
	*/
```

As you can see, the instance of RavenRecord has to receive two parameters. The first one has to be a string, that should have the correct structure of a topic. And the second one, a number you want to show as message.     





### License  
------
Software developed in [Guatemala](http://visitguatemala.com/) distributed under the *General Public License v 3.0* you can read the full license [here](http://www.gnu.org/licenses/gpl-3.0.html)

<p align="center">
	<a href="https://www.lesli.tech" target="_blank">
		<img alt="LesliTech logo" width="150" src="https://cdn.lesli.tech/leslitech/brand/leslitech-logo.svg" />
	</a>
</p>
