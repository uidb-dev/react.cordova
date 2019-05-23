'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('./jquery-3.3.1.min');

var _jquery2 = _interopRequireDefault(_jquery);

require('./styles.css');

require('./animate.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navigator = function (_React$Component) {
  _inherits(Navigator, _React$Component);

  function Navigator(props) {
    _classCallCheck(this, Navigator);

    var _this = _possibleConstructorReturn(this, (Navigator.__proto__ || Object.getPrototypeOf(Navigator)).call(this, props));

    _this.state = {
      historyPages: [_this.props.homePageKey],
      nowPage: _this.props.homePageKey
    };
    _this.myComponentApp = _this.props.myComponentApp;

    _this.historyPages = _this.state.historyPages;

    _this.listLevelPages = [];

    var listLevelPages = _this.listLevelPages;
    _this.props.children.map(function (child) {
      listLevelPages[child.key] = child.props.levelPage === undefined ? child.key === _this.props.homePageKey ? 0 : 99 : child.props.levelPage;
    });

    // const childrenWithProps = React.Children.map(this.props.children, child =>
    //   React.cloneElement(child, { doSomething: this.doSomething })
    // );
    // this.props.nowPage(this.historyPages[this.historyPages.length - 1]);

    _this.bezy = false;

    _this.props.myComponentApp.navigator = _this;

    _this.changePage = _this.changePage.bind(_this);
    return _this;
  }

  //----navigator and animation----///


  _createClass(Navigator, [{
    key: 'funAnimationIn1',
    value: function funAnimationIn1(goToPage, fromPage) {
      var fthis = this;
      //--נכנסים דף פנימה Up--//
      var callbackFun = function callbackFun() {
        fthis.funAnimationIn2(goToPage, fromPage);
        document.getElementById(goToPage).removeEventListener("webkitAnimationEnd", callbackFun);
      };

      document.getElementById(goToPage).addEventListener("webkitAnimationEnd", callbackFun, false);

      this.bezy = true;
      (0, _jquery2.default)('#' + goToPage).removeClass('hiddenPage');
      (0, _jquery2.default)('#' + goToPage).addClass('scrollPage showPage');
      (0, _jquery2.default)('#' + fromPage).css('z-index', 0);
      (0, _jquery2.default)('#' + goToPage).css('z-index', 89);
    }
  }, {
    key: 'funAnimationIn2',
    value: function funAnimationIn2(goToPage, fromPage) {
      (0, _jquery2.default)('#' + fromPage).css('z-index', "");
      (0, _jquery2.default)('#' + goToPage).css('z-index', "");
      (0, _jquery2.default)('#' + goToPage).css('animation', '');
      (0, _jquery2.default)('#' + fromPage).removeClass('showPage');
      (0, _jquery2.default)('#' + fromPage).removeClass('scrollPage');
      (0, _jquery2.default)('#' + fromPage).addClass('hiddenPage');
      this.bezy = false;

      if (this.props.onChangePage !== undefined) this.props.onChangePage(this.state.historyPages[this.state.historyPages.length - 1]);
    }
  }, {
    key: 'funAnimationOut1',
    value: function funAnimationOut1(goToPage, fromPage) {
      var _this2 = this;

      //--חזרה בדפים Down--//  
      var callbackFun = function callbackFun() {
        _this2.funAnimationOut2(goToPage, fromPage);
        document.getElementById(fromPage).removeEventListener("webkitAnimationEnd", callbackFun);
      };
      document.getElementById(fromPage).addEventListener("webkitAnimationEnd", callbackFun);
      this.bezy = true;
      (0, _jquery2.default)('#' + goToPage).css('z-index', 0);
      (0, _jquery2.default)('#' + fromPage).css('z-index', 89);
      (0, _jquery2.default)('#' + goToPage).removeClass('hiddenPage');
      (0, _jquery2.default)('#' + goToPage).addClass('scrollPage showPage');
    }
  }, {
    key: 'funAnimationOut2',
    value: function funAnimationOut2(goToPage, fromPage) {
      (0, _jquery2.default)('#' + fromPage).css('animation', '');
      (0, _jquery2.default)('#' + goToPage).css('z-index', "");
      (0, _jquery2.default)('#' + fromPage).css('z-index', "");
      (0, _jquery2.default)('#' + fromPage).removeClass('showPage');
      (0, _jquery2.default)('#' + fromPage).removeClass('scrollPage');
      (0, _jquery2.default)('#' + fromPage).addClass('hiddenPage');
      this.bezy = false;

      if (this.props.onChangePage !== undefined) this.props.onChangePage(this.state.historyPages[this.state.historyPages.length - 1]);
    }
  }, {
    key: 'changePage',
    value: function changePage(goToPage, animationIn, animationOut, timeAnimationInMS, callbackFun) {
      var _this3 = this;

      //debugger
      if (!this.bezy) {
        var fthis = this;

        var fromPage = "" + this.historyPages[this.historyPages.length - 1] + "";

        //--animation time defult
        var timeAnimation = timeAnimationInMS !== undefined && timeAnimationInMS !== null ? timeAnimationInMS : 250; //ms

        if (goToPage !== fromPage) {
          //---ניהול חזרות----//
          this.bezy = true;
          //סיום האפליקציה, סגור
          if (this.state.historyPages.length === 1 && goToPage === undefined) {
            console.log('"window.navigator.app.exitApp()"');
            fthis.showSwalLater ? fthis.myChildrens.swal.runSwal(true) : window.navigator.app.exitApp();
          } else {
            ///שמור היסטוריה
            var new_historyPages = this.state.historyPages.slice();

            if (this.listLevelPages[goToPage] <= this.listLevelPages[fromPage]) {
              //חוזרים אחורה, מחק את כל הדפים שהרמה שלהם גבוהה משלי.
              //new_historyPages.splice(new_historyPages.length - 1, 1);
              new_historyPages = new_historyPages.filter(function (x) {
                return _this3.listLevelPages[x] < _this3.listLevelPages[goToPage];
              });
            }
            new_historyPages.push(goToPage);
            //שמירת שינויים בהיסטוריה
            this.setState({ historyPages: new_historyPages });
          }

          //----navigator and animation----///

          if (this.listLevelPages[goToPage] > this.listLevelPages[fromPage]) {
            //--נכנסים דף פנימה Up--//
            this.funAnimationIn1(goToPage, fromPage);

            if (this.listLevelPages[goToPage] === 1) {
              //Up from level 0 to level 1
              (0, _jquery2.default)('#' + goToPage).css('animation', (animationIn !== null && animationIn !== undefined ? animationIn : 'slideInRight') + " " + timeAnimation + 'ms');
            } else {
              //else if (this.listLevelPages[goToPage] === 2) {
              //Up from level 1 to level 2
              (0, _jquery2.default)('#' + goToPage).css('animation', (animationIn !== null && animationIn !== undefined ? animationIn : 'zoomIn') + " " + timeAnimation + 'ms');
            }
          } else {
            //--חזרה בדפים Down--//   
            this.funAnimationOut1(goToPage, fromPage);
            if (this.listLevelPages[fromPage] === 1) {
              //Down from level 1 to level 0
              (0, _jquery2.default)('#' + fromPage).css('animation', (animationOut !== null && animationOut !== undefined ? animationOut : 'slideOutRight') + " " + timeAnimation + 'ms');
            } else {
              //else if (this.listLevelPages[goToPage] === 1) {
              //Down from level 2 to level 1
              (0, _jquery2.default)('#' + fromPage).css('animation', (animationOut !== null && animationOut !== undefined ? animationOut : 'zoomOut') + " " + timeAnimation + 'ms');
            }
          }
          // //עיצוב כפתור חזרה
          // if (goToPage === "home") {
          //     $('#navigatorBack').css('display', "none");
          // } else {
          //     $('#navigatorBack').css('display', "flex");
          // }


          if (callbackFun !== undefined) callbackFun();
        }
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (window.cordova) {

        // //---lock portrait
        // window.screen.orientation.lock('portrait');

        //--back button in android
        document.addEventListener("backbutton", function (e) {
          window.closeOrBack();
        }, false);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var fthis = this;

      var nowPage = this.state.historyPages[this.state.historyPages.length - 1];

      this.historyPages = this.state.historyPages.slice();
      return this.props.children.map(function (child) {
        return _react2.default.createElement(
          'div',
          { style: { backgroundColor: "#fff", height: fthis.props.height }, id: child.key, className: fthis.props.homePageKey === child.key ? "showPage scrollPage" : "hiddenPage" },
          nowPage === child.key || fthis.state.historyPages.includes(child.key) ? child : _react2.default.createElement('div', null)
        );
      });
    }
  }]);

  return Navigator;
}(_react2.default.Component);

exports.default = Navigator;