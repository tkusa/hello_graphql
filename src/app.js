var { graphql, buildSchema } = require("graphql")
const express = require('express')
const app = express()
const port = 3000
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var schema = buildSchema(`
  type Query {
    hello: String
  }
`)

var rootValue = { hello: () => "Hello GraphQL!" }

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/graphql', async (req, res) => {
  var source = req.body.query;
  var result = await graphql({ schema, source, rootValue });
  res.send(result);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
