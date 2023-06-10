import { Client } from 'pg';

const client = new Client({
   database: 'synoptic-23',
});

client.connect();

// TODO: load default schema file(s)

export default client;

