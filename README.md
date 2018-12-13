# RESTfulWebAPI
to build a samle cosmos db and a rest api with add,update,delete,retrieve data/collections

CommandLine:
C:\Beoing\RESTfulWebAPI>git clone https://github.com/KranthiSukka/RESTfulWebAPI.git
C:\Beoing\RESTfulWebAPI>npm install hapi
C:\Beoing\RESTfulWebAPI>npm install @types/hapi
npm install --save @types/hapi
C:\Beoing\RESTfulWebAPI>npm install -g typescript
npm install typings --global
C:\Beoing\RESTfulWebAPI>typings install dt~hapi –save
typings install dt~node --global --save
C:\Beoing\RESTfulWebAPI>npm install -g gulp-cli
C:\Beoing\RESTfulWebAPI>npm install --save-dev typescript gulp gulp-typescript
Add tsconfig.json
{
    "files": [
        "src/index.ts"
    ],
    "compilerOptions": {
        "noImplicitAny": true,
        "target": "es5"
    }
}

Add gulpfile.js
var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});
Manually change index.d.ts file for hapi
https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/hapi/index.d.ts

install cosmos db emulator and navigate to
https://localhost:8081/_explorer/index.html

C:\Beoing\RESTfulWebAPI>npm install async –save
C:\Beoing\RESTfulWebAPI>npm install @azure/cosmos

https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-nodejs-application


POSTMAN – add
http://localhost:3000/addtask
body -> raw -> Json
{
 "name":"third-member",
 "member_id": "3"
}

POSTMAN – update
http://localhost:3000/updatetask
{
 "name":"third-member-new-value",
 "member_id": "3"
}

Delete – same as update request.

GET:
http://localhost:3000/

[{"name":"first-member","member_id":"1","date":1544590513355,"completed":true,"id":"b491bbe2-94f8-d808-b53f-1ffbe50a9452","_rid":"gTYsAOjdvS4LAAAAAAAAAA==","_self":"dbs/gTYsAA==/colls/gTYsAOjdvS4=/docs/gTYsAOjdvS4LAAAAAAAAAA==/","_etag":"\"00000000-0000-0000-929a-046385dd01d4\"","_attachments":"attachments/","_ts":1544674329},{"name":"second-member","member_id":"2","date":1544590547038,"completed":true,"id":"e4b5ac05-fa0b-8c97-73ab-148aba6d7cf1","_rid":"gTYsAOjdvS4MAAAAAAAAAA==","_self":"dbs/gTYsAA==/colls/gTYsAOjdvS4=/docs/gTYsAOjdvS4MAAAAAAAAAA==/","_etag":"\"00000000-0000-0000-929a-1cd21aba01d4\"","_attachments":"attachments/","_ts":1544674370}]

