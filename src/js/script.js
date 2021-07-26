const form = document.querySelector('.form_url');
const link = document.getElementById('link');
let divurls = document.querySelector('.urls');
let urls = [];

const short_url = async e =>{
    e.preventDefault();
    try{
        if(link.value){
            const api = `https://api.shrtco.de/v2/shorten?url=${link.value}`;
            const pet = await fetch(api);
            const resp = await pet.json();
            urls.push({'link': link.value, 'short_link': resp.result['full_short_link']});
            form.reset();
            showurls();
        }
    }catch(err){console.log(err)}

}

const showurls = () => {
    divurls.innerHTML = "";
    for(let i in urls){
        divurls.innerHTML += `
        <div class="urls__container">
          <p class="link_arr">${urls[i]['link']}</p>
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