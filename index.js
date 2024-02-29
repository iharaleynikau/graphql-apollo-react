import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { dirname, resolve, join } from 'path';
import { fileURLToPath } from 'url';
import schema from './src/schema.js';
import root from './src/root.js';
// simple database
const users = [
  { id: 1, username: 'Ihar', age: 18 },
  { id: 2, username: 'Stepan', age: 19 }
];

const app = express();

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root(users)
  })
);

// const __dirname = dirname(fileURLToPath(import.meta.url));

// if (process.env.NODE_ENV === 'production') {
//   app.use('/', express.static(join(__dirname, 'client', 'dist')));

//   app.get('*', (req, res) => {
//     res.sendFile(resolve(__dirname, 'client', 'dist', 'index.html'));
//   });
// }

app.listen(5000, () => console.log('Server has started on port 5000'));
