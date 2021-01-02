//Creating Index for the created graph
CREATE INDEX ON :Tweet(id);
CREATE INDEX ON :User(userid);


//Loading Data from the JSON File
CALL apoc.load.json("file:///tweets_cognitive_test.json")
YIELD value
MERGE (variable: Tweet {id:value.id})
SET variable.text = value.text,
variable.created_at = value.created_at,
variable.user_id = value.user_id,
variable.retweet_id = value.retweet_id,
variable.replyto_id = value.replyto_id,
variable.retweet_user_id = value.retweet_user_id,
variable.replyto_user_id = value.replyto_user_id

FOREACH (uid in variable.user_id |
	MERGE (author:User {userid:uid}) 
	MERGE (variable)-[:POSTEDBY]->(author)
)

FOREACH (usr IN value.user_mentions |
    MERGE (user: User {userid: usr.id})
    MERGE (user)-[:MENTIONEDBY]->(variable)
)

FOREACH (ht IN value.hash_tags |
    CREATE (tag: Hashtag {name: ht.text})
    MERGE (tag)-[:HASHTAGS]->(variable)
)

FOREACH (rt_id in
        CASE WHEN variable.retweet_id IS NOT NULL
        THEN [variable.retweet_id]
        ELSE [] END |
        MERGE (vt:Tweet {id:rt_id}) 
		MERGE (variable)-[:RETWEETOF]->(vt))
		
		
FOREACH (rp_id in
        CASE WHEN variable.replyto_id IS NOT NULL
        THEN [variable.replyto_id]
        ELSE [] END |
        MERGE (ab:Tweet {id:rp_id}) 
		MERGE (variable)-[:REPLYTO]->(ab));
