# react.cordova-navigation_controller

## Plugin for react
It's manager for your pages like mobile app.<br>

#### `import Navigator from './react.cordova-navigation_controller';`

<br>
In the render function return

 ```
 <Navigator
        myComponentApp={this}
        onChangePage={(nowPageKey) => { ... }}    
        homePageKey={"home"}>
            <MyHomePage key="home" levelPage={0} />
            <AboutPage key="about" levelPage={1} />
  </Navigator>
```
**Note: prop `levelPage` important to manage the returs (from back button) in the structure of a tree**<br><br>

To change page you need get the component that you send in 'myComponentApp' and do:
#### `myComponentApp.navigator.changePage("about");` 
the option to changePage it's:
```
myComponentApp.navigator.changePage(
                goToPage //it's must
                ,animationIn//have defult
                ,animationOut//have defult
                //'animationIn' and 'animationOut' need name of the animated
                , timeAnimationInMS // defult=250//ms
                , callbackFun
              );
```
*`animationIn` and `animationOut` need name animate from https://daneden.github.io/animate.css/  <br> 
*the animate.css includ in this package

## Options:

### Get the historyPages list
```
const historyPages= myComponentApp.navigator.historyPages();
```

### Get the listLevelPages list
```
const listLevelPages= myComponentApp.navigator.listLevelPages();
```


### Check if the mangerPages is busy
```
const navigator_busy= myComponentApp.nvigator.busy;
```
*busy return boolean  
<br><br><br>


Credit:
Arik Wald
<br><br>
Credit animated:
 ***animate.css -https://daneden.github.io/animate.css/***
