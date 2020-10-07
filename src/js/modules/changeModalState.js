import checkNumInputs from './checkNumInputs';
const changeModalState = (state) =>{// прийдет из main.js
    //получаем все выборы которые сделал пользователь
    const windowForm = document.querySelectorAll('.balcon_icons_img');
    const windowWidth = document.querySelectorAll('#width');
    const windowHeight = document.querySelectorAll('#height');
    const windowType = document.querySelectorAll('#view_type');
    const windwProfile = document.querySelectorAll('.checkbox');

    checkNumInputs('#width');
    checkNumInputs('#height');

    //записываем в объект данные через одну функцию. Меняем только переменные
    function bindActionToElems (event, elem, prop){//передаем тип события. элемент на который(кооторые) вешаем обработчик. И свойство которое будем менять в объекте
        elem.forEach((item,i) => {
            item.addEventListener(event, () => {
                //Быда вот такая проверка. но она не работает на чекбоксы и селекты
                 // if(elem.length > 1){// если элемент не один на странице то это выбор формы. Все остальное инпуты
                //     state[prop] = i;//// создаем новое поле и передаем индекс из перебора
                // }else {
                //     state[prop] = item.value//вытаскиваем значение из инпута и помещаем его в наш объект
                // }
                // console.log(state);

                // теперь вот такая проверка будет срабатывать для любого типа выбора
              switch(item.nodeName){//проверяем имя ноды на которую вешаем обработчик
                    case 'SPAN':
                      state[prop] = i;
                        break;
                    case 'INPUT' ://инпуты делятся на чекбоксы и просто инпуты
                        if(item.getAttribute('type') === 'checkbox'){
                            i === 0 ? state[prop] = 'Холодное' : state[prop] = 'Тёплое'//в зависимости от номера кликнутого чекбокса определяем что будет записано
                            elem.forEach((box, j)=> {//убираем галочку со всех чекбоксов кроме того в который кликнул пользователь
                                box.checked = false;
                                if (i === j){
                                    box.checked = true;
                                }
                            })
                        }else {
                            state[prop] = item.value
                        }
                         break;
                    case 'SELECT' :
                        state[prop] = item.value;//тут у опшнов в хтмле проставлены вэлью
                        break;
                }
                console.log(state);
            })
        })
    }

    bindActionToElems('click', windowForm, 'form');
    bindActionToElems('input', windowHeight, 'height');
    bindActionToElems('input', windowWidth, 'width');
    bindActionToElems('change', windowType, 'type');//событие change работает для чекбоксов и селектов
    bindActionToElems('change', windwProfile, 'profile');
};  

export default changeModalState;