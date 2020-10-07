const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {// так же как и в модальных окнах будем получать элементы по селекторам внутри функции
    const header = document.querySelector(headerSelector),
          tab = document.querySelectorAll(tabSelector),//по 1 селектору будет приходить несколько элементов
          content = document.querySelectorAll(contentSelector);

    function hideTabContent(){ //скрываем все табы
        content.forEach(item => {
            item.style.display = 'none';
        });

        tab.forEach(item => {//убираем все классы активности
            item.classList.remove(activeClass)
        })
    }   
    
    function showTabContent(i = 0) {//показываем элемент по его порядковому номеру
        content[i].style.display = display;//зависит от верстки. может быть и флекс и инлайн и блок итд
        tab[i].classList.add(activeClass);
    }

    //запуск функций без обработчиков а сразу при открытии страницы чтобы все скрылось и показался первый таб
    hideTabContent();
    showTabContent();


    //дальше делегирование событий. Вешаем обработчик на всю обертку а порядковый номер будет определен при клике
    header.addEventListener('click', (e) => {
        const target = e.target;
        //проверяем что кликнули точно на таб а не на другой участок хеадера. чтобы не кликнуть в пустое место
        if(target && //проверяем наличие самого таргета вообще(элемент кликабелен) 
            (target.classList.contains(tabSelector.replace(/\./, '')) || //tabSelector.replace(/\./, '') убирает точку из передаваемого класса заменяет ее на пустое место ''
            target.parentNode.classList.contains(tabSelector.replace(/\./, '')))){//если кликнули в дочерний элемент тоже проверяем
        
            tab.forEach((item,i) => {//определяем в какой таб кликнули 
                if(target == item || target.parentNode == item){//когда перебор совпадает
                    hideTabContent();//прячем
                    showTabContent(i);//показываем
                }
            });
        }   
    });

};



export default tabs;