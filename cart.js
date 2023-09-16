var removecartItemBtns = document.getElementById('delete')

for(var i = 0; i<removecartItemBtns.length; i++){
    var button = removecartItemBtns[i]
    button.addEventListner('click', function(){
        console.log('clicked')
        
    })
}

