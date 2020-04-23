const log = console.log.bind(console)

const e = selector => document.querySelector(selector)

const es = selector => document.querySelectorAll(selector)

const removeClassAll = function(className) {
    let selector = '.' + className
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        e.classList.remove(className)
    }
}

const bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

const bindAll = function(selector, eventName, callback) {
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

const nextIndex = function(slide, offset) {
    // 得到图片总数和当前图片下标
    let numberOfImgs = parseInt(slide.dataset.imgs, 10)
    let activeIndex = Number(slide.dataset.active)
    let i = (activeIndex + offset + numberOfImgs) % numberOfImgs
    return i
}

const bindEventSlide = function() {
    let selector = '.oxfan-slide-button'
    bindAll(selector, 'click', function(event) {
        let self = event.target
        let slide = self.parentElement
        let offset = Number(self.dataset.offset)
        let index = nextIndex(slide, offset)
        showImageAtIndex(slide, index)
    })
}

const showImageAtIndex = function(slide, index) {
    let nextIndex = index
    slide.dataset.active = nextIndex

    let className = 'oxfan-active'
    removeClassAll(className)
    let nextSelector = '#id-oxfanimage-' + String(nextIndex)
    let img = e(nextSelector)
    img.classList.add(className)

    let indicatorClassName = 'oxfan-white'
    removeClassAll(indicatorClassName)
    let indicatorSelector = '#id-indicator-' + String(nextIndex)
    let indicator = e(indicatorSelector)
    indicator.classList.add(indicatorClassName)
}

const bindEventIndicator = function() {
    let selector = '.oxfan-slide-indi'
    bindAll(selector, 'click', function(event) {
        let self = event.target
        let index = Number(self.dataset.index)
        log('index', index, typeof index)
        let slide = self.closest('.oxfan-slide')
        showImageAtIndex(slide, index)
    })
}

const bindEvents = function() {
    bindEventSlide()
    bindEventIndicator()
}

const playNextImage = function() {
    let slide = e('.oxfan-slide')
    let index = nextIndex(slide, 1)
    showImageAtIndex(slide, index)
}

const autoPlay = function() {
    let interval = 2000
    setInterval(function() {
        playNextImage()
    }, interval)
}

const __main = function() {
    bindEvents()
    autoPlay()
}

__main()
