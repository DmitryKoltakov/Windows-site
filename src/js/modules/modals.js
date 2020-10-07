const modals = () =>{//'эта фукция- модуль, который будет экспортироваться по умолчанию для компиляции в main.js 
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true){//closeClickOverlay контролирует закрытие при клике на подложку
        const trigger = document.querySelectorAll(triggerSelector),//зразу все триггеры которые потом переберем
                modal = document.querySelector(modalSelector),
                close = document.querySelector(closeSelector),
                windows = document.querySelectorAll('[data-modal]');//в хтмл все модальные окна помечены этим дата атрибутом. это нужно чтобы при закрытии они закрывались все если их открыто несколько
        const scroll = calcScroll(); // ширина полоски прокрутки
        
        
        trigger.forEach(item => {//перебираем и на каждый триггер вешаем обработчик
            item.addEventListener('click', (e) =>{
                if(e.target){
                    e.preventDefault();//чтобы страница не перезагружалась
                }

                windows.forEach(item => {
                    item.style.display = 'none';
                })


                modal.style.display = 'block';//показываем моальное окно
                document.body.classList.add('modal-open');//это бутстрап класс который делает тоже самое
                // document.body.style.overflow = "hidden";//делаем чтобы не скролилась страница
                document.body.style.marginRight = `${scroll}px`;//когда модальное окно открывается добавляется отступ равный ширине полоски прокрутки чтобы верстка не прыгала
            })
        })

        close.addEventListener('click',()=>{//клик на крестик
            windows.forEach(item => {
                item.style.display = 'none';
            })
            modal.style.display = 'none';
            document.body.classList.remove('modal-open')//это бутстрап класс который делает тоже самое
            // document.body.style.overflow = "";
            document.body.style.marginRight = `0px`;

        });

        modal.addEventListener('click', (e) => {
            if(e.target === modal && closeClickOverlay){// клик четко на подложку без других элементов внутри нее. //closeClickOverlay контролирует закрытие при клике на подложку если передан фолс в аргументы то оно работать не будет
                windows.forEach(item => {
                    item.style.display = 'none';
                })
                modal.style.display = 'none';
               document.body.classList.remove('modal-open')//это бутстрап класс который делает тоже самое
                // document.body.style.overflow = "";
                document.body.style.marginRight = `0px`;
            }
        })
    
    }


    function showModalByTime(selector, time){
        setTimeout(function(){
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = "hidden";
        }, time);
    }
    //делаем так чтобы модальное окно не прыгало при открытии когда убирается скролл
    //надо узнать ширину полоски скролла и добавить марджин справа когда модальное окно появляется
    function calcScroll () {
        let div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';//делаем у этого блока скролл
        div.style.visibility = 'hidden';//чтобы он не маячил

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;// из полного значения ширины вычитаем значение ширины без полоски прокрутки

       div.remove();// этот квадратик больше не нужен

       return scrollWidth;

    }


    //вместо этого можно просто передавать селекторы в функцию а она сама уже их получит и запишет в переменную
    // //получаем нужные элементы которые будем передавать в функцию выше
    // const callEngineerBtn = document.querySelector('.popup_engineer_btn'),
    // modalEngineer = document.querySelector('.popup_engineer'),
    // modalEngineerClose = document.querySelector('.popup_engineer .popup_close');


    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button','.popup_calc_end', '.popup_calc_end_close', false);
    showModalByTime('.popup',60000);
};



export default modals;