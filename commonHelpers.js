import{S as v,i as c,a as m}from"./assets/vendor-eeed083b.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();const h=new v(".gallery a",{captionsData:"alt",captionDelay:250}),u=document.querySelector(".gallery"),y=document.querySelector(".loader-wrapper"),w=document.querySelector("#search-form");w.addEventListener("submit",S);let f=1,i="";async function p(t,e=1){m.defaults.baseURL="https://pixabay.com/api/";const a={params:{key:"42088137-23c74c59277fc3ae3a179e24d",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e}};try{return await m.get("",a)}catch(n){console.log(n)}}async function S(t){if(t.preventDefault(),b(),u.innerHTML="",f=1,i=t.currentTarget.elements.searchQuery.value.trim(),!i){c.error({message:"Please enter a valid search query"});return}try{const{data:{hits:e,totalHits:a}}=await p(i);if(e.length===0)return c.error({message:"Sorry, there are no images matching your search query. Please try again!"});u.innerHTML=g(e),h.refresh(),document.querySelector(".load-more").classList.remove("is-hidden"),e.length<a?s.classList.remove("is-hidden"):(s.classList.add("is-hidden"),L(a))}catch(e){console.log(e)}finally{l()}}function g(t){return t.length===0?"No images found":t.map(e=>`			
   <li class='photo-card'>	
    <a href='${e.largeImageURL}'>	
      <img src='${e.webformatURL}' alt='${e.tags}' loading='lazy' />
    </a>				
    <div class='info'>		
      <p class='info-item'>	
        <b>Likes ${e.likes}</b>	
      </p>			
      <p class='info-item'>	
        <b>Views ${e.views}</b>	
      </p>			
      <p class='info-item'>	
        <b>Comments ${e.comments}</b>
      </p>			
      <p class='info-item'>	
        <b>Downloads ${e.downloads}</b>
      </p>
    </div>
  </li>
  `).join("")}function b(){y.classList.remove("is-hidden")}function l(){y.classList.add("is-hidden")}const s=document.createElement("button");s.classList.add("load-more","is-hidden");s.innerHTML="Load more";s.addEventListener("click",async()=>{f++,b();try{const{data:{hits:t,totalHits:e}}=await p(i,f);t.length>0&&(u.insertAdjacentHTML("beforeend",g(t)),h.refresh()),t.length<e?l():(l(),s.style.display="none",L(e))}catch(t){console.log(t),l()}});document.body.appendChild(s);function L(t){t===0?c.error({message:"We're sorry, but there are no search results."}):(c.error({message:"We're sorry, but you've reached the end of search results."}),s.style.display="none")}
//# sourceMappingURL=commonHelpers.js.map
