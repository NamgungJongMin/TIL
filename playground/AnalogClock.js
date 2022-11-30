const date = new Date();
const state = {
  hourBySeconds: (date.getHours() % 12) * 60 ** 2,
  minuteBySeconds: date.getMinutes() * 60,
  seconds: date.getSeconds(),
  clocks: [],
};
let timerId = 0;
let { hourBySeconds, minuteBySeconds, seconds, clocks } = state;

// prettier-ignore
const setHandPosition = $clock => {
  $clock.querySelector('.hour').style.setProperty('--deg', ((hourBySeconds + minuteBySeconds + seconds) / (60 ** 2 * 12)) * 360);
  $clock.querySelector('.minute').style.setProperty('--deg', ((minuteBySeconds + seconds)/(60**2))*360);
  $clock.querySelector('.second').style.setProperty('--deg', (seconds / 60) * 360);
};

const render = $clock => {
  $clock.innerHTML = `
    <div class="hand hour"></div>
    <div class="hand minute"></div>
    <div class="hand second"></div>
    <div class="time time1">|</div>
    <div class="time time2">|</div>
    <div class="time time3">|</div>
    <div class="time time4">|</div>
    <div class="time time5">|</div>
    <div class="time time6">|</div>
    <div class="time time7">|</div>
    <div class="time time8">|</div>
    <div class="time time9">|</div>
    <div class="time time10">|</div>
    <div class="time time11">|</div>
    <div class="time time12">|</div>
    `;

  setHandPosition($clock);
};

const moveClock = () => {
  if (timerId) clearInterval(timerId);

  timerId = setInterval(() => {
    seconds += 1;

    if (seconds === 60) {
      seconds = 0;
      minuteBySeconds += 60;
    }
    if (minuteBySeconds === 3600) {
      minuteBySeconds = 0;
      hourBySeconds += 3600;
    }

    clocks.forEach($clock => {
      setHandPosition($clock);
    });
  }, 1000);
};

const AnalogClock = $clock => {
  console.log(new Date());
  clocks = [...clocks, $clock];
  render($clock);
  moveClock($clock);
};
export default AnalogClock;
