window.onload = function(){
    // public variables
    var vLetter = document.getElementById('letter');
    var iSpeedInk = 5;

    // other variables
    var sText = document.getElementById('letter_src').innerHTML;
    var iCurChar = 0;
    var sChars = '<span>';
    var iCurInk = 0;
    var sCurCaret = '';
    var sCaret = "&nbsp;<img src='pen.gif' style='position:absolute' />";

    var doStep = function () {
        // current char
        var sChar = sText.charAt(iCurChar);

        // default char delay
        var iDelay = 120;

        if (sChar == '') {
            sCurCaret = '';
        } else if (sChar == '|') { // we use | symbol to emulate 'error' symbol
            sChar = '';
            sChars = sChars.substring(0, sChars.length-1);
            iDelay = 64;
        } else if (sChar == '<') { // pass tags
            var iPos = sText.indexOf('>', iCurChar);
            sChar = sText.substring(iCurChar, iPos + 1);
            iCurChar = iPos;
        } else if (sChar == '&') { // pass html entities
            var iPos = sText.indexOf(';', iCurChar);
            sChar = sText.substring(iCurChar, iPos + 1);
            iCurChar = iPos;
        } else if (sChar == '.') { // custom delay in case of . symbol
            iDelay = 300;
        } else if (sChar == ',') { // custom delay in case of , symbol
            iDelay = 100;
        } else if (sChar == ' ') { // custom delay in case of space symbol
            iDelay = 64;
        } else if (iCurChar > 5) {
            sCurCaret = sCaret;
        }

        // expenditure of ink
        if (sChar == ' ') {
            iCurInk += iSpeedInk;
            sChar = '</span><span style="color:RGB(' + (iCurInk) + ',' + (iCurInk) + ',' + (iCurInk) + ')">' + sChar;
        }

        if (document.getElementById('inkwell2').style.visibility == 'visible') {
            sCurCaret = sCaret;
            document.getElementById('inkwell2').style.visibility = 'hidden';
            sChar = '</span><span style="color:RGB(0,0,0)">' + sChar;
        }

        // refresh Ink
        if (iCurInk > 160) {
            iCurInk = 0;
            document.getElementById('inkwell2').style.visibility = 'visible';
            iDelay = 1000;
            sCurCaret = '';
        }

        // add current char to chars
        sChars += sChar;

        // hide the caret at the end of the letter
        if (iCurChar == sText.length - 1)
            sCurCaret = '';

        // update letter with new chars
        vLetter.innerHTML = sChars + sCurCaret;

        // goto next char
        iCurChar++;

        // next step
        if (iCurChar < sText.length) {
            setTimeout(doStep, 20 + iDelay);
        }
    }

    doStep();
};