"use strict";

exports.__esModule = true;
exports.default = HamburgerMenu;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HamburgerMenu(props) {
  var width = (props.width || 36) + "px",
      height = (props.height || 30) + "px",
      halfHeight = parseInt(height.replace('px', '')) / 2 + "px",
      isOpen = props.isOpen || false,
      strokeWidth = props.strokeWidth || 2,
      halfStrokeWidth = "-" + strokeWidth / 2 + "px",
      animationDuration = props.animationDuration || '0.4';

  var getTransformValue = function getTransformValue(isOpen, defaultPos, rotateVal) {
    return "translate3d(0," + (isOpen ? halfHeight : defaultPos) + ",0) rotate(" + (isOpen ? rotateVal + "deg" : '0') + ")";
  };

  var styles = {
    container: {
      width: width,
      height: height,
      position: 'relative',
      transform: "rotate(" + (props.rotate || 0) + "deg)"
    },
    lineBase: {
      display: 'block',
      height: strokeWidth + "px",
      width: '100%',
      background: props.color || '#000',
      transitionTimingFunction: 'ease',
      transitionDuration: animationDuration + "s",
      borderRadius: (props.borderRadius || 0) + "px",
      transformOrigin: 'center',
      position: 'absolute'
    },
    firstLine: {
      transform: getTransformValue(isOpen, 0, 45),
      marginTop: halfStrokeWidth
    },
    secondLine: {
      transitionTimingFunction: 'ease-out',
      transitionDuration: animationDuration / 4 + "s",
      opacity: isOpen ? '0' : '1',
      top: halfHeight,
      marginTop: halfStrokeWidth
    },
    thirdLine: {
      transform: getTransformValue(isOpen, height, -45),
      marginTop: halfStrokeWidth
    }
  };
  return _react.default.createElement("div", {
    style: styles.container,
    onClick: props.menuClicked
  }, _react.default.createElement("span", {
    style: Object.assign({}, styles.lineBase, styles.firstLine)
  }), _react.default.createElement("span", {
    style: Object.assign({}, styles.lineBase, styles.secondLine)
  }), _react.default.createElement("span", {
    style: Object.assign({}, styles.lineBase, styles.thirdLine)
  }));
}

;
HamburgerMenu.propTypes = {
  isOpen: _propTypes.default.bool.isRequired,
  menuClicked: _propTypes.default.func.isRequired,
  width: _propTypes.default.number,
  height: _propTypes.default.number,
  strokeWidth: _propTypes.default.number,
  rotate: _propTypes.default.number,
  color: _propTypes.default.string,
  borderRadius: _propTypes.default.number,
  animationDuration: _propTypes.default.number
};