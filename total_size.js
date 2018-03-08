var fs = require('fs'),
    path = require('path'),
    a = require('async');
 
 
process.argv.slice(2).forEach(function(arg)
{
	console.log(arg);
	function findSize(arg)
	{
		fs.lstat
	   (arg,function(err,stats)
		{
		   if (!err && stats.isDirectory()) {
               var total = stats.size;
			   console.log(total);
			    fs.readdir(item, function(err, list)
				{
				    	
					
					
					
		        }
			
		});
	}
    findSize(arg);
	}



);
