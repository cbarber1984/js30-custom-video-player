/* Get our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const expands = document.querySelectorAll('.expand');

const ranges = player.querySelectorAll('.player__slider');

/* Setup Functions */
function togglePlay(){
    // if paused, call .play()
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton(){
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip(){
    console.log(this.dataset);
    video.currentTime += parseFloat(this.dataset.skip)
};

function handleRangeUpdate(){
    video[this.name] = this.value;
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(e)   
}

function toggleScreen(){
    console.log('toggleScreen');
        if(video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen){
            video.webkitRequestFullscreen();
        } else if (Element.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    }


/* Hook up Event Listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))
progress.addEventListener('click', scrub)
let mousedown = false;
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', ()=> mousedown = true);
progress.addEventListener('mouseup', ()=> mousedown = false);
let isFullscreen = false;
expands.forEach(expand => expand.addEventListener('click', toggleScreen))
toggle.addEventListener('click', togglePlay);