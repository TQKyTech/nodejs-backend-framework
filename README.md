# backend-framework-nodejs
The framework for Back-end developers at TQKyTech. Created by TQKy


## About The Project
This FrameWork is organized according to independent architecture according to each function. Can easily split jobs and work independently from each other. And we can also easily split into multiple Services and install on 1 or more different servers, and we can communicate and synchronize each other between these Services. Summary:

###  Hot Reload
When we run in Debug mode, FrameWork supports them to execute the created or saved files without having to run the program again.

###  Database:
1. Connect: support connecting to many different databases.
2. Support to swap simple queries between SQL and noSQL without having to change source code.
3. Support event notification when database queries are successful, so it is easy to create reports and manage Caching.

###  API:
1. Version: supports creating multiple versions of api, can inherit or rewrite the old version api and query to multiple databases.
2. IP, Token authentication: centralized authentication processing when there are incoming requests.
3. Validation: 
    * Set 1 or more names for Controller, Action
    * Check the validity of the requested information: header, pagram, body on each specific API
    * Set up a queue for the API
    * Support for adding independent tasks to API queue.

###  WebSocket(same port as API): 
1. Manage current online / offline users. Classify sent data via packet type and ease real-time communication between client-server over this type of packet.
2. Support API calling using WebSocket: WebSocket will help navigate the packet to the corresponding API. It helps to keep the original connection and reduce the time to connect to the server for later requests.

###  Nats
Support for connection, communication and data synchronization between services on 1 or more servers.


## License
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software


## Contact
TQKy - Truong Quoc Ky - truongquockyit@gmail.com