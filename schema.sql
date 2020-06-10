DROP TABLE police_killings;
CREATE TABLE police_killings (
	raceethnicity VARCHAR NOT NULL,
	year INT NOT NULL,
	city VARCHAR NOT NULL,
	state VARCHAR NOT NULL,
	latitude FLOAT NOT NULL,
	longitude FLOAT NOT NULL, 
	state_fp INT NOT NULL, 
	armed VARCHAR NOT NULL);

SELECT * FROM police_killings;