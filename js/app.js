window.doConvert = function () {
    // turn the input number into the textual equivalent
    // e.g. 104 = one hundred and four
    var numberInput = Number(document.getElementById("numberInput").value);
    if(numberInput == ''){
        alert("Please enter a number");
        return false;
    }
    var outputText = '';
    var single = { 0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine' };
	var ten_ = { 1: 'eleven', 2: 'twelve', 3: 'thirteen', 4: 'fourteen', 5: 'fifteen', 6: 'sixteen', 7: 'seventeen', 8: 'eighteen', 9: 'nineteen' };
	var tens = { 1: 'ten', 2: 'twenty', 3: 'thirty', 4: 'fourty', 5: 'fifty', 6: 'sixty', 7: 'seventy', 8: 'eighty', 9: 'ninety' };
		
    var isSingle = function(num){
	    return (num_string(num).length == 1) ? single[num] : false;
	}

    var isDouble = function(num){
        return (num_string(num).length == 2);
    }

    var isTriple = function(num){
        var a = '';
        if (num_string(num).length == 3) {
            var b = isSingle(num_string(num)[0]);
            a += b + ' hundred'; 
            var c = Number(num_string(num).substring(1, num_string(num).length));
            c = isSingle(c) || isTens_(c);
            if (c && c!='zero'){
                a += ' and ' + c;
            }
        } else {
            a = false;
        }
        return a;
    }

    var isThousand = function(num){
        var a = '';
        if (num_string(num).length == 4 ) {
            var b = isSingle(num_string(num)[0]);
            a += b + ' thousand';
            var c = Number(num_string(num).substring(1, num_string(num).length));
            c = isSingle(c) || isTens_(c) || isTriple(c);
            if (c && c!='zero'){
                a += ' ' + c;
            }
        } else {
            a = false;
        }
        return a;
    }

    var isTens_Thousand = function(num){
        var a = '';
        if (num_string(num).length == 5) {
            var b = isTens_(num_string(num).substring(0,2));
            a += b + ' thousand';
            var c = Number(num_string(num).substring(2, num_string(num).length));
            c = isSingle(c) || isTens_(c) || isTriple(c);
            if (c && c!='zero'){
                a += ' ' + c;
            }
        } else {
            a = false;
        }
        return a;
    }

    var isHundreds_Thousand = function(num){
        var a = '';
        if (num_string(num).length == 6) {
            var b = isTriple(num_string(num).substring(0,3));
            a += b + ' thousand';
            var c = Number(num_string(num).substring(3, num_string(num).length));
            c = isSingle(c) || isTens_(c) || isTriple(c) || isTens_Thousand(c);
            if (c && c!='zero'){
                a += ' and ' + c;
            }
        } else {
            a = false;
        }
        return a;
    }

    var isMillion = function(num){
        var a = '';
        if (num_string(num).length == 7) {
            var b = isSingle(num_string(num).substring(0,1));
            console.log(b)
            a += b + ' million';
            var c = Number(num_string(num).substring(4, num_string(num).length));
            c = isSingle(c) || isTens_(c) || isTriple(c) || isTens_Thousand(c) || isHundreds_Thousand(c);
            if (c && c!='zero'){
                a += ' and ' + c;
            }
        } else {
            a = false;
        }
        return a;
    }

    var isTens_ = function(num){
        //(typeof(num_string(num)[1]) == 'undefined') && num_string(num)[1] != 1
        var a = '';
        if (isDouble(num_string(num)) && num_string(num)[0] == 1 && num != 10){
            a = ten_[num_string(num)[1]];
        }else if (isDouble(num_string(num)) ){
            a = tens[num_string(num)[0]];
            if (num_string(num)[1] != 0){
                a += ' ' + single[num_string(num)[1]];
            }
        }else{
            a = false;
        }
        return a;
    }

    var num_string = function(num){
        return String(num);
    }

    outputText = isSingle(numberInput) || 
                isTens_(numberInput) || 
                isTriple(numberInput) || 
                isThousand(numberInput) || 
                isTens_Thousand(numberInput) || 
                isHundreds_Thousand(numberInput) || 
                isMillion(numberInput) || 
                "Opps, didnt get that far!";


    var mydiv = document.getElementById("result");
    mydiv.innerHTML = outputText;
}