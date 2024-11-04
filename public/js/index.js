window.onload = function(){
    var rfidInput = document.getElementById("rfid_input");

    function scanning(){
        rfidInput.focus();
    }

    var scanButton = document.getElementById("scan_button")
    scanButton.addEventListener("click", function(){
        scanning();
    })
}