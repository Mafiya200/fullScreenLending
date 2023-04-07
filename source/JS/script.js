'use strict';

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};

const screenSwiper = new Swiper(`.page`, {
    wrapperClass: `page__wrapper`,
    slideClass: `page__screen`,
    speed: 800,
    observer: true,//true-вкл/false-выкл обновление свайпера при изменении элементов слайдера
    slidesPerView: `auto`,
    parallax: true,
    // обновить свайпер
    // при изменении родительских
    // элементов слайдера
    observeParents: true,//true-вкл/false-выкл обновление свайпера при изменении родительских элементов слайдера

    // обновить свайпер
    // при изменении дочерних
    // элементов слайдера
    observeSlideChildren: true,
    mousewheel: {
        ensitivity: 1,
    },
    direction: `vertical`,
    keyboard: {
        enable: true,//true-вкл/false-выкл управление клавиатурой
        onlyInViewport: true,//true-вкл/false-выкл управление слайдером с помощью стрелок работает когда мы до него до скролили, а не всегда
        pageUpDown: true,//true-вкл/false-выкл управление клавишами pageUp\pageDown
    },
    pagination: {
        el: `.page__pagination`,
        clickable: true,
        type: `bullets`,
        bulletClass: `page__bullet`,
        bulletActiveClass: `page__bullet-active`,
    },
    scrollbar: {
        el: `.page__scrollbar`,
        draggable: true,
        dragClass: `page__drag`,
    },
    on: {
        init: function () {
            $(`.wrapper`).addClass(`_loaded`);
            activeLink();
            activeSlideTo();
            overContent();
        },
        slideChange: function () {
            activeLink();
        },
        resize: function () {
            overContent();
        },
    },

    init: false,

});
const allLink = document.querySelectorAll(`.header__link`);


function activeLink() {
    const logo = document.querySelector(`.header__logo`);
    if (logo) {
        $(`.header__logo`).removeClass(`_active`);
        if (screenSwiper.realIndex === 0) {
            logo.classList.add(`_active`);

        }
    }
}

function activeSlideTo() {



    if (allLink.length > 0) {

        for (let i = 0; i < allLink.length; i++) {

            allLink[i].addEventListener(`click`, function (e) {
                screenSwiper.slideTo(i, 600);

                e.preventDefault();

            });

        }
    }
}

function overContent() {
    if (document.querySelector(`.wrapper`).classList.contains(`_free`)) {
        screenSwiper.params.freeMode = {
            enabled: false,
        };
        document.querySelector(`.wrapper`).classList.remove(`_free`);
    }


    for (let i = 0; i < screenSwiper.slides.length; i++) {
        const screen = screenSwiper.slides[i];
        const screenContent = screen.querySelector(`.screen__content`);

        if (screenContent) {
            console.log(1);
            const screenContentHeight = screenContent.offsetHeight;
            console.log(`${screenContentHeight} > ${window.innerHeight}`);
            if (screenContentHeight > window.innerHeight) {
                screenSwiper.params.freeMode = {
                    enabled: true,
                };
                document.querySelector(`.wrapper`).classList.add(`_free`);

            }
        }

    }

}

screenSwiper.init();
