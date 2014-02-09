miniNodeJS
==========
Run (sudo npm install) before use.

miniNodeJS is a minimalistic Node.js and MongoDB project.

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

The "(function () {...})();" wrapping the entire User object in the
routes/lib/User.js is call "Self executing anonymous function". This is used
to protect the global namespace from getting cluttered with variables from
your objects or modules.

Some people say that the technique makes your code run faster, well, I am
yet to find out that fact. Of course your application will run faster if you
do not have unecessary items in the memory, which the self executing
anonymous function prevents.

MongoDB collection schema:
{ "f" : "Wale",
  "l" : "mySurname",
  "e" : "walen007@example.com",
  "p" : "*****************",
  "_id" : ObjectId("52f625fd2c0003cc5a000001") }

I have used single letters for collection field names. Mongo is a document
database and in document databases, field names are repeated in every single
record in your collection.

Using many letters in your field names is like telling your database to
manage data that is not your primary concern.

Imagine this schema with a million records/documents:
{ "firstname" : "Wale",
  "lastname" : "mySurname",
  "email" : "walen007@example.com",
  "password" : "*****************",
  "_id" : ObjectId("52f625fd2c0003cc5a000001") }

That is an extra 26 million characters that will also fight for spaces in
your server's memory and CPU resources needlessly. This reduces the
amount of real data in the MongoDB working set that you can have in the
memory, it hurts performance.

Functions that start with (_) underscore in routes/lib/User.js are private
functions. This means that they are no t supposed to be called directly. They
are usually utility functions that serve other functions/operations in a
Javascript object.
