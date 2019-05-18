export const overlayStyle = (options) => ({
  position: 'fixed',
  top: options.topOffset,
  bottom: options.bottomOffset,
  left: 0,
  right: 0,
  zIndex: 1001,
  background: 'rgba(0, 0, 0, 0.3)',
  opacity: 0,
  transition: `opacity ${options.transitionTime}s, transform 0s ${options.transitionTime}s`,
  transform: `translate3d(${options.isLeft ? '' : '-'}100%, 0px, 0px)`,
})

export const overlayActiveStyle = (options) => ({
  ...overlayStyle(options),
  opacity: 1,
  transition: `opacity ${options.transitionTime}s`,
  transform: 'none',
})

export const menuOuterStyle = (options) => ({
  position: 'fixed',
  left: (options.isLeft ? 0 : 'inherit'),
  right: (options.isLeft ? 'inherit' : 0),
  top: options.topOffset,
  bottom: options.bottomOffset,
  zIndex: 1002,
  width: options.width,
  maxWidth: '80%',
  transition: `transform ${options.transitionTime}s`,
  transform: getSkew(options) + `translate3d(${options.isLeft ? '-' : ''}100%, 0px, 0px)`,
  transformOrigin: 'left',
  backgroundColor: options.backgroundColor,
})

export const menuOuterActiveStyle = (options) => ({
  ...menuOuterStyle(options),
  transform: getSkew(options) + 'translate3d(0px, 0px, 0px)',
})

export const menuShadowStyle = (options) => ({
  position: 'absolute',
  zIndex: -1,
  width: '100%',
  height: '100%',
  transition: `opacity ${options.transitionTime}s`,
  boxShadow: (options.showShadow ? '0 0 15px 0 rgba(0, 0, 0, .2)' : 'none'),
  opacity: 0,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
})

export const menuShadowActiveStyle = (options) => ({
  ...menuShadowStyle(options),
  opacity: 1,
})

export const menuInnerStyle = (options) => ({
  height: '100%',
  paddingBottom: options.topOffset,
  overflowY: 'auto',
})

export function getSkew(options) {
  return options.skewY ? `skewY(${options.skewY}deg) ` : ''
}
