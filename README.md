miniNodeJS - is a minimalistic Node.js and MongoDB project.
------------------------------------------------------------


Install dependencies first with the following commands: <br />
<strong>sudo npm install</strong> <br />
<strong>sudo npm install -g mocha</strong>


Then run the "mocha" command to test the User.js Module and the Web App.<br />
<strong>mocha</strong>


This project demonstrates the use of MongoDB Database with a Node.js
application.

It also demonstrates how you can separate your core application/business
logics into modules using Object Oriented Programming in Javascript with the
Prototypal Model. Some people call it "Prototypical" Model.

The project also demostrates how to access external APIs in Node.js. The
project uses your IP address to determine your Location (City, State/Region,
Country, Country Code and Zip Code), using the free service of ipinfodb.com.

You are supposed/expected to get your own free API key on their website and
not use mine on your machine.

MongoDB collection schema: <br />
{  <br />
  "f": "TestFirstname", <br />
  "l": "TestLastname", <br />
  "e": "email@example.com", <br />
  "p": "*****************", <br />
  "_id": ObjectId("52f625fd2c0003cc5a000001") <br />
}

I have used single letters for collection field names. Mongo is a document
database and in document databases, field names are repeated in every single
record in your collection.

Using many letters in your field names is like telling your database to
manage data that is not your primary concern.

Imagine this schema with a million records/documents: <br />
{  <br />
  "firstname": "TestFirstname", <br />
  "lastname": "TestLastname", <br />
  "email": "email@example.com", <br />
  "password": "*****************", <br />
  "_id": ObjectId("52f625fd2c0003cc5a000001") <br />
}

That is an extra 26 million characters that will also fight for spaces in
your server's memory and CPU resources needlessly. This reduces the
amount of real data in the MongoDB working set that you can have in the
memory, it hurts performance.

Functions that start with (_) underscore in routes/lib/User.js are private
functions. This means that they are not supposed to be called directly. They
are usually utility functions that serve other functions/operations in a
Javascript object.
