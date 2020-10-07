const images = () =>{//при клике на картинку будем показывать модольное окно с увеличенной картинкой
    const imgPopup = document.createElement('div'),// этот див - модальное окно
            workSection = document.querySelector('.works'),// элемент который содержит все изображения
            bigImage = document.createElement('img');

    imgPopup.classList.add('popup');// добавляем к диву класс модального окна

    workSection.appendChild(imgPopup);//  Запихиваем  модальное окно в контейнер со всеми изображениями

    //можно делать через готовые класс  cssText или инлайн стили
    imgPopup.style.justifyContent='center';
    imgPopup.style.alignItems = 'center';
    imgPopup.style.display = 'none'
    imgPopup.appendChild(bigImage);// картинка  встанет по центру модального окна

    //делегирование событий
    workSection.addEventListener('click', (e)=>{
        e.preventDefault();//отменяем стандартное поведение ссылок
        let target = e.target;

        if(target && target.classList.contains('preview')){// если пользователь действительно кликнул в картинку
            imgPopup.style.display = 'flex';
            //по этому пути бужем определять какую картинку помещать в bigImage
            const path = target.parentNode.getAttribute('href');// получаем атрибут хреф у родительского элемента (ссылки-картинки на которую кликнули)
            //в атрибут src записываем адрес картинки которую будем увеличивать
            bigImage.setAttribute('src', path);
            
        }
         //скрываем по клику на подлоку
         if (target && target.matches('div.popup')){//если пользователь кликнул в див с класом попап
            imgPopup.style.display = 'none';
        }

    })
}

export default images;