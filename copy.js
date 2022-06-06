window.onload=function(){
    console.log('Jurishacker funcionando. Happy hacking!')
    
    if(document.URL.indexOf('busca?')!=-1){
        getJurisInSearchPage()
    }else{
        getJurisInPage()
    }

}
const getJurisInSearchPage = () => {
    var jurisprudencias = document.querySelectorAll('.JurisprudenceSnippet-decisionFacts-content p span'); 
    jurisprudencias.forEach((element, index) => { 
    element.addEventListener('click',function(){
        let check = localStorage.getItem('jurisprudencia');
        let jurisContent = element.innerText;
        let jurisParent = element.closest('div[data-doc-artifact="JURISPRUDENCIA"]')
        let jurisTitle = jurisParent.querySelector('h2').innerText
        let jurisDate = jurisParent.querySelector('.BaseSnippetWrapper-date').innerText
            console.log(jurisContent); 
            navigator.clipboard.writeText(jurisContent); 
            
            localStorage.setItem('jurisprudencia', jurisContent);
        chrome.storage.local.set({'juris': 
            `${jurisTitle}
${jurisDate}

`+jurisContent
        });
        chrome.storage.local.set({'pageInfos': document.URL+'${end}'+new Date()});
            alert('Jurisprudência copiada!')

    });
    element.addEventListener('mouseenter', e => {
        element.style.textDecoration = 'underline'
        element.style.textDecorationColor = 'blue'
        element.style.cursor = 'pointer'
        
    })
    element.addEventListener('mouseleave', e => {
        element.style.textDecoration = 'none'
        element.style.cursor = 'default'
    })
    
    })
}

const getJurisInPage = () => {
    const contents = document.querySelector('div[data-doc-artifact] article'); contents.addEventListener('mouseenter', e => {
        contents.style.textDecoration = 'underline'
        contents.style.textDecorationColor = 'blue'
        contents.style.cursor = 'pointer'
        
    }); 
    contents.addEventListener('mouseleave', e => {
        contents.style.textDecoration = 'none'
        contents.style.cursor = 'default'
    }); 
    contents.addEventListener('click', e => { 
        e.preventDefault(); 
        console.log(contents.innerText); 
        navigator.clipboard.writeText(contents.innerText); 
        localStorage.setItem('jurisprudencia', contents.innerText);
        chrome.storage.local.set({'juris': contents.innerText});
        chrome.storage.local.set({'pageInfos': document.URL+'${end}'+new Date()});
        alert('Jurisprudência copiada!') 
    })
}