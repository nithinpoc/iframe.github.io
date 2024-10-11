let Visitor_ID = getCookie('Visitor_ID');
console.log(Visitor_ID)
 if (Visitor_ID === null || localStorage.getItem("Visitor_ID") == null) {
    if (Visitor_ID != null) localStorage.setItem("Visitor_ID",Visitor_ID)
    else{
    setCookie("Visitor_ID", crypto.randomUUID(), .5)
    Visitor_ID = getCookie('Visitor_ID');
    }
}
document.getElementById('visitor_id').innerHTML = "This is your FingerprintJs VisitorID: " + Visitor_ID;
function setCookie(name, value, daysToLive) {
    let cookie = name + "=" + encodeURIComponent(value);
    localStorage.setItem(name,value)
    if(typeof daysToLive === "number") {
        cookie += "; max-age=" + (daysToLive*24*60*60);
        document.cookie = cookie;
    }
}

function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for(let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if(name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}


window.addEventListener('message', function (event) {
    const allowedOrigins = ['https://cyber-cookie-nutria.glitch.me'];

    // Only allow messages from allowed origins
    if (!allowedOrigins.includes(event.origin)) return;

    // Retrieve the stored visitor ID (if any)
    let visitorId = localStorage.getItem('Visitor_ID');

    // If no visitor ID exists, generate a new one
    if (!visitorId && event.data === 'request-visitor-id') {
        setCookie("Visitor_ID", crypto.randomUUID(), .5);
        visitorId = localStorage.getItem('Visitor_ID')
    }
    event.source.postMessage({ visitorId: visitorId }, event.origin);
}, false);



// window.onload = function () {
//     const iframe = document.createElement('iframe');
//     iframe.id = 'visitorIdIframe';
//     iframe.src = 'https://small-panoramic-zinc.glitch.me';
//     iframe.style.display = 'none';  // Hidden iframe
//     document.body.appendChild(iframe);

//     // Once the iframe is loaded, request the visitor ID
//     iframe.onload = requestVisitorId;
// };

// function requestVisitorId() {
//     const iframe = document.getElementById('visitorIdIframe');
//     window.addEventListener('message', function (event) {
//         if (event.origin !== 'https://central-service.com') return;

//         const visitorId = event.data.visitorId;
//         if (visitorId) {
//             console.log('Received Visitor ID:', visitorId);
//             localStorage.setItem('visitor_id', visitorId);
//         }
//     }, false);
//     iframe.contentWindow.postMessage('request-visitor-id', 'https://central-service.com');
// }
