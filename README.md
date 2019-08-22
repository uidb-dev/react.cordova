# Reco (react.cordova)
Welcome to `Reco` (React+Cordova). Reco unifies React.js and Cordova into one CLI which
bundles both platforms together and provides the developer with the ability to generate Cordova hybrid cross-platform 
applications built in React.js. This bundled platform facilitates and automates project initialization, 
compilation and build actions for React.js developers who wish to build web/mobile/desktop applications using the powerful and most vast Cordova environment. Reco is the bundle where both Cordova and React.js platforms merge and work together as one. Enjoy your
coding and development experience using Reco!
<br>

![alt React.js](https://github.com/orchoban/react.cordova/blob/master/react_logo.png "React.js")
![alt Cordova](https://github.com/orchoban/react.cordova/blob/master/cordova_logo.png "Cordova")


### Installing Reco CLI 
```cli
npm install -g react.cordova
```

### Initialize a new bundle project

```cli
reco init com.example.hello "Hello World"
```
*Note: creates both **`react-app`** and **`cordova-app`** and then will merge one into the other*


### Project build

Perform a build action for your project using the following command

```cli
reco build
```

1. Builds **`react-app`** to publish (in: ./react/build).<br>
2. Builds **`cordova-app`** for mobile and other platforms.

*Note: will generate an **apk** installable package for Android devices*<br>
*Note: will generate an **xcworkspace** XCode project that can be compiled and built for deployment on iOS devices*
<br>

### Integrated Cordova CLI 
To run Cordova CLI simply prepend the **`reco`** prefix to any Cordova command line

**For example:**

```cli
reco cordova <any cordova command line to run>
```

Learn more about Cordova: **[Cordova get started](https://cordova.apache.org/#getstarted).**

### Integrated React.js  CLI

You can run React.js CLI from within the project's directory

**For example:**

```cli
reco start

reco test

reco install <npm packages for react>

reco react <any react command line to run>
```

Learn more about React.js apps: **[create React.js app documentation](https://facebook.github.io/create-react-app/docs/getting-started)**<br>
Learn programming in React.js: **[React.js documentation](https://reactjs.org/)**

### Prerequisites
#### npm
[get-npm](https://www.npmjs.com/get-npm)

#### Java 
Recommended version 1.8.0 [get-Java](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

#### Cordova 
macOS / Linux:
```cli
$ sudo npm install -g cordova
```

Windows:
```cli
C:\>npm install -g cordova
```

#### React.js 
macOS / Linux:
```cli
$ sudo npm install -g create-react-app
```

Windows:
```cli
C:\>npm install -g create-react-app
```
<br>

Created by [Or Chuban (Choban)](https://www.linkedin.com/in/or-choban-028280125)

Credits: Arik Wald
