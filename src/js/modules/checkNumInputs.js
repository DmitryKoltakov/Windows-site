const checkNumInputs = (selector) =>{
    const numInputs = document.querySelectorAll(selector);
    numInputs.forEach(item => {
        item.addEventListener('input', () =>{//когда пользователь что то вводит
            item.value = item.value.replace(/\D/, '');//все не цифры будут заменяться на пустое место
        });
    });
}
export default checkNumInputs;