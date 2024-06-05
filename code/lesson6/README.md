# My server


## Development setup

### Create `.env` file

Create a `.env` file like this:

```
DATABASE_PASSWORD=<insert your password here>
```

Password can be stored in Password managers like KeePass.

Run node with
```bash
node --env-file=.env --watch app.js
```