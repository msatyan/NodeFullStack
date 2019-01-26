    class MyArrayUtil
    {
        constructor(){}

        SearchByID(arr, id)
        {
            var x = arr.find( function(obj) {
                    if (obj.id == id)
                        return(obj);
                });
            return(x);
        }

        GetIndexByID(arr, id)
        {
            for( var i= 0; i < arr.length; i++)
            {
                if(arr[i].id == id)
                {
                    return(i);
                }
            }

            return(undefined);
       }
    }

var au = new MyArrayUtil();
module.exports = au;
