# My server


## Development setup

### Create `.env` file

Create a `.env` file like this:

```
PORT=3000
MONGODB_URL=<Your mongodb password>
DATABASE_PASSWORDDATABASE_PASSWORD=<insert your password here>
```

Run nodefor the MySQL part with
```bash
node --watch app_mysql.js
```


Run nodefor the MongoDB part with
```bash
node --watch app_mongodb.js
```
If you cannot connect, make sure, your IP address is whitelisted at MongoDB!
