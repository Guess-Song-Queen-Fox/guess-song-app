# Tebak Lagu Server
This app has :

- RESTful endpoint
- JSON formatted response


## API 
List Endpoints :
- GET /songs/:category
---

### GET /songs/:category
Request Header :
```
No Needed
```

Request Body :
```
No Needed
```

Response 200 : 
```json
{
    "songs" : [
        {
            "id": 9997018,
            "title": "Bohemian Rhapsody",
            "preview": "http://cdn-preview-1.deezer.com/stream/c-17597947a0fdd6e8ea971f146755cd34-13.mp3"
        },
        {
            "id": 61064534,
            "title": "Toxicity",
            "preview": "http://cdn-preview-7.deezer.com/stream/c-7243bf039ab415fb749980c406aafb29-4.mp3"
        },
        ...{n},
    ]
}
```

Response 500 : 
```json
{
    "errorCode": "INTERNAL_SERVER_ERROR",
    "message": "Internal Server Error"
}
```
---
