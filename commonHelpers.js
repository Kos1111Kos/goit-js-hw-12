import{S as g,i as l,a as d}from"./assets/vendor-eeed083b.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const L=new g(".gallery a",{captionsData:"alt",captionDelay:250}),u=document.querySelector(".gallery"),m=document.querySelector(".loader-wrapper"),b=document.querySelector("#search-form");b.addEventListener("submit",v);async function f(t,e=1){d.defaults.baseURL="https://pixabay.com/api/";const s={params:{key:"42088137-23c74c59277fc3ae3a179e24d",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e}};try{return await d.get("",s)}catch(a){console.log(a)}}async function v(t){t.preventDefault(),y(),u.innerHTML="";const e=t.currentTarget.elements.searchQuery.value.trim();if(!e){l.error({message:"Please enter a valid search query"});return}try{const{data:{hits:s,totalHits:a}}=await f(e);if(s.length===0)return l.error({message:"Sorry, there are no images matching your search query. Please try again!"});u.innerHTML=h(s),L.refresh(),document.querySelector(".load-more").classList.remove("is-hidden"),s.length<a?n.classList.remove("is-hidden"):(n.classList.add("is-hidden"),p(a))}catch(s){console.log(s)}finally{i()}}function h(t){return t.length===0?"No images found":t.map(e=>`			
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
  `).join("")}function y(){m.classList.remove("is-hidden")}function i(){m.classList.add("is-hidden")}const n=document.createElement("button");n.classList.add("load-more","is-hidden");n.innerHTML="Load more";n.addEventListener("click",async()=>{y();try{const{data:{hits:t,totalHits:e}}=await f(searchQuery);t.length>0&&(insertAdjacentHTML+=h(t),simpleLightbox.refresh()),t.length<e?i():(i(),n.classList.add("is-hidden"),p(e))}catch(t){console.log(t),i()}});document.body.appendChild(n);function p(t){t===0?l.error({message:"We're sorry, but there are no search results."}):(l.error({message:"We're sorry, but you've reached the end of search results."}),document.getElementById("loadMoreEl").style.display="none")}
//# sourceMappingURL=commonHelpers.js.map
