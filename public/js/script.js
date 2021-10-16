const toastBody = document.querySelector('div#liveToast div div.toast-body')
const toastLiveExample = document.getElementById('liveToast')

document.addEventListener('click', evt => {
  const textCopied = evt.target.parentElement.dataset.macAddress

  const options = {
    animatio: true,
    delay: 1000
  }

  if (evt.target.parentElement.dataset.macAddress) {
    const toast = new bootstrap.Toast(toastLiveExample, options)
    navigator.clipboard.writeText(textCopied)
    toastBody.innerText = `${textCopied} copied to clipboard`
    toast.show()
  }
})