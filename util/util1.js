    class MyArrayUtil 
    {
        constructor(){}

        SearchByID(arr, id)
        {
            /*
            for( var i= 0; i < arr.length; i++)
            {
                if(arr[i].id == id)
                {
                    return(arr[i]);
                }
            }

            return(undefined);
            */
            
            var x = arr.find( function(obj) {
                    if (obj.id == id) 
                        return(obj);
                });
            return(x);
        }
    }

var au = new MyArrayUtil();
module.exports = au;
