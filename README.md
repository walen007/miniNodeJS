miniNodeJS
==========

A minimalistic Node.js and MongoDB project.

This project demonstrates the use of MongoDB Database in a Node.js
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
do not have unecessary things in the memory, which the self executing
anonymous function prevents.
