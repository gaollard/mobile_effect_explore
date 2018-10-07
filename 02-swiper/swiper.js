function Swiper (container, options) {
	this.param = options
	this.$container = document.querySelector(container)
	this._init()
	console.log(this)
}

Swiper.prototype._init = function () {
	this._render(this._createHTML())
	this._initStyle()
}

Swiper.prototype._render = function (html) {
	this.$container.innerHTML = html
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
	slideMain.style.width = containerWidth * length + 'px'
	slideList.forEach((slide) => {
		slide.style.width = containerWidth + 'px'
	})
}

Swiper.prototype.resize = function () {

}