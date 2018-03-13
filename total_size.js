// CSCSI 5828 - Spring 2018
// Homework #3
// Matt Weber, Michael Matonte

var fs = require('fs'),
path = require('path'),
async = require('async');

function readSizeRecursive(item, cb)
{
    fs.lstat(item, function(err, stats)
    {
        if (!err && stats.isDirectory())
        {
            var total = 0;

            fs.readdir(item, function(err, list)
            {
                if (err) return cb(err);

                async.forEach( list, function(diritem, callback)
                {
                    readSizeRecursive(path.join(item, diritem), function(err, size)
                    {
                        total += size;
                        callback(err);
                    });
                },
                function(err)
                {
                    cb(err, total);
                });
            });
        }
        else
        {
            if (err)
            {
                cb(err);
            }
            else
            {
                cb(null,stats.size);
            }
        }
    });
}

function findSize(arg)
{
    readSizeRecursive(arg, (err, size) =>
    {
        if(err)
        {
            console.log("Error: ",err);
        }
        else
        {
            console.log("Total size: ",size);
        }
    });
}

var args = process.argv.slice(2);
console.log("args "+ args );

if (args[0])
{
    fs.lstat(args[0], function(err, stat)
    {
        if(err)
        {
            console.log("Error: ",err);
        }
        else
        {
            if (stat.isDirectory())
            {
                console.log("Checking dir: ", args[0]);
                findSize(args[0]);
            }
            else
            {
                console.log("Error: ",args[0], " is not a dir!");
            }
        }
    });
} 
else
{
    console.log("Error: No arg provided");
}
