//QUESTION 1 
MATCH (t:Tweet)
WHERE NOT (t)<-[:RETWEETOF| REPLYTO]-()
and (not exists (t.replyto_id) and  not exists(t.retweet_id))
return count(t) as Answer_1;



//QUESTION 2 
MATCH (t: Tweet)<-[:HASHTAGS]-(h:Hashtag)
WHERE not EXISTS(t.retweet_id)
RETURN h.name as Answer_2_Hastags, count(*) AS Frequency 
ORDER BY Frequency DESC 
LIMIT 5;



//QUESTION 3 
MATCH (t:Tweet)
RETURN t.id as Answer_3_ID, size((t)<-[:RETWEETOF|REPLYTO*1..]-()) as Number_of_Descendants 
ORDER BY Number_of_Descendants DESC 
LIMIT 1;



//QUESTION 4 
MATCH (r)<-[:RETWEETOF|REPLYTO*1..]-(l)
RETURN r.id as Answer_4_ID, count (distinct l.user_id) as Frequency_of_authors
ORDER BY Frequency_of_authors DESC 
LIMIT 1;



//QUESTION 5 
MATCH p=(r)<-[:RETWEETOF|REPLYTO*1..]-(l)
WHERE NOT (l)<-[:RETWEETOF|REPLYTO]-() and (not exists (r.replyto_id) and  not exists(r.retweet_id))
RETURN length(p) as Answer_5_Path_Length, REDUCE(list=[],n in nodes(p)|list + n.id) as Tweet_IDs_in_path
ORDER BY Answer_5_Path_Length DESC
LIMIT 1;









