const toastBody = document.querySelector('div#liveToast div div.toast-body')
const toastLiveExample = document.getElementById('liveToast')

document.addEventListener('click', evt => {
  // if(evt.target.dataset.duration) {
    const toast = new bootstrap.Toast(toastLiveExample)
    const textCopied = evt.target.innerText
    navigator.clipboard.writeText(textCopied)
    toastBody.innerText = `${textCopied} copied to clipboard`
    toast.show()
  // }
})