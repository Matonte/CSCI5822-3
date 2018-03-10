var fs = require('fs');
var path = require('path');

// Main routine to process all files in a directory
// Recursive - will be called on subdirectories as well
var processDir = function(dir, callback)
{
    console.log("Reading directory: ",dir);
    var total_size = 0;
    fs.readdir(dir, function(err, list)
    {
        if (err) return callback(err);

        var i = 0;

        // Iterate over this directory
        (function iterate()
        {
            var file = list[i++];
            if (!file)
            {
                // Done in this directory, call the callback function
                return callback(null, total_size);
            }
            console.log("Reading stat for file ", file);
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat)
            {
                if (err) throw err;
                if (stat && stat.isDirectory())
                {
                    // Found a sub-directory, recursively process it
                    processDir(file, function(err, res)
                    {
                        // Add the size from the sub-directory
                        total_size = total_size + res;
                        iterate();
                    });
                }
                else
                {
                  console.log("Adding size ",stat.size, "for file", file);
                  total_size = total_size + stat.size;
                  iterate();
                }
            });
        })();
    });
};

process.argv.slice(2).forEach(function(arg)
{
    console.log("Argument supplied is:",arg);

    //  1. Check that arg passed in is a directory
    fs.lstat(arg,function(err,stats)
    {
       if (err)
       {
           console.log("Error:", err); 
           throw err; //FIXME! - Error handling
       }

       // 2. Check that the arg is a directory
       if (stats.isDirectory())
       {
           processDir(arg, function(err, results) {
               if (err)
               {
                   // FIXME! - Cleanup error message
                   console.log("Error: ", err);
                   throw err;
               }
               console.log("Total Size: ",results);
           });
        }
        else
        {
           // FIXME! - Cleanup error message
           console.log("Error: Not a directory"); 
        }
    });
});
