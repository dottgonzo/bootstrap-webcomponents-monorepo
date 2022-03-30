# Test server: 
Create a `db.json` file with some data

```json
{
  "messages": [
  ],
}
```

Start JSON Server

```bash
json-server --watch db.json
```

Now if you go to [http://localhost:3000/messages](http://localhost:3000/messages), you'll get all of the posted data.


