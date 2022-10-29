DROP TABLE IF EXISTS club CASCADE;
DROP TABLE IF EXISTS grade CASCADE;
DROP TABLE IF EXISTS person CASCADE;
DROP TABLE IF EXISTS registration CASCADE;
DROP TABLE IF EXISTS ledsager CASCADE;
DROP TABLE IF EXISTS payment CASCADE;
DROP TABLE IF EXISTS vipps CASCADE;
DROP TABLE IF EXISTS transactionError CASCADE;

CREATE TABLE club (
   clubId serial PRIMARY KEY,
   name varchar NOT NULL
);

CREATE TABLE person (
    personId serial PRIMARY KEY,
    firstName varchar NOT NULL,
    lastName varchar NOT NULL,
    age INT NOT NULL,
    telephone varchar NOT NULL,
    email varchar NOT NULL
);

CREATE TABLE grade (
    gradeId serial PRIMARY KEY,
    name varchar NOT NULL,
    grade float NOT NULL,
    isDan boolean NOT NULL
);

CREATE TABLE registration (
    registrationId serial PRIMARY KEY,
    personId int NOT NULL REFERENCES person(personId),
    clubId int NOT NULL REFERENCES club(clubId),
    gradeId int NOT NULL REFERENCES grade(gradeId),
    gradering boolean NOT NULL,
    sleepover boolean NOT NULL,
    allergies varchar NULL,
    vegan boolean NOT NULL,
    instructor int NOT NULL,
    wantsToInstruct boolean NOT NULL,
    otherInfo varchar NULL,
    public boolean NOT NULL,
    vipps boolean NOT NULL,
    cancelled boolean NOT NULL,
    mailsent boolean NOT NULL
);

CREATE TABLE ledsager (
    ledsagerId serial PRIMARY KEY,
    personId int REFERENCES person(personId),
    forPersonId int REFERENCES person(personId),
    registrationId int REFERENCES registration(registrationId),
    hasPaid boolean NOT NULL
);

CREATE TABLE payment (
    paymentId serial PRIMARY KEY,
    registrationId int NOT NULL references registration(registrationId),
    vipps boolean NOT NULL,
    amount numeric NOT NULL,
    paid boolean NOT NULL,
    cancelled boolean NOT NULL
);

CREATE TABLE vipps (
    vippsId serial PRIMARY KEY,
    registrationId int NOT NULL references registration(registrationId),
    paymentId int NOT NULL references payment(paymentId),
    orderId varchar NOT NULL,
    transactionId varchar NULL,
    transactionText varchar NULL,
    mobileNumber varchar NOT NULL,
    amount numeric NOT NULL,
    status varchar NULL,
    timeStamp timestamp NULL
);

CREATE TABLE transactionError (
    transactionErrorId serial PRIMARY KEY,
    contextId varchar NOT NULL,
    errorMessage varchar NULL,
    errorCode varchar NULL,
    errorGroup varchar NULL
);