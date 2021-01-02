/*
 * This is the final script for MongoDB Assignment Submission
 * It connects to datanbase server "a1", 
 * duplicates the "tweets" collection to new "Tweets" Collection
 * The script assumes that we have imported the tweets data
 * to a collection called tweets in a database a1.
 * All assignment questions are answered within the script. 
*/


// make a connection to the database server
conn = new Mongo();

// set the default database
db = conn.getDB("a1");

// duplicate the tweets collection and update the created_at type
// the new collection name is Tweets

db.tweets.aggregate(
[
    {
       $project: {
            _id: 1,
            id: 1,
            retweet_id: 1,
            replyto_id: 1,
            retweet_count: 1,
            hash_tags:1,
            created_at: {
                $dateFromString: {
                dateString: '$created_at',}
           }
       }
    },  
    {
       $out: 'Tweets', //changed the name of the newly created collection from given name
    },
 ]);
 
 
// Indexing the collection
db.Tweets.createIndex({id:1})
db.Tweets.createIndex({replyto_id:1})
db.Tweets.createIndex({retweet_id:1})

 
 // optionally timing the execution
var start = new Date()


// QUESTION 1: 
cursor = db.getCollection('Tweets').aggregate(
[
{$project: {id:1, 
    Reply_Tweets: {$cond:[{$not:["$replyto_id"]},0,1]},
    Retweet_Tweets: {$cond:[{$not:["$retweet_id"]},0,1]},
    General_Tweets: {$cond:[{$and:[{$not:["$replyto_id"]},{$not:["$retweet_id"]}]},1,0]}
}},
{$group: {_id:0,
    Reply_Tweets: {$sum:"$Reply_Tweets"}, 
    Retweet_Tweets: {$sum: "$Retweet_Tweets"},
    General_Tweets: {$sum: "$General_Tweets"}
    }},
{$project: {_id:0, Reply_Tweets:1, Retweet_Tweets:1, General_Tweets:1}}
])

// display the result
print("\n=====================================================================")
print("\nAnswer 1:\n")
while ( cursor.hasNext() ) {
	printjson( cursor.next() );
}


//QUESTION 2:
cursor = db.getCollection('Tweets').aggregate
(
[
{$match:{retweet_id:{$exists:false}}},
{$unwind:"$hash_tags"},
{$group:{_id:"$hash_tags.text", hashtags_count:{$sum:1}}},
{$sort:{hashtags_count:-1,_id:1}},
{$limit: 5},
{$project: {_id:0, Hashtag_Name: "$_id", hashtags_count:"$hashtags_count"}}
]
)

// display the result
print("\n=====================================================================")
print("\nAnswer 2:\n")
while ( cursor.hasNext() ) {
    printjson( cursor.next() );
}


//QUESTION 3:
cursor = db.Tweets.aggregate(
[
{$lookup:
	{
		from:"Tweets",
		localField: "id",
		foreignField: "replyto_id",
		as: "embeddedData"
		
	}
},
{$unwind:"$embeddedData"},
{$sort:{"embeddedData.created_at":1}},
{$group:
    {
        _id: {"id":"$id","created_at":"$created_at"}, 'embeddedData':{$push: "$embeddedData"}}
    },

{$project:
    {
        reply_time:
        { $divide:[ {$subtract:[{$arrayElemAt:["$embeddedData.created_at",0]},
            "$_id.created_at"]}, 
            1000]
        }
    }
},
{$sort:{"reply_time":-1}},
{$limit:1},
{$project: {_id:0, id:{$toString:"$_id.id"}, Duration_of_Reply_in_seconds: "$reply_time"}}
])

// display the result
print("\n=====================================================================")
print("\nAnswer 3:\n")
while ( cursor.hasNext() ) {
    printjson( cursor.next() );
}


//QUESTION 4:
cursor = db.Tweets.aggregate(
[
{$lookup:
    {
    from: "Tweets",
    localField: "id",
    foreignField: "retweet_id",
    as: "embeddedRetweets"
    }
    
},
{$match:{retweet_id:{$exists:false}}},
{$match:{retweet_count:{$gt:0}}},
{$project: {_id:1, id:1, retweet_count:1,retweet_id:1,replyto_id:1, embeddedRetweets:1,
                 size_of_er: {$size: "$embeddedRetweets"}
                }
},
{$project: { _id:0 , id: 1, size_of_er:1,retweet_count:1, 
                      boolean_check: {$cond: [{$ne: ["$retweet_count", "$size_of_er"]}, 1,0]}}},
{$group : {_id:0, count : {$sum:"$boolean_check"}}},
{$project:{_id:0, Required_Count:"$count"}}
]
)

// display the result
print("\n=====================================================================")
print("\nAnswer 4:\n")
while ( cursor.hasNext() ) {
    printjson( cursor.next() );
}

// QUESTION 5:
cursor = db.Tweets.aggregate(
[
{$lookup:
	{
		from:"Tweets",
		localField: "replyto_id",
		foreignField: "id",
		as: "embeddedReplyParent"
		
	}
},
{$lookup:
	{
		from:"Tweets",
		localField: "retweet_id",
		foreignField: "id",
		as: "embeddedRetweetParent"
		
	}
},
{$project: {_id:1, id:1, retweet_count:1,
            retweet_id:1,replyto_id:1, 
            embeddedRetweetParent:1,embeddedReplyParent:1, 
            size_of_rep_arr:{$size: "$embeddedReplyParent"},
            size_of_retweet_arr: {$size: "$embeddedRetweetParent"}}
},
{$match: 
    {$or:[
    {retweet_id:{$exists:true}},
    {replyto_id:{$exists:true}}
    ]}},
{$match:
    {$and : [
    {"size_of_rep_arr":{$eq:0}},
    {"size_of_retweet_arr":{$eq:0}}
    ]}
    },
{$group:{_id:0, count:{$sum:1}}},
{$project:{_id:0, Required_Count:"$count"}}
]
)

// display the result
print("\n=====================================================================")
print("\nAnswer 5:\n")
while ( cursor.hasNext() ) {
    printjson( cursor.next() );
}




//QUESTION 6:
cursor = db.Tweets.aggregate(
[
{$lookup:
	{
		from:"Tweets",
		localField: "id",
		foreignField: "replyto_id",
		as: "embeddedReply"
		
	}
},
{$lookup:
	{
		from:"Tweets",
		localField: "id",
		foreignField: "retweet_id",
		as: "embeddedRetweet"
		
	}
},
{$project: {_id:1, id:1, retweet_count:1,
            retweet_id:1,replyto_id:1, 
            embeddedRetweet:1,embeddedReply:1, 
            size_of_rep_arr:{$size: "$embeddedReply"},
            size_of_retweet_arr: {$size: "$embeddedRetweet"}}
},
{$match:
    {$and : [
    {retweet_id:{$exists:false}},
    {replyto_id:{$exists:false}},
    {"size_of_rep_arr":{$eq:0}},
    {"size_of_retweet_arr":{$eq:0}}
    ]}
    },
{$group:{_id:0, count:{$sum:1}}},
{$project:{_id:0, Required_Count:"$count"}}
]
)

// display the result
print("\n=====================================================================")
print("\nAnswer 6:\n")
while ( cursor.hasNext() ) {
    printjson( cursor.next() );
}

var end = new Date()
print("\n=====================================================================")
print("\nQuery Execution time: " + (end - start)/1000 + "s")
print("\n=====================================================================")
// drop the newly created collection
db.Tweets.drop()