# Reco (react.cordova)
Welcome to `Reco` (React+Cordova). Reco unifies React.js and Cordova into one CLI which
bundles both platforms together and provides the developer with the ability to generate Cordova hybrid cross-platform 
applications built in React.js. This bundled platform facilitates and automates project initialization, 
compilation and build actions for React.js developers who wish to build web/mobile/desktop applications using the powerfull and most vast Cordova environment. Reco is the bundle where both Cordova and React.js platforms merge and work together as one. Enjoy your
coding and development experience using Reco!
<br><br>
Installing Reco CLI **`npm install -g react.cordova`**
<br><br>
### Initialize a new bundle project
**`reco init com.example.hello "Hello World"`**<br><br>
*Note: creates both react-app and cordova-app and then will merge one into the other*
<br>

### Project build
**`reco build`**
1. Builds **`react-app`** to publish (in: ./react/build).
2. Builds **`cordova-app`** for mobile and other platforms.

*Note: will generate an APK installable package for Android devices*<br>
*Note: will generate an IPA installable package for iOS devices (when running on a mac)*
<br>

### Integrated Cordova CLI 
To run Cordova CLI simply prepend the **`reco`** prefix to any Cordova line command

**For example:** 
**`reco cordova platform add browser`**
<br>


#### Learn more about cordova: [Cordova Get Started](https://cordova.apache.org/#getstarted).



### Integrated React.js  CLI

In the project directory, you can run react-js

**`reco start`**
**`reco test`**
**`reco install <npm packages for react>`**
**`react <any react scripts run>`**

<br>


#### Learn More about React

Learn more: [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

Learn programming with react.js: [React documentation](https://reactjs.org/).

<br>

### Prerequisites:
#### npm
[get-npm](https://www.npmjs.com/get-npm)

#### Java 
Recommended version 1.8.0 [get-Java](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

#### Cordova 
On OS X and Linux:
**`$ sudo npm install -g cordova`**

On Windows:
**`C:\>npm install -g cordova`**

#### React.js 
On OS X and Linux:
**`$ sudo npm install -g create-react-app`**

On Windows:
**`C:\>npm install -g create-react-app`**
<br>

Created by [Or Chuban (Choban)](https://www.linkedin.com/in/or-choban-028280125)

Credits: Arik Wald
