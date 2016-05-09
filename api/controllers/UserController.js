/**
 * UserController
 *
 * @description :: Server-side logic for managing Shares
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
   me: function(req, res) {
      if ( !req.isAuthenticated() ) return res.forbidden();
        return res.json({ user: {
                          id:req.user.id,
                          uid:req.user.uid,
                          name:req.user.name
                          }
                        });
   },
	 bulkdata: function (req,res) {
		 var loremIpsum = require('lorem-ipsum');
		 var url = 'https://es.wikipedia.org/wiki/Special:Random';
		 var image = 'https://placeimg.com/720/480/tech';

		 var title = loremIpsum({
										count: 1,                      // Number of words, sentences, or paragraphs to generate.
										units: 'sentences',           // Generate words, sentences, or paragraphs.
										sentenceLowerBound: 5,         // Minimum words per sentence.
										sentenceUpperBound: 15,       // Maximum words per sentence.
								});

		 var content = loremIpsum({
								    count: 1,                      // Number of words, sentences, or paragraphs to generate.
								  	units: 'paragraphs',           // Generate words, sentences, or paragraphs.
								  	sentenceLowerBound: 5,         // Minimum words per sentence.
								  	sentenceUpperBound: 20,       // Maximum words per sentence.
								  	paragraphLowerBound: 4,        // Minimum sentences per paragraph.
								  	paragraphUpperBound: 7,        // Maximum sentences per paragraph.
								});

			var random = function (low, high) {
								    return (Math.ceil(Math.random() * (high - low) + low)) || 1;
			};


			var categorylist = function (){
					var list = [];
					for (i = 1 ;i < random(1,5);i++) {
							list.push(random(1,5));
					}
					return list;
			};

		var article = {
				title : title,
				description : content,
				url : url,
				image : image,
				categories : categorylist(),
				creator : random(1,2)
		};

				// And below is a sample usage of this promiseWhile function
		var sum = 1,
		    stop = 20;

	var Promise = require('bluebird');

	 var promiseWhile = function(condition, action) {
	     var resolver = Promise.defer();

	     var loop = function() {
	         if (!condition()) return resolver.resolve();
	         return Promise.cast(action())
	             .then(loop)
	             .catch(resolver.reject);
	     };

	     process.nextTick(loop);

	     return resolver.promise;
	 };

		promiseWhile(function() {
		    // Condition for stopping
		    return sum < stop;
		}, function() {
		    // Action to run, should return a promise
		    return new Promise(function(resolve, reject) {
					Article.create(article).exec(function (response){
							console.log(sum);
							sum++;
							resolve(response);
					});
		        });
		}).then(function() {
		    // Notice we can chain it because it's a Promise,
		    // this will run after completion of the promiseWhile Promise!
		    console.log("Done");
		});

		 res.send('OK');

	 }

};
