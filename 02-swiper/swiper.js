function setTranslate (element, translate) {
	element.style.transform
		= element.style.WebkitTransform
		= 'translate3d('+ translate + 'px, 0px, 0px)'
}

function getTranslate (element) {
  let matrix = getComputedStyle(element)['transform']
    .replace('matrix(', '')
    .replace(/\s/g, '')
  let arr = matrix.split(',')
  return {
    x: Number(arr[arr.length - 2]),
    y: Number(arr[arr.length - 1])
  }
}

function setTransition (element, duration) {
	element.style['transition-duration'] = duration + 'ms'
}

function Swiper (container, options) {
	this.param = options
	this.$container = document.querySelector(container)
	this._init()
	console.log(this)
}

Swiper.prototype._init = function () {
	this._render(this._createHTML())
	this._initStyle()
	this._initEvents()
}

Swiper.prototype._render = function (html) {
	this.$container.innerHTML = html
	this.$swiperMain = this.$container.querySelector('.swiper-main')
	this.$swiperNav = this.$container.querySelector('.swiper-nav')
}

Swiper.prototype._createHTML = function () {
	var slideStr = ''
	var navStr = ''
	var list = this.param.list
	for (let i = 0; i < list.length; i++) {
		slideStr += '<li class="swiper-slide"></li>'
		navStr += '<li class="item"></li>'
	}
	slideStr = '<ul class="swiper-main">' + slideStr + '</ul>'
	navStr = '<ul class="swiper-nav">' + navStr + '</ul>'
	return slideStr + navStr
}

Swiper.prototype._initStyle = function () {
	var length = this.param.list.length
	var slideMain = this.$container.querySelector('.swiper-main')
	var slideList = this.$container.querySelectorAll('.swiper-slide')
	var containerWidth = this.$container.offsetWidth
	var containerHeight = this.$container.offsetHeight
	this.width = containerWidth
	this.height = containerHeight
	this.translate = 0
	this.minTranslate = 0
	this.maxTranslate = containerWidth * (length - 1)
	this.isAnimating = false
	slideMain.style.width = containerWidth * length + 'px'
	slideMain.style.transform = 'translate3d(0px, 0px, 0px)'
	slideList.forEach((slide) => {
		slide.style.width = containerWidth + 'px'
	})
	this._updateActiveIndex(0)
}

Swiper.prototype._initEvents = function () {
	this.$container.addEventListener('touchstart', this._onTouchStart.bind(this), false)
	this.$container.addEventListener('touchmove', this._onTouchMove.bind(this), false)
	this.$container.addEventListener('touchend', this._onTouchEnd.bind(this), false)
	this.$container.addEventListener('touchcancel', this._onTouchCancel.bind(this), false)
	this.$swiperMain.addEventListener('transitionend', this._onTransitionEnd.bind(this), false)
}

Swiper.prototype._updateTranslate = function (newTranslate) {
	setTranslate(this.$swiperMain, newTranslate)
}

Swiper.prototype._updateTransition = function (duration) {
	setTransition(this.$swiperMain, duration)
}

Swiper.prototype._resetTouchState = function () {
	this.isAnimating = false
	this.touchStartPoint = undefined
	this.touchStartTime = undefined
	this.isTouched = undefined
	this.isMoved = undefined
}

Swiper.prototype._onTouchCancel = function (event) {
	this._resetTouchState()
}

Swiper.prototype._onTouchStart = function (event) {
	if (this.isTouched) { return }
	var point = event['changedTouches'][0]
	this.touchStartPoint = point
	this.touchStartTime = +new Date()
	this.touchStartTranslate = getTranslate(this.$swiperMain)['x']
	this._updateTransition(0)
	this.isTouched = true
}

Swiper.prototype._onTouchMove = function (event) {
	if (this.isAnimating || !this.isTouched) {
		return
	}
	var point = event['changedTouches'][0]
	var diffX = point['pageX'] - this.touchStartPoint['pageX']
	var diffY = point['pageY'] - this.touchStartPoint['pageY']
	event.preventDefault();
	if (Math.abs(diffX) < Math.abs(diffY)) {
		return
	}
	$dataEl.innerHTML = diffX + ',' + diffY
	var diff = diffX
	var newTranslate = this.touchStartTranslate + diff
	this._updateTranslate(newTranslate)
	this.translate = newTranslate
	this.isMoved = true
	this.diff = diff
}

Swiper.prototype._updateActiveIndex = function (activeIndex) {
	this.activeIndex = activeIndex
	var navItems = this.$swiperNav.querySelectorAll('.item')
	navItems.forEach((item, index) => {
		if (index === activeIndex) {
			item.className="item is-active"
		} else {
			item.className="item"
		}
	})
}

Swiper.prototype._onTouchEnd = function (event) {
	if (this.isAnimating || !this.isTouched) {
		this._resetTouchState()
		return
	}
	var now = +new Date()
	var len = this.param.list.length
	var newIndex = this.activeIndex
	var translate
	if (now - this.touchStartTime < 300) {
		// 下一张
		if (this.diff > 0) {
			newIndex--
		}
		if (this.diff < 0) {
			newIndex++
		}
	} else {
		newIndex = Math.round(-this.translate / this.width)
	}
	if (newIndex < 0) {
		newIndex = 0
	}
	if (newIndex > (len - 1)) {
		newIndex = len - 1
	}
	translate = newIndex * this.width
	this._updateTransition(400)
	this.isAnimating = true
	this._updateTranslate(-translate)
	this._updateActiveIndex(newIndex)
}

Swiper.prototype._onTransitionEnd = function () {
	this._resetTouchState()
}

Swiper.prototype.resize = function () {

}