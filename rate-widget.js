window.onload = () => {
    initLocalStorageValue()
    initWidgetScore()
}

// initialisation of store / variables / consts

const store = {
    score: 324,
    initialScore: 324,
    formValue: '',
    increaseScore: () => store.score += 1,
    decreaseScore: () => store.score -= 1,
    resetScore: () => store.score = store.initialScore,
    setFormValue: (formValue) => store.formValue = formValue
}

const rateState = null

const widgetScore = document.getElementById('rate-widget-score'),
      likeAction = document.getElementById('rate-widget-like'),
      dislikeAction = document.getElementById('rate-widget-dislike'),
      dislikeTextfield = document.getElementById('rate-widget-dislike-textfield'),
      dislikeForm = document.getElementById('rate-widget-dislike-form')

const LIKE_ACTIVE_CLASS = 'like-active',
      DISLIKE_ACTIVE_CLASS = 'dislike-active'

// assign listeners

likeAction.addEventListener('click', () => {
    this.rateState = true
    handleRateWidgetState()
    hideDislikeFormAnimation()
})

dislikeAction.addEventListener('click', () => {
    this.rateState = false
    handleRateWidgetState()
    showDislikeFormAnimation()
})

dislikeTextfield.addEventListener('input', (event) => {
    store.setFormValue(event.target.value)
})

dislikeForm.addEventListener('onsubmit', (event) => {
    event.preventDefault()

    dislikeTextfield.value = ''
}, true)


// methods
function handleRateWidgetState () {
    localStorage.setItem('rateState', this.rateState)
    this.resetWidgetScore()

    if (this.rateState) {
        store.increaseScore()
        dislikeAction.classList.remove(DISLIKE_ACTIVE_CLASS)
        likeAction.classList.add(LIKE_ACTIVE_CLASS)
    } else {
        store.decreaseScore()
        likeAction.classList.remove(LIKE_ACTIVE_CLASS)
        dislikeAction.classList.add(DISLIKE_ACTIVE_CLASS)
        showDislikeFormAnimation()
    }

    this.initWidgetScore()
}

function initLocalStorageValue () {
    const parsedRateState = JSON.parse(localStorage.getItem('rateState'))

    if (typeof parsedRateState === 'boolean') {
        this.rateState = parsedRateState
        handleRateWidgetState()
    }
}

function showDislikeFormAnimation () {
    dislikeForm.style.transition = 'all 330ms ease-out'
    dislikeForm.style.transform = 'none'
}

function hideDislikeFormAnimation () {
    dislikeForm.style.transform = 'translateX(200%)'
    dislikeForm.style.transition = 'all 300ms ease-in'
}

function initWidgetScore () {
    widgetScore.textContent  = store.score   // seems like unsafe way but its fine in our case
}

function resetWidgetScore () {
    store.resetScore()
    initWidgetScore()
}

function submit () {
    console.log('test submit')
}
