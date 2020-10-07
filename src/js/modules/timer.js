const timer = (id, deadline) =>{

    const addZero = (num) => {
        if(num <= 9){
            return '0' + num;
        }else {
            return num;
        }
    }

    const getTimeRemailning = (endtime) => {
        const t = Date.parse(endtime) - Date.parse(new Date());
        const seconds = Math.floor((t/1000) % 60);//делим с остатком на количество минут и получаем хвостик(секунды) в остаток
        const minutes = Math.floor((t/1000/60) % 60);
        const hours = Math.floor((t/1000/60/60) % 24);
        const days = Math.floor(t/1000/60/60/24);

        return{
            'total': t,
            'days':days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    const setClock = (selector, endtime) =>{
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000)
            updateClock()//это чтобыпри открытии страницы в самом начале не показывалась верстка


        function updateClock(){
            const t = getTimeRemailning(endtime);
            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);
        
            //останавливаем таймер
            if(t.total <= 0){
                days.textContent = '00';
                housrs.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
                clearInterval(timeInterval)
            }
        }
    }

    setClock(id,deadline);

}
export default timer