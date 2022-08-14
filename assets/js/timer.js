
const options = {
    mutationObserverConfig: {
        attributes: true
    },
    elementToTimer: new Map(),
    timerIntervalInMillis: 1000,
};

const addMinutes = (date, minutes) => {
    return new Date(date.getTime() + minutes * 60000);
};

const execute = (element, countDownDate) => {
    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    element.innerHTML = minutes + "m " + seconds + "s ";
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        element.innerHTML = "Time is up!";
    }
};

const startTimer = (element) => {    
    const countDownDate = addMinutes(new Date(), 22);
    const timerId = setInterval(() => execute(element, countDownDate), options.timerIntervalInMillis);
    options.elementToTimer.set(element, timerId);
    console.log(`Started Timer for '${element.id}'`);
}

const stopTimer = (element) => {
    if (options.elementToTimer.has(element)) {
        clearInterval(options.elementToTimer.get(element))
        console.log(`Stopped Timer for '${element.id}'`);
        element.innerHTML = '';
    }
}

const onIntersect = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting > 0) {
            console.log(`Timer element became visible. id: '${entry.target.id}'`);
            startTimer(entry.target);
        } else {
            console.log(`Timer element became invisble. id: '${entry.target.id}'`);
            stopTimer(entry.target);
        }
    });
};

const registerIntersectionObserver = (element) => {
    console.log(`Registering IntersectionObserver on element: '${element.id}'`)
    const options = {
        root: document.querySelector('body'),
        rootMargin: '0px',
        threshold: 1.0
    }

    new IntersectionObserver(onIntersect, options).observe(element);
};

const init = () => {
    document.querySelectorAll('.timer').forEach(registerIntersectionObserver);
};

init();