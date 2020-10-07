console.log('Хоть что то');
import './slider';// сам слайдер импортируем сюда чтобы он компилировался
import modals from './modules/modals';
import tabs from './modules/tabs';
import forms from './modules/forms';
import changeModalState from './modules/changeModalState';
import timer from './/modules/timer';
import images from './modules/images';

window.addEventListener('DOMContentLoaded', () =>{//наши скрипты будут запускаться тогда когда вся структура сайта уже загрузилась
    'use strict';

    let modalState = {};//сюда будут записываться данные из цепочки модальных окон для передачи на сервер
    let deadline = '2020-10-04';

    changeModalState(modalState);
    modals();
    tabs('.glazing_slider','.glazing_block', '.glazing_content', 'active');
    tabs('.decoration_slider','.no_click', '.decoration_content > div > div', 'after_click');//тут классы заданы через жопу потому что непонятно было в верстке
    tabs('.balcon_icons','.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block');//'.big_img > img' прямые наследники img у этого класса
    forms(modalState);
    timer('.container1', deadline);
    images();
})