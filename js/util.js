window.onload = function(e){
    var showComment = document.getElementById('show-comment');
    showComment.addEventListener('click',function(e) {
        var commentStyle = document.getElementById('comment').style;
        if(commentStyle.display == "block"){
            commentStyle.display = "none";
            showComment.innerHTML = "显示发言";
        }else{
            commentStyle.display = "block";
            showComment.innerHTML = "折叠发言";            
        }
    },false);
};
