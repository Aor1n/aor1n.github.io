window.onload = () => {
    initLocalStorageValue()
    initWidgetScore()
    initSubmittedFormActions()
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

let rateState = null,
    reviewState = null,
    parsedWidgetReviewState = null,
    parsedWidgetRateState = null

const widgetContainer = document.querySelector('#rate-widget-container'),
      widgetScore = document.querySelector('#rate-widget-score'),
      likeAction = document.querySelector('#rate-widget-like'),
      dislikeAction = document.querySelector('#rate-widget-dislike'),
      dislikeTextfield = document.querySelector('#rate-widget-dislike-textfield'),
      dislikeForm = document.querySelector('#rate-widget-dislike-form')

const LIKE_ACTIVE_CLASS = 'like-active',
      DISLIKE_ACTIVE_CLASS = 'dislike-active',
      NO_POINTER_EVENTS_CLASS = 'no-pointer-events'

const WIDGET_RATE_STATE_KEY = 'widgetRateState',
      WIDGET_REVIEW_KEY = 'widgetReviewState'

// assign of listeners
likeAction.addEventListener('click', () => {
    rateState = true
    reviewState = false
    handleRateWidgetState()
})

dislikeAction.addEventListener('click', () => {
    rateState = false
    reviewState = false
    handleRateWidgetState()
})

dislikeTextfield.addEventListener('input', (event) => {
    store.setFormValue(event.target.value)
})

dislikeForm.addEventListener('submit', (event) => {
    event.preventDefault()

    submitForm(store.formValue)
})

// helpers
const isBoolean = (value) => typeof value === 'boolean'

// methods
function handleRateWidgetState (isFormSubmitted = false) {
    localStorage.setItem(WIDGET_RATE_STATE_KEY, rateState)
    localStorage.setItem(WIDGET_REVIEW_KEY, reviewState)
    resetWidgetScore()

    if (rateState === true) {
        store.increaseScore()
        initWidgetScore()
        if (isFormSubmitted) return

        dislikeAction.classList.remove(DISLIKE_ACTIVE_CLASS, NO_POINTER_EVENTS_CLASS)
        likeAction.classList.add(LIKE_ACTIVE_CLASS, NO_POINTER_EVENTS_CLASS)
        animatedFormDisappearance()
    } else if (rateState === false) {
        store.decreaseScore()
        initWidgetScore()
        if (isFormSubmitted) return

        likeAction.classList.remove(LIKE_ACTIVE_CLASS, NO_POINTER_EVENTS_CLASS)
        dislikeAction.classList.add(DISLIKE_ACTIVE_CLASS, NO_POINTER_EVENTS_CLASS)
        animatedFormAppearance()
    }
}

function initLocalStorageValue () {
    parsedWidgetReviewState = JSON.parse(localStorage.getItem(WIDGET_REVIEW_KEY))
    parsedWidgetRateState = JSON.parse(localStorage.getItem(WIDGET_RATE_STATE_KEY))

    if (isBoolean(parsedWidgetReviewState)) {
        reviewState = parsedWidgetReviewState
    }

    if (isBoolean(parsedWidgetRateState)) {
        rateState = parsedWidgetRateState
        handleRateWidgetState(reviewState)
    }
}

function initWidgetScore () {
    widgetScore.textContent = store.score   // seems like unsafe way but its fine in our case
}

function initSubmittedFormActions () {
    if (parsedWidgetRateState === true) {
        likeAction.classList.add(LIKE_ACTIVE_CLASS, NO_POINTER_EVENTS_CLASS)
        dislikeAction.classList.add(NO_POINTER_EVENTS_CLASS)
    }

    if (parsedWidgetRateState === false) {
        dislikeAction.classList.add(DISLIKE_ACTIVE_CLASS, NO_POINTER_EVENTS_CLASS)
        likeAction.classList.add(NO_POINTER_EVENTS_CLASS)
    }

    if ((isBoolean(parsedWidgetRateState)) && parsedWidgetReviewState === false) return

    handleRateWidgetState(true)
}

function resetWidgetScore () {
    store.resetScore()
    initWidgetScore()
}

function submitForm (formData) {
    if (formData === '') return

    reviewState = true
    localStorage.setItem(WIDGET_REVIEW_KEY, reviewState)
    dislikeTextfield.value = ''
    initSubmittedFormActions()
    animatedFormDisappearance()
}

// animations
function animatedFormAppearance () {
    widgetContainer.style.transition = 'max-height 0.25s ease-in'
    widgetContainer.style.maxHeight = '250px'
    dislikeForm.style.transform = 'none'
    dislikeForm.style.transition = 'all 330ms ease-out'
}

function animatedFormDisappearance () {
    widgetContainer.style.transition = 'max-height 0.15s ease-out'
    widgetContainer.style.maxHeight = '100px'
    dislikeForm.style.transform = 'translateX(200%)'
    dislikeForm.style.transition = 'all 300ms ease-in'
}

