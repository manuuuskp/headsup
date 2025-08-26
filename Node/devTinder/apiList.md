## Auth router
POST - /signup - DONE
POST - /login - DONE
POST - /logout - DONE

## Profile router
GET - /profile/view - DONE
PATCH - /profile/edit - DONE
PATCH - /profile/password

## Connection request router
POST - request/send/interested/:userId - DONE
POST - request/send/ignored/:userId - DONE
POST - request/review/accepted/:requestId - DONE
POST - request/review/rejected/:requestId - DONE

## User router
GET - user/requests
GET - user/connections
GET - user/feed

status - interested, ignored, accepted, rejected