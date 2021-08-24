window.onclose = WindowCloseHanlder;
function WindowCloseHanlder()
{   
    //chrome.storage.sync.set({state:false}, async function(){});
    return 'My Window is closing';
}

window.onload = check_on_load();
chrome.runtime.onMessage.addListener(function(message, sender, callback) {
    if (message.greeting == "reload") {
        window.location.reload();
    }
});
function check_on_load(){
    chrome.storage.sync.get(['state','reload_time'], function(data) {
        if (data.state == true){
            execute();
            setTimeout(function(){
                window.location.reload();
            },parseFloat(data.reload_time)*1000);
        }
    });
}
async function execute(){
    while(!document.querySelector(".large-card")) {
          await sleep(500);
        }
    return check_price_and_buy();
}
async function check_price_and_buy(){
    var first_item = document.getElementsByClassName('large-card')[0];
    let item_text_price = first_item.getElementsByClassName("asset-price text-truncate")[0].textContent;
    let item_price = parseFloat(item_text_price.split(' ')[0]);
    return new Promise((resolve,reject) => {
      chrome.storage.sync.get(['min_price','max_price'], async function(data) {
        min_price = data.min_price;
        max_price = data.max_price;
        if (item_price >= min_price && item_price <= max_price){
            //alert('OK BUY');
            let buy_button = first_item.getElementsByClassName('small-btn btn btn-primary')[0];
            buy_button.click();
            let confirm_button = document.getElementsByClassName('mt-4 btn btn-primary btn-block btn-lg')[0];
            confirm_button.click();
                while(!document.querySelector(".success")) {
                  await sleep(500);
                }
            
            resolve("buy");
        }
        else{
            //alert("TOO EXPENSIVE");
            reject("TOO EXPENSIVE");
        }
      });
    });
}
/*
function myLoop() {  
    chrome.storage.sync.get(['state','reload_time'], function(data) {
        setTimeout(function() {   //  call a 3s setTimeout when the loop is called
             //  your code here
                if (data.state == true){
                    myLoop(data.reload_time*1000);
                }
            }, 1000*data.reload_time);                    //  ..  setTimeout()
        });
}
*/

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}