
chrome.runtime.onMessage.addListener(function(message, sender, callback) {
    if (message.greeting == "hello") {
        let tabID = message.tabId;
        alert("listened");
        reload(tabID);
        while (true){
            check();
            setTimeout(reload(tabID),5000);
            chrome.storage.sync.get('state', function(data) {
                if (data.state == false)
                    return true;
            });
        }
    }
    return true;
});

function check(){
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (!mutation.addedNodes) {
                return;
            }
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                var x = mutation.addedNodes[i].classList;
                if (x != null)
                    if (x.contains("large-card")) {
                        //var price = items.getElementsByClassName('asset-price text-truncate')[0].textContent;
                        //alert(price);
                        check_price_and_buy();
                        disconnect();
                    }
            }
        });
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
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
function reload(tabID){
    var code = 'alert("ASDSA");'//'window.location.reload();';
    chrome.tabs.executeScript(tabID, {code: code});
}