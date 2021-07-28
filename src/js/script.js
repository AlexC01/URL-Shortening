const form = document.querySelector('.form_url');
const link = document.getElementById('link');
const errorText = document.querySelector('.error_text');
let loader = document.createElement('div');
let divurls = document.querySelector('.urls');
let urls = [];

const navbar = () => {
    let x = document.getElementById("Nav");
    if (x.className === "nav") {
        x.className += " responsive";
    } else {
        x.className = "nav";
    }
}

const short_url = async e =>{
    e.preventDefault();
    try{
        if(link.value){
            link.classList.remove('error');
            errorText.textContent = '';
            loader.classList.add('loader');
            divurls.appendChild(loader);
            const api = `https://api.shrtco.de/v2/shorten?url=${link.value}`;
            const pet = await fetch(api);
            const resp = await pet.json();
            urls.push({'link': link.value, 'short_link': resp.result['full_short_link']});
            form.reset();
            showurls();
        }else{
            link.classList.add('error');
            errorText.textContent = 'Please add a link';
        }
    }catch(err){console.log(err)}

}

const showurls = () => {
    divurls.removeChild(loader);
    divurls.innerHTML = "";
    for(let i in urls){
        divurls.innerHTML += `
        <div class="urls__container">
          <p class="link_arr">${urls[i]['link']}</p>
          <div class="linea"></div>
          <div>
            <p class="short__link">${urls[i]['short_link']}</p>
            <button class="copy_button" onclick="copyClip(${i})">Copy</button>
          </div>
        </div>
        `;
    }
}

const copyClip = id => {
    const cb = navigator.clipboard;
    const copy_button = document.querySelectorAll('.copy_button');
    const link_toCopy = document.querySelectorAll('.short__link');
    cb.writeText(link_toCopy[id].textContent);
    copy_button[id].setAttribute('id', 'button_copied');
    copy_button[id].textContent = 'Copied!';
    setTimeout(() => {
        copy_button[id].removeAttribute('id');
        copy_button[id].textContent = 'Copy';
    }, 4000)
}

form.addEventListener('submit', short_url);