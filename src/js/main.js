//userek lekérése.
jQuery.getJSON('users', function (users) {
    console.log('users', users);
});
//Check user
function checkuser(user)
{
    if(user.role>4)
        {
            return true;
        }
    else{
        return false;
    }
}
