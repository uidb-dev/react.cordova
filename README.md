# react.cordova

This project Creacted by [Or Chuban (Choban)](https://www.linkedin.com/in/or-choban-028280125).

## To run it you need:
### npm
[get-npm](https://www.npmjs.com/get-npm)

### Java 
recommended version 1.8.0 [get-Java](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

### cordova 
on OS X and Linux:
  #### `$ sudo npm install -g cordova`

on Windows:
 ####  `C:\>npm install -g cordova`

<br>

## Init new project
### `reco init myAppName com.myapp_id`
**Note: It's create cordova app and merge bundle with react**<br>
**!!In this version it's work only from the cmd windows pc!!**

## Build native app
### `reco build`
**Note: On Windows it's create .apk file to install in android**<br>
**Note: On Mac We have not yet built a caption script in one cmd line, but it will come soon.**<br>
**Anyone who knows cordova knew to compile to IOS**<br>
**!!In this version it's work only from the cmd windows pc!!**<br>

<br>

## Available Scripts cordova
how can write cordova comand line.
<br>
start the line with cordo instead of cordova 
<br>
**Example:** 
#### `cordo plugin add cordova-plugin-media`
<br>
Or You can insert to the folder and after run cordova

#### `cd cordova`

and after

#### `cordova plugin add cordova-plugin-media`

#### Learn More about Cordova

You can learn more in the [Cordova Get Started](https://cordova.apache.org/#getstarted).



## Available Scripts react-js

In the project directory, you can run react-js

#### `react start`
#### `react test`
#### `react run build`
#### `npm run eject`
<br>
Or You can insert to the folder and after run react

#### `cd react`

and after

#### `npm start`

#### Learn More about React

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


<br>
<br>


##Scripts code
In <'projectDirectory'>/react/App.js you well start the app.
The project includ managerPages.
it's important to manage your pages like Mobile App.

#### `import ManagerPages from './managerPages';`

<br>
In the render function return

 ```
 <ManagerPages
        myComponentApp={this}
        onChangePage={(nowPage) => { ... }}    
        homePageKey={"home"}>
            <MyHomePage key="home" levelPage={0} />
            <AboutPage key="about" levelPage={1} />
  </ManagerPages>
```

<br>

To change page you need get the component that you send in 'myComponentApp' and do:
#### `this.managerPages.changePage("about");` 
the option to changePage it's:
```
.managerPages.changePage(
                goToPage //it's must
                ,animationIn//have defult
                ,animationOut//have defult
                //'animationIn' and 'animationOut' need name of the animated from https://daneden.github.io/animate.css/  //--(c) Daniel Eden (c)--//  
                , timeAnimationInMS // defult=250//ms
                , callbackFun
              );
```
