let changeColor       = document.getElementById('changeColor');
let set_control         = document.getElementById('set_control');
let min_price         = document.getElementById("min_price");
let max_price         = document.getElementById("max_price");
let tabId = 0
let button1           = document.getElementById('button1');
let reload_time     = document.getElementById("reload_time");

let state = false;
function set_min_price(){
    chrome.storage.sync.set({min_price:min_price.value}, function(){});
}
function set_max_price(){
    chrome.storage.sync.set({max_price:max_price.value}, function(){});
}
function set_reload_time(){
    chrome.storage.sync.set({reload_time:reload_time.value}, function(){});
}
min_price.addEventListener("input", set_min_price);
max_price.addEventListener("input", set_max_price);
reload_time.addEventListener("input", set_reload_time);

chrome.storage.sync.get(['min_price','max_price','state','reload_time'], function(data) {
    min_price.value = data.min_price;
    max_price.value = data.max_price;
    reload_time.value = parseFloat(data.reload_time);
    if (data.state == true)
        disable_button();
    else enable_button();
});
async function get_status(){
    return await chrome.storage.sync.get(['min_price','max_price','state'], function(data) {
        return data.state;
    });
}
set_control.onclick = async function(){
    if (set_control.innerText == 'Enable'){
        chrome.storage.sync.set({state:true}, async function(){
            disable_button(); 
            button1.click();
        });
    }
    else if (set_control.innerText == 'Disable'){
        chrome.storage.sync.set({state:false}, function(){
            enable_button();
        });
    }
}

function myLoop() {         //  create a loop function
    setTimeout(function() {   //  call a 3s setTimeout when the loop is called
    execute(); //  your code here
    chrome.storage.sync.get('state', function(data) {
        if (data.state == true){
            button1.click();
            myLoop();
        }
    });                    //  ..  setTimeout()
    }, 1000*reload_time.value);
}
    
async function execute(){
    await chrome.tabs.executeScript(
        {code: "window.location.reload();"}
    );
}

function disable_button(){
    set_control.innerText = "Disable";
    set_control.style.backgroundColor = "brown";
    state = true;
}
function enable_button(){
    set_control.innerText = "Enable";
    set_control.style.backgroundColor = "green";
    state = false;
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


//usage:
function popup(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "reload", reload_time:reload_time.value});
    });
}
document.addEventListener("DOMContentLoaded", function() {
    button1.addEventListener("click", popup);
});