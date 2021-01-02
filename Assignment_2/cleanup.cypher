//Drop the created graph
MATCH (n) DETACH DELETE n;

//Drop the created indicies
DROP INDEX ON :Tweet(id);
DROP INDEX ON :User(userid);

