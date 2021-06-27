# COMP5338-AdvancedDataModels
University of Sydney Coursework for COMP5338: Advanced Data Models (Semester 2, 2020)

The assignments were completed as part of the COMP5329 unit of The University of Sydney by [Sanna Nazir](https://github.com/Sanna-Nazir) and [Anshu Kumar](https://github.com/anshukr5). There were three assignments undertaken. Details of each assignment are as follows:

1. [Assignment 1](./Assignment_1)

	This assignment was a MongoDB based assignment. Given a [tweets dataset](./Assignment_1/tweets.json), we were asked to implement the following six queries:

	Q1: Find out the number of general tweets, replies and retweets in the data set. A general tweet is a tweet with no replyto_id, nor retweet_id field; a reply is a tweet with the replyto_id field; a retweet is a tweet with the retweet_id field. 
	Below are sample answers for the practice data set : General Tweet Reply Retweet 1035 1148 7817 
	Q2: Find out the top 5 hashtags sorted by their occurrence in general or reply tweets. We do not count retweet, which has the same textual content as the parent tweet. 
	The sample answers for the practice data set are: Yosemite yosemite YoSemite NationalPark California 47 47 16 10 9 Note that the order does not matter if a few hashtags have the same occurrence number. The 5 th tag in the sample result could be ‘nature’,which also occurs 9 times. 
	Q3: Find out the tweet taking the longest time to receive a reply; print out the id and the duration between the tweet’s creation time and the creation time of its first reply in second. 
	The sample answers for the practice data set are: id: 1298008149551587328; first response in: 75952s 3 
	Q4: Find out the number of general and reply tweets that do not have all their retweets included in the data set. Note that the total number of retweets a tweet is stored in the field retweet_count. 
	Sample answer for the practice data set is: 139 
	Q5: Find out the number of tweets that do not have its parent tweet object in the data set. 
	The sample answer for the practice data set is: 6924 
	Q6: Find out the number of general tweets that do not have a reply nor a retweet in the data set. 
	The sample answer for the practice data set is: 824

	The solution to these queries can be found [here](./Assignment_1/Solved_Assignment_1.js)

2. [Assignment 2](./Assignment_2)

	This assignment was a Neo4j based assignment. Given a [tweets dataset](./Assignment_2/tweets.json), we were asked to implement the following six queries:

	Q1: Find out the number of general tweets that do not have a reply nor a retweet in the data set. This question is the same as Q6 in MongoDB assignment. And the sample answer for the practice data set is: 911

	Q2: Find out the top 5 hashtags sorted by their occurrence in general or reply tweets. We do not count retweet, which has the same textual content as the parent tweet. This question is the same as Q2 in MongoDB assignment. The sample answers for the
	practice data set are:
	Venus Quran QURAN space NASA
	57 18 14 8 7
	Note that the order does not matter if a few hashtags have the same occurrence number. The 5th tag in the sample result could be ‘phosphine’,which also occurs 7 times.

	Q3: Find out the most popular tweet ranked by the number of descendants in the database. Print out the tweet id and the number of descendants. The sample answer for the practice data set are:
	Tweet ID Descendant Count
	1306104147209584640 5159

	Q4: Find out the most popular tweet ranked by the number of unique users as author of its descendant tweets. Print out the tweet id and the number of authors.
	The sample answer for the practice data set are:
	Tweet ID User Count
	1306104147209584640 5159

	Q5: Find out the longest discussion path in the data set. A discussion path is a sequence of tweets from a root tweet to a leaf tweet along the reply and retweet edges. Print out the path length and the path as a list of tweet ids. If there are multiple paths with the same maximum length, you only need to print one of them as the result.
	The sample answer for the practice data set are:
	path length Tweet IDs in Path
	9 [1306516021499494402,
	1306519149175169024,
	1306519571323527171,
	1306520043132350465,
	1306520148052905985,
	1306520712761413634,
	1306522086215544839,
	1306526400334110720,
	1306528866400313345,
	1306529423470985218]

	Q6: Some tweets mention users in their texts. This information is stored in the field mentions. There are in general two cases a user might be mentioned:
	– A retweet or reply may mention its ancestors’ authors. In particular, a retweet may automatically mention its ancestors’ authors. An example can be seen from tweet “1308517931341484032”, which mentions its’ parent tweet’s author “14133037”.
	– A tweet may mention a user that is not the author of any ancestor tweet but is related with the content. An example can be seen in tweet "1308517003062370313", which mentions user "227771301" (@mrtimlong). This user is not the author of any ancestor tweet.

	We are interested in the second case and would like to find out the top user with most mentions not from its descendant tweets. Print out the user id and the number of time it is mentioned by a tweet that is not a descendant. If there are multiple top users with the same mention count, you only need to print one as the result.
	The sample answers for the practice data set are:
	user id count
	1233245849427136513 363

	The solution to these queries, along with cleanup and setup files, can be found inside the [subfolder](./Assignment_2).

3. [Assignment 3](./Assignment_3)

	This was a research based assignment. In this assignment, we were asked to focus on a particular data model by investigating how it is supported in two database systems and produce a report for the same. The Project Scope was as follows:

	You should start the project by identifying a data model you want to work on. The data model could be relational, document, graph, key-value, time-series and spatial model. If you want to work on another model, you need to confirm with your tutor. 
	Next, choose two systems that support the data model. One of the systems should be a NoSQL system. The system could use the data model as its primary model or as secondary model. 
	The main project work involves in-depth comparison of three features of the two systems with respect to that particular model. For each feature, you are expected to present a couple of findings and enough evidence to support your findings. The evidence could come from reviewing credible literature or from your own experiments. You can compare features related with query language, examples include query expressiveness, support for certain types of query and so on. You can also compare features on query execution, examples include execution performance, execution profiling and so on. In additional, you may also consider features related with database architecture that may affect scalability, replication, consistency and others