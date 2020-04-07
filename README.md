![](https://img.shields.io/npm/dt/react.cordova?color=blue&label=Total%20CURRENT%20INSTALLS&style=for-the-badge)


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


<br/><br/>

<a href="https://paypal.me/orchoban">
  <img src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG_global.gif" width="200px" alt=""/>
</a>



I dedicate a considerable amount of my free time to developing and maintaining this Cli, along with my other Open Source software. To help ensure this Cli is kept updated, new features are added and bugfixes are implemented quickly, please donate a couple of dollars (or a little more if you can stretch) as this will help me to afford to dedicate time to its maintenance. Please consider donating if you're using this plugin in an app that makes you money, if you're being paid to make the app, if you're asking for new features or priority bug fixes.


<br/>

### Installing Reco CLI 
```cli
npm install -g react.cordova
```

### Initialize a new bundle project

```cli
reco init com.example.hello "hello world"
```
*Note: creates both **`react-app`** and **`cordova-app`** and then will merge one into the other*

### Explore Reco CLI

To get full CLI reference of all commands and features currently available, run the following command

```cli
reco help
```


<!-- <details open> -->
<summary>
<i>New version</i>
</summary>

```
project folder
 |
 |--src
 |--public
 |--platforms
 |--plugins
 |--www
 |--build
 |--hooks
 |--package.json
 |--package-lock.json
 |-- ... 
 ```


### Serve debug mode

To run a bundle serve React and Cordova simulation

```cli
npm start
```

### Project build

Perform a build action for your project using the following command

```cli
npm run build
```
```cli
npm run build <cordova platform>
```

Builds **`cordova-app`** for browser, mobile and other platforms.

*Note: will generate an **apk** installable package for Android devices*<br>
*Note: will generate an **xcworkspace** XCode project that can be compiled and built for deployment on iOS devices*
<br>

### Integrated Cordova CLI 
To run Cordova CLI simply prepend the **`reco`** prefix to any Cordova command line

**For example:**

```cli
cordova <any cordova command line to run>

cordova platform

cordova platform <add/rm> <cordova platform>

cordova plugin <add/rm> <cordova plugin>
```

Learn more about Cordova: **[Cordova get started](https://cordova.apache.org/#getstarted).**

### Integrated React.js  CLI

You can run React.js CLI from within the project's directory

**For example:**

```cli
npm start

npm test

npm install <npm packages for react>

npm uninstall <npm packages for react>

npm <any react command line to run>
```

Learn more about React.js apps: **[create React.js app documentation](https://facebook.github.io/create-react-app/docs/getting-started)**<br>
Learn programming in React.js: **[React.js documentation](https://reactjs.org/)**

<!-- </details> -->


<br>



<details>
<summary>
<i>Old version ( < 2.0.0)</i>
</summary>


```
project folder
 |
 |--cordova
 |    |
 |    |--hooks
 |    |--platforms
 |    |--plugins
 |    |--www
 |    |--package.json
 |    |--package-lock.json
 |    |-- ...
 |
 |--react-js
 |    |--src
 |    |--public
 |    |--build
 |    |--package.json
 |    |--package-lock.json
 |    |-- ... 
 ```

### Serve debug mode

To run a bundle serve React and Cordova simulation

```cli
reco start
```
or
```cli
npm start
```

### Project build

Perform a build action for your project using the following command

```cli
reco build <cordova platform>
```
or
```cli
npm run build <cordova platform>
```
*Node: `<cordova platform>` is not requred.

Builds **`cordova-app`** for browser, mobile and other platforms.

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

</details>


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


## If you have any problems, please let us know [here](https://github.com/orchoban/react.cordova/issues), and we will make our best effort to resolve it soon
## Feel free to edit the code yourself: go to [bin/cli.js](https://github.com/orchoban/react.cordova/blob/master/bin/cli.js)




Created by [Or Chuban (Choban)](https://www.linkedin.com/in/or-choban-028280125)

Credits: Arik Wald
