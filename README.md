## 所需环境

redis
mongodb

## 调用说明

### 登录

**curl请求**

```
curl --location 'localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--header 'Cookie: JSESSIONID=9E878314CDAC22F0AD168673B3C19655' \
--data '{
"username": "john",
"password": "changeme"
}'
```

**结果**

```json
{
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiam9obiIsInBhc3N3b3JkIjoiY2hhbmdlbWUiLCJpYXQiOjE3MTAxMjIxMjAsImV4cCI6MTcxMDEyMjE4MH0.fqKziJFPDfd3d8zgBcFGxJ6FJotE1yOIOmOJVA3otBc"
  },
  "code": 200,
  "message": "请求成功"
}
```
