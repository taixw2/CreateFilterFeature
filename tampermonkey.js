if (!document.getElementById('create_fixture_tampermonkey')) {
  // if not delayed, the panel will not be displayed
  window.process = {
    env: 'development',
  }
  const timer = setInterval(() => {
    const container = document.querySelector('.uc-mlsContainer')
    if (!container) {
      return
    }
    clearInterval(timer)
    const scriptElement = document.createElement('script')
    scriptElement.src =
      'http://192.168.1.116:5000/build/rollup-react-typescript-eslint-starter.development.js?v=' + Date.now()
    console.log('scriptElement.src', scriptElement.src)
    document.body.appendChild(scriptElement)
  }, 1000)
}
