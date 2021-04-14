# backend-framework-nodejs
The framework for Back-end developers at TQKyTech. Created by TQKy

This FrameWork is organized according to independent architecture according to each function. Can easily split jobs and work independently from each other. And we can also easily split into multiple Services and install on 1 or more different servers, and we can communicate and synchronize each other between these Services.

1. Hot Reload: When we run in Debug mode, FrameWork supports them to execute the created or saved files without having to run the program again.
2. Database:
    a. Connect: support connecting to many different databases.
    b: Support to swap simple queries between SQL and noSQL without having to change source code.
    c: Support event notification when database queries are successful, so it is easy to create reports and manage Caching.
3. API:
    a. Version: supports creating multiple versions of api, can inherit or rewrite the old version api and query to multiple databases.
    b. IP, Token authentication: centralized authentication processing when there are incoming requests.
    c. Validation: 
        - Set 1 or more names for Controller, Action
        - Check the validity of the requested information: header, pagram, body on each specific API
        - Set up a queue for the API
        - Support for adding independent tasks to API queue.
4. WebSocket(same port as API): 
    a. Manage current online / offline users. Classify sent data via packet type and ease real-time communication between client-server over this type of packet.
    b. Support API calling using WebSocket: WebSocket will help navigate the packet to the corresponding API. It helps to keep the original connection and reduce the time to connect to the server for later requests.
5. Easily Build own function to integrate other libraries (Socket.io, MQTT...)
6. Nats: Support for connection, communication and data synchronization between services on 1 or more servers.
