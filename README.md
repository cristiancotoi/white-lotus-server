# white-lotus-server

[![Build Status](https://travis-ci.org/cristiancotoi/white-lotus-server.svg?branch=master)](https://travis-ci.org/cristiancotoi/white-lotus-server)

Node.js backend for a numerology and chinese astrology application

## Useful commands
| Description                       | Command                 |
| :---                              | :---                    |
| Start server                      | `npm start`             |
| Run unit tests                    | `npm run test`          |
| Run integration tests             | `MONGO_URL=127.0.0.1 npm run integ-test` |
| Run tests + watch (not working)   | `npm run wtest`         |
| Run tests with coverage           | `npm run coverage`      |
| Build sources                     | `grunt build`           |

## DB
**Important notice**: DB contents is not available, so for testing you have to improvise.
### Useful commands
| Description                       | Command                 |
| :---                              | :---                    |
| Start db server                   | `mongod --dbpath db`    |
| Find users reverse | `db.users.find().sort({creationDate: -1})` |
| Update user level | `db.users.update({"analystId" : "user@email.com"},{$set:{"level":8}})` |

## OpenShift
### Useful commands
| Description                       | Command                 |
| :---                              | :---                    |
| Create project                    | `oc new-project whitelotus --description="Backend for a numerology and chinese astrology application" --display-name="White Lotus"` |
| Create application                | `oc new-app -f openshift/templates/nodejs-mongodb-persistent.json` |
| Get active pods                   | `oc get pods` |
| SSH on pod                        | `oc rsh <pod_name>` |
| Connect to mongo shell            | `mongo whitelotus --username $MONGODB_USER --password $MONGODB_PASSWORD` |
