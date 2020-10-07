import checkNumInputs from './checkNumInputs';
const forms = (state) => {//стейт прийдет из main.js
    const form = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input');
    // const phoneInputs = document.querySelectorAll('input[name="user_phone"]');//инпуты с атрибутов юзер фон

    checkNumInputs('input[name="user_phone"]');//вводим только цифры 
    //Вынесли в отдельный модуль
    // phoneInputs.forEach(item => {
    //     item.addEventListener('input', () =>{//когда пользователь что то вводит
    //         item.value = item.value.replace(/\D/, '');//все не цифры будут заменяться на пустое место
    //     });
    // });

    const message = {
        loading: 'Загрузка',
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure: 'Что то пошло не так...'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {//в рес попадет промис который вернулся от сервера
            method: 'POST',
            body: data
        });

        return await res.text();//возвращаем промис переделанный в текст
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = "";
        })
    }

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);//помещаем статус в конец формы

            const formData = new FormData(item);//конструктор сделает объект с данными из формы
            //formData может отпаввляться на сервер в разных форматах

            if(item.getAttribute('data-calc') === 'end'){//если у формы есть атрибут со значением end
                //почитай про это заклинание
                for (let key in state) {// перебираем весь стейт
                    formData.append(key, state[key]);//и запихиваем каждое значение из стейта в форм дату
                }
            }

            
            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() =>{
                    statusMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage. remove();
                    }, 5000);
                })

        });
    });
}

export default forms;