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
            <p>${urls[i]['short_link']}</p>
            <button>Copy</button>
          </div>
        </div>
        `;
    }
}

form.addEventListener('submit', short_url);