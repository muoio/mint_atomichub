let changeColor       = document.getElementById('changeColor');
let set_control         = document.getElementById('set_control');
let min_price         = document.getElementById("min_price");
let max_price         = document.getElementById("max_price");
let tabId = 0
let button1           = document.getElementById('button1');
function set_min_price(){
    chrome.storage.sync.set({min_price:min_price.value}, function(){});
}
function set_max_price(){
    chrome.storage.sync.set({max_price:max_price.value}, function(){});
}
min_price.addEventListener("input", set_min_price);
max_price.addEventListener("input", set_max_price);

chrome.storage.sync.get(['min_price','max_price','state'], function(data) {
    min_price.value = data.min_price;
    max_price.value = data.max_price;
    if (data.state == true)
        disable_button();
    else enable_button();
});

set_control.onclick = async function(){
    if (set_control.innerText == 'Enable'){
        chrome.storage.sync.set({state:true}, function(){
            disable_button(); 
            execute();
        });
    }
    else if (set_control.innerText == 'Disable'){
        chrome.storage.sync.set({state:false}, function(){
            enable_button();
        });
    }
}

async function execute(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {file: "js/script.js"}
        );
    });
}

function disable_button(){
    set_control.innerText = "Disable";
    set_control.style.backgroundColor = "brown";
}
function enable_button(){
    set_control.innerText = "Enable";
    set_control.style.backgroundColor = "green";
}
//usage:
/*function popup(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello", tabId:tabs[0].id});
    });
}
document.addEventListener("DOMContentLoaded", function() {
    button1.addEventListener("click", popup);
});*/