# local test connect to dynamodb with aws-cli

This is demo for how to use local image to test dynamodb

[aws official document](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)

## Problems I faced

Question: because aws dynamodb use sqlite to storage data, thus the mount volume need to have write permission for container to execution

Solution: chmod with 777 for my dynamodb volume

create dynamodb volume:
```shell
mkdir dynamodb
sudo chmod 777 dynamodb -R
```

Question: need to connection after dynamodb able to connection

Solution: use [curl to dynamodb service for 400 response](https://stackoverflow.com/questions/77371643/docker-compose-aws-cli-of-dynamodb-is-connecting-before-the-dynamodb-local-is-up)

```yaml
healthcheck:
  test:
    [
      "CMD-SHELL",
      'if [ "$(curl -s -o /dev/null -I -w ''%{http_code}'' http://localhost:8000)" == "400" ]; then exit 0; else exit 1; fi',
    ]
  interval: 5s
  timeout: 5s
  retries: 10
```

## expected result 
test with aws cli
```shell
 aws dynamodb describe-limits --endpoint-url http://localhost:8000 --region us-west-2
```

expect result
```json
{
  "AccountMaxReadCapacityUnits": 80000,
  "AccountMaxWriteCapacityUnits": 80000,
  "TableMaxReadCapacityUnits": 40000,
  "TableMaxWriteCapacityUnits": 40000
}
```

