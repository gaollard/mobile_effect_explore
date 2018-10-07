function getStyle (element) {
	return 
}

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
	slideMain.style.width = containerWidth * length + 'px'
	slideMain.style.transform = 'translate3d(0px, 0px, 0px)'
	slideList.forEach((slide) => {
		slide.style.width = containerWidth + 'px'
	})
}

Swiper.prototype._initEvents = function () {
	this.$container.addEventListener('touchstart', this._onTouchStart.bind(this), false)
	this.$container.addEventListener('touchmove', this._onTouchMove.bind(this), false)
	this.$container.addEventListener('touchend', this._onToucEnd.bind(this), false)
}

Swiper.prototype._onTouchStart = function (event) {
	var point = event['changedTouches'][0]
	this.touchStartPoint = point['pageX']
	this.touchStartTime = +new Date()
	this.touchStartTranslate = getTranslate(this.$swiperMain)['x']
}

Swiper.prototype._onTouchMove = function (event) {
	var point = event['changedTouches'][0]
	var diff = point['pageX'] - this.touchStartPoint
	var newTranslate = this.touchStartTranslate + diff
	setTranslate(this.$swiperMain, newTranslate)
	this.translate = newTranslate
}

Swiper.prototype._onToucEnd = function (event) {
	console.log(this.translate / this.width)
}

Swiper.prototype.resize = function () {

}