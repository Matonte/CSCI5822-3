var fs = require('fs'),
    path = require('path'),
    a = require('async');


function readSizeRecursive(item, cb) {
    fs.lstat(item, function(err, stats) {
        if (!err && stats.isDirectory()) {
            var total = stats.size;

            fs.readdir(item, function(err, list) {
                if (err) return cb(err);

                async.forEach(
                    list,
                    function(diritem, callback) {
                        readSizeRecursive(path.join(item, diritem), function(err, size) {
                            total += size;
                            callback(err);
                        });
                    },
                    function(err) {
                        cb(err, total);
                    }
                );
            });
        } else {
            if (err){
				cb(err);
			}
			else {
				cb(null,stats.size);
			}
			
        }
    });
}
function findSize(arg) {
	readSizeRecursive(arg, (err, size) => {
		console.log(size);

	});
}

var args = process.argv.slice(2);
console.log("args "+ args );

if (args[0]) {
	console.log(args[0]);
	console.log(findSize(args[0]));
} 
else console.err("Usage: total_size <path>");