function get_state(){
    return chrome.storage.sync.get('state', function(data) {
        return data.state;
    });
}
$(document).ready(function() {
    document.querySelector(".large-card").onload = function() { 
        alert("ASDASD");
    };
});
execute();
function execute(){
    setTimeout(function() {
        window.location.reload();
    }, 1000);
}



function waitForElementToDisplay(selector, callback, checkFrequencyInMs, timeoutInMs) {
  var startTimeInMs = Date.now();
  (function loopSearch() {
    if (document.querySelector(selector) != null) {
      callback();
      return;
    }
    else {
      setTimeout(function () {
        if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs)
          return;
        loopSearch();
      }, checkFrequencyInMs);
    }
  })();
  return ;
}
//window.onload = setTimeout(check_price_and_buy,5000);

function check_price_and_buy(){
    var first_item = document.getElementsByClassName('large-card')[0];
    let item_text_price = first_item.getElementsByClassName("asset-price text-truncate")[0].textContent;
    let item_price = parseFloat(item_text_price.split(' ')[0]);
    chrome.storage.sync.get(['min_price','max_price'], function(data) {
        min_price = data.min_price;
        max_price = data.max_price;
        if (item_price >= min_price && item_price <= max_price){
            alert('OK BUY');
            /*let buy_button = first_item.getElementsByClassName('small-btn btn btn-primary')[0];
            buy_button.click();
            let confirm_button = document.getElementsByClassName('mt-4 btn btn-primary btn-block btn-lg')[0];
            confirm_button.click();*/
        }
        else{
            alert("TOO EXPENSIVE");
        }
    });
}
async function reload(){
    window.location.reload();
}
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }