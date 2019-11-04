# Reco (react.cordova)
Welcome to `Reco` (React+Cordova). Reco unifies React.js and Cordova into one CLI which
bundles both platforms together and provides the developer with the ability to generate Cordova hybrid cross-platform 
applications built in React.js. This bundled platform facilitates and automates project initialization, 
compilation and build actions for React.js developers who wish to build web/mobile/desktop applications using the powerful and most vast Cordova environment. Reco is the bundle where both Cordova and React.js platforms merge and work together as one. Enjoy your
coding and development experience using Reco!
<br>  

<p align="center">
   <img src="https://upload.wikimedia.org/wikipedia/he/thumb/a/a7/React-icon.svg/160px-React-icon.svg.png"  height="128px" alt="React.js"/>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <img src="https://cordova.apache.org/static/img/cordova_bot.png" width="114px" height="128px" alt="Cordova"/>
   <br />
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>React.js</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Cordova</b>
</p>


### Installing Reco CLI 
```cli
npm install -g react.cordova
```

### Initialize a new bundle project

```cli
reco init com.example.hello "Hello World"
```
*Note: creates both **`react-app`** and **`cordova-app`** and then will merge one into the other*

### Explore Reco CLI

To get full CLI reference of all commands and features currently available, run the following command

```cli
reco -info
```

### Serve debug mode

To run a React or Cordova simulation

```cli
reco start
```
*You can choose one of two methods to serve.

### Project build

Perform a build action for your project using the following command

```cli
reco build
```

1. Builds **`react-app`** to publish (in: ./react-js/build).<br>
2. Builds **`cordova-app`** for mobile and other platforms.

*Note: will generate an **apk** installable package for Android devices*<br>
*Note: will generate an **xcworkspace** XCode project that can be compiled and built for deployment on iOS devices*
<br>

### Integrated Cordova CLI 
To run Cordova CLI simply prepend the **`reco`** prefix to any Cordova command line

**For example:**

```cli
reco cordova <any cordova command line to run>

reco platform

reco platform <add/rm> <cordova platform>

reco plugin <add/rm> <cordova plugin>
```

Learn more about Cordova: **[Cordova get started](https://cordova.apache.org/#getstarted).**

### Integrated React.js  CLI

You can run React.js CLI from within the project's directory

**For example:**

```cli
reco start (Choose the first option)

reco test

reco install <npm packages for react>

reco uninstall <npm packages for react>

reco react <any react command line to run>

react <any react command line to run>
```

Learn more about React.js apps: **[create React.js app documentation](https://facebook.github.io/create-react-app/docs/getting-started)**<br>
Learn programming in React.js: **[React.js documentation](https://reactjs.org/)**




<br>

_______________________________________________________________________
### Prerequisites
#### npm
[get-npm](https://www.npmjs.com/get-npm)

#### Java 
Recommended version 1.8.0 [get-Java](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

#### Cordova 
```cli
npm install -g cordova
```

<br>


## If you have any problem, please let us know [here](https://github.com/orchoban/react.cordova/issues), and we will make an effort to resolve it soon
## Feel free to editing the code yourself: go to [bin/cli.js](https://github.com/orchoban/react.cordova/blob/master/bin/cli.js)




Created by [Or Chuban (Choban)](https://www.linkedin.com/in/or-choban-028280125)

Credits: Arik Wald
