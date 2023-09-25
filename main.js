"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Slider = /** @class */ (function () {
    function Slider(id, url) {
        var _this = this;
        this.positionSlides = function (arr, previous, next, direction) {
            arr.forEach(function (element, index) {
                if (index === previous) {
                    element.style.left = direction === 'left' ? "100%" : "-100%";
                    element.style.zIndex = '10';
                }
                else if (index === _this.current) {
                    element.style.left = '0';
                    element.style.zIndex = '12';
                }
                else if (index === next) {
                    element.style.left = direction === 'left' ? "-100%" : "100%";
                    element.style.zIndex = '10';
                }
                else {
                    element.style.zIndex = '5';
                }
                _this.checkAnimation();
            });
        };
        this.showBtn = function (btnRight, btnLeft) {
            if (_this.dataInfinite === 'false') {
                if (_this.current === 0) {
                    btnRight.style.display = 'block';
                    btnLeft.style.display = 'none';
                }
                else if (_this.current === _this.data.length - 1) {
                    btnRight.style.display = 'none';
                    btnLeft.style.display = 'block';
                }
                else {
                    btnRight.style.display = 'block';
                    btnLeft.style.display = 'block';
                }
            }
        };
        this.checkInfinite = function (btn, placed) {
            if (_this.current === 0 && _this.root.dataset.infinite === 'false' && placed === 'left') {
                btn.style.display = 'none';
            }
            else if (_this.current === _this.data.length && _this.root.dataset.infinite === 'false' && placed === 'right') {
                btn.style.display = 'none';
            }
            else {
                btn.style.display = 'block';
            }
        };
        this.checkAnimation = function () {
            var element = document.querySelector("[data-set=\"".concat(_this.current, "\"]"));
            if (_this.dataAnimationType === 'fade') {
                var opacity_1 = 0;
                var fadeIn_1 = setInterval(function () {
                    if (opacity_1 >= 1) {
                        clearInterval(fadeIn_1);
                    }
                    element.style.opacity = "".concat(opacity_1);
                    opacity_1 += 0.01;
                }, 10);
            }
            else if (_this.dataAnimationType === 'scroll') {
                element.style.transition = 'all 1s ease';
            }
        };
        this.setAutoplay = function (ctx, btnLeft, btnRight) {
            var previous;
            var next;
            var interval = 2000 || _this.dataInterval;
            var i = setInterval(function () {
                if (_this.root.dataset.infinite === 'true') {
                    if (_this.current === _this.data.length - 1) {
                        _this.current = _this.data.length - 1;
                        previous = _this.current - 1;
                        next = 0;
                    }
                    else if (_this.current > _this.data.length - 1) {
                        _this.current = 0;
                        previous = _this.data.length - 1;
                        next = _this.current + 1;
                    }
                    else {
                        _this.current = _this.current;
                        previous = _this.current - 1;
                        next = _this.current + 1;
                    }
                }
                else if (_this.root.dataset.infinite === 'false') {
                    _this.current = _this.current;
                    previous = _this.current - 1;
                    next = _this.current + 1;
                    if (_this.current >= _this.data.length - 1) {
                        clearInterval(i);
                    }
                }
                _this.updateBullets(ctx);
                _this.showBtn(btnRight, btnLeft);
                _this.checkAnimation();
                var arr = ctx.querySelectorAll('.slider');
                _this.positionSlides(arr, previous, next, 'right');
                _this.current++;
            }, interval);
        };
        this.root = document.querySelector("".concat(id)),
            this.url = url,
            this.current = 0,
            this.data,
            this.dataInterval = this.root.dataset.dataInterval,
            this.dataAnimationType = this.root.dataset.animationType,
            this.dataInfinite = this.root.dataset.infinite;
    }
    Slider.prototype.checkStorage = function () {
        var temp = JSON.parse(localStorage.getItem('current'));
        this.current = temp;
        var arr = document.querySelectorAll('.slider');
        var previous = this.current - 1;
        var next = this.current + 1;
        this.positionSlides(arr, previous, next, 'right');
        // this.updateBullets(ctx);
        // this.showBtn(btnLeft,btnRight)
    };
    Slider.prototype.updateBullets = function (ctx) {
        var _this = this;
        ctx.querySelectorAll('button').forEach(function (element) {
            if ((_this.current) === Number(element.dataset.set)) {
                element.setAttribute('class', 'bullets-clicked');
            }
            else {
                element.classList.remove('bullets-clicked');
            }
        });
    };
    Slider.prototype.makeBtn = function (id, img, placed) {
        var btn = document.createElement('button');
        btn.setAttribute('class', id);
        var btnImg = document.createElement('img');
        btn.style.position = 'absolute';
        btn.style.top = '50%';
        btn.style.zIndex = '20';
        //
        btnImg.src = img;
        btn.appendChild(btnImg);
        if (placed === 'left') {
            btn.style.left = '0';
            this.checkInfinite(btn, 'left'); //infinite
        }
        else {
            btn.style.right = '0';
            this.checkInfinite(btn, 'right'); //infinite
        }
        return btn;
    };
    Slider.prototype.makeElements = function (txt, app) {
        var element = document.createElement('div');
        element.setAttribute('class', txt);
        app.appendChild(element);
        return element;
    };
    Slider.prototype.makeSlider = function (txt, app, index, previous, next, current) {
        var element = document.createElement('div');
        element.setAttribute('class', txt);
        if (index === current) {
            console.log('curr', current);
            element.style.left = '0';
        }
        else if (index === previous) {
            element.style.left = '-100%';
        }
        else if (index === next) {
            element.style.left = '100%';
        }
        else {
            element.style.left = '100%';
        }
        app.appendChild(element);
        return element;
    };
    Slider.prototype.writeData = function (data) {
        var _this = this;
        var previous = data.length - 1; //-100
        var current = 0; //0
        var next = current + 1; //100
        var dataInfinite = this.root.dataset.infinite; //arrows always available
        // let dataAnimationType = this.root.dataset.animationType
        var dataBullets = this.root.dataset.bullets;
        var dataAutoplay = this.root.dataset.autoplay; //plays automatically if no data interval then fallback value ... if infinite true then infinite loop
        //make context
        var ctx = this.makeElements('ctx', this.root);
        var sliderItemWrapper = this.makeElements('slider-item-wrapper', ctx);
        var bulletWrapper = document.createElement('div');
        bulletWrapper.style.zIndex = '15';
        //bnt left
        var btnLeft = this.makeBtn('btn-left', "./assets/arrowback.svg", 'left');
        sliderItemWrapper.appendChild(btnLeft);
        //btnn right
        var btnRight = this.makeBtn('btn-right', "./assets/arrowforward.svg", 'right');
        sliderItemWrapper.appendChild(btnRight);
        this.showBtn(btnRight, btnLeft);
        ///slider animation
        // interval
        dataAutoplay === 'true' ?
            this.setAutoplay(ctx, btnLeft, btnRight) : '';
        // localStorage.getItem('current') ? this.checkStorage() : ''
        // BTN LEFT EVENT 
        btnLeft.addEventListener('click', function (e) {
            _this.current = _this.current - 1;
            if (dataInfinite === 'false') {
                if (_this.current === 0) {
                    _this.current = 0;
                    next = _this.current - 1;
                    previous = _this.current + 1;
                }
                else {
                    _this.current = _this.current;
                    next = _this.current - 1;
                    previous = _this.current + 1;
                }
            }
            else if (dataInfinite === 'true') {
                if (_this.current < 0) {
                    _this.current = _this.data.length - 1;
                    next = _this.data.length - 2; //1
                    previous = 0;
                    // console.log(this.current);
                }
                else if (_this.current === 0) {
                    _this.current = 0;
                    previous = _this.current + 1;
                    next = _this.data.length - 1;
                }
                else if (_this.current > _this.data.length - 1) {
                    _this.current = 0;
                    previous = _this.current + 1;
                    next = _this.data.length - 1;
                }
                else {
                    _this.current = _this.current;
                    next = _this.current - 1;
                    previous = _this.current + 1;
                }
            }
            // console.log(this.current);
            var arr = ctx.querySelectorAll('.slider');
            _this.positionSlides(arr, previous, next, 'left');
            _this.checkAnimation();
            _this.showBtn(btnRight, btnLeft);
            _this.updateBullets(ctx);
        });
        // BTN RIGHT EVENT LISTENER 
        btnRight.addEventListener('click', function (e) {
            _this.current = _this.current + 1;
            if (dataInfinite === 'true') {
                if (_this.current === _this.data.length - 1) {
                    _this.current = _this.data.length - 1;
                    previous = _this.current - 1;
                    next = 0;
                }
                else if (_this.current > _this.data.length - 1) {
                    _this.current = 0;
                    previous = _this.data.length - 1;
                    next = _this.current + 1;
                }
                else {
                    _this.current = _this.current;
                    previous = _this.current - 1;
                    next = _this.current + 1;
                }
            }
            else if (dataInfinite === 'false') {
                _this.current = _this.current;
                previous = _this.current - 1;
                next = _this.current + 1;
            }
            var arr = ctx.querySelectorAll('.slider');
            _this.positionSlides(arr, previous, next, 'right');
            _this.updateBullets(ctx);
            _this.checkAnimation();
            _this.showBtn(btnRight, btnLeft);
        });
        data.forEach(function (element, index) {
            //one item slide
            var slider = _this.makeSlider('slider', sliderItemWrapper, index, previous, next, current);
            slider.setAttribute('data-set', "".concat(index));
            _this.checkAnimation();
            slider.style.backgroundImage = "url(".concat(data[index].img, ")");
            var title = _this.makeElements('title', slider);
            title.innerHTML = data[index].title;
            //explore link\
            var exploreLink = document.createElement('a');
            exploreLink.setAttribute('class', 'explore_link');
            exploreLink.innerHTML = "<span>".concat(data[index].buttonText, "</span>");
            exploreLink.href = data[index].buttonLink;
            slider.appendChild(exploreLink);
            //check if bullet is true
            dataBullets === 'true' ?
                sliderItemWrapper.append(bulletWrapper) : '';
            bulletWrapper.setAttribute('class', 'bullet-wrapper');
            var bullet = document.createElement('button');
            bullet.setAttribute('data-set', "".concat(index));
            bullet.setAttribute('class', 'bullets');
            bulletWrapper.appendChild(bullet);
            index === 0 ? bullet.setAttribute('class', 'bullets-clicked') : '';
            bullet.addEventListener('click', function (e) {
                _this.current = Number(bullet.dataset.set);
                _this.showBtn(btnRight, btnLeft);
                var arr = ctx.querySelectorAll('.slider');
                var previous = _this.current - 1;
                var next = _this.current + 1;
                _this.positionSlides(arr, previous, next, 'right');
                var targetBullet = e.target;
                targetBullet === null || targetBullet === void 0 ? void 0 : targetBullet.classList.add('bullets-clicked');
                _this.checkAnimation();
                //update bullets
                ctx.querySelectorAll('.bullets-clicked').forEach(function (element) {
                    if (e.target !== element) {
                        element.classList.remove('bullets-clicked');
                    }
                });
            });
        });
    };
    Slider.prototype.getData = function () {
        var _this = this;
        fetch("".concat(this.url))
            .then(function (data) { return data.json(); })
            .then(function (data) {
            _this.data = data;
            _this.writeData(data);
        });
    };
    Slider.prototype.init = function () {
        var _this = this;
        this.getData();
        //save into local storage
        window.addEventListener("unload", function (e) {
            console.log(_this.current, 'frome event');
            localStorage.setItem('current', JSON.stringify(_this.current));
        });
    };
    return Slider;
}());
var slider = new Slider('.root', 'http://localhost:3000/data');
slider.init();
