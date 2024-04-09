import { CreateTableCommand ,ListTablesCommand , DynamoDBClient } from '@aws-sdk/client-dynamodb';


const main = async () => {
  try {
    const client = new DynamoDBClient({
      endpoint: 'http://localhost:8000',
      region: 'local',
      credentials: {
        accessKeyId:  'test',
        secretAccessKey: 'test'
      }
    });
    const tablesList = await listTables(client);
    console.log({ tablesList: tablesList});
    if (tablesList.length == 0) {
      const createTableResult = await createTable(client);
      console.log({ createTableResult: createTableResult })
    }
  } catch (error: unknown) {
    const wrapError: Error = error as Error;
    console.error({message: wrapError?.message, error: wrapError});
  }
}
const listTables = async (client: DynamoDBClient) => {
  const command = new ListTablesCommand({});
  const response = await client.send(command);
  // console.log(response.TableNames?.join("\n"));
  const resultTables = response.TableNames;
  return resultTables;
}
const createTable = async (client: DynamoDBClient) => {
  const command = new CreateTableCommand({
    TableName: "EddieFriendList",
    AttributeDefinitions: [{
      AttributeName: "Name",
      AttributeType: "S",
    }],
    KeySchema: [
      {
        AttributeName: "Name",
        KeyType: "HASH"
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  });
  const response = await client.send(command);
  return response;
}
main();