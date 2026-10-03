const C='carte-v1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const q=e.request;
 if(q.method!=='GET'||new URL(q.url).origin!==location.origin||!q.url.startsWith(self.registration.scope))return;
 const copie=()=>caches.match(q.url,{ignoreSearch:true});
 e.respondWith(fetch(q.url,{cache:'no-cache'}).then(r=>{if(r.ok){const c=r.clone();caches.open(C).then(k=>k.put(q.url.split('?')[0],c)).catch(()=>{});return r}
   return copie().then(m=>m||r)}).catch(()=>copie().then(m=>m||Response.error())))});
