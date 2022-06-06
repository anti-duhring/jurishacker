window.onload=function(){
  console.log(chrome.storage.local.get('juris'))


  document.querySelector('#clear').addEventListener('click', () => {
    clearStoreJuris()
  })
  /*if(!chrome.storage.local.get('juris')){
    chrome.storage.local.set({'juris': 'Clique em alguma jurisprudência para copiar...'});
    document.querySelector('#juriscontent').value = 'Clique em alguma jurisprudência para copiar...';

    
  }
  if(!chrome.storage.local.get('pageInfos')){
    chrome.storage.local.set({'pageInfos': ' ${end} '});
    document.querySelector('#juriscontent').value = 'Clique em alguma jurisprudência para copiar...';
  }*/
  chrome.storage.local.get('juris', (result) => {
    let juris = result.juris;
    if(!juris){
      chrome.storage.local.set({'juris': 'Clique em alguma jurisprudência para copiar...'});
      document.querySelector('#juriscontent').value = 'Clique em alguma jurisprudência para copiar...';
      return
    }
    document.querySelector('#juriscontent').value = juris
  });
  chrome.storage.local.get('pageInfos', (result) => {
    let pageInfos = result.pageInfos;
    if(!pageInfos) return
    let date = pageInfos.split('${end}')[1];
    let url = pageInfos.split('${end}')[0];
    document.querySelector('.link-item').innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
    document.querySelector('.data-item').innerHTML = date;
  });
  const clearStoreJuris = () => {
    chrome.storage.local.remove(["juris","pageInfos"],function(){
      var error = chrome.runtime.lastError;
         if (error) {
             console.error(error);
             return
         }
         document.location.reload(true)
     })
  }

}
// When the button is clicked, inject setPageBackgroundColor into current page
/*changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});*/

// The body of this function will be execuetd as a content script inside the
// current page
/*function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}*/
