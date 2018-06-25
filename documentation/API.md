Deja View REST API

- GET /api/v1/:date
- GET /api/v1/labels
- GET /api/v1/isLoggedIn

## GET /api/v1/:date

Information returned always starts at the \*\*:date\*\* value.

The format of :date is **YYYY-MM-DD**

Two parameters are **required** _granularity_ and _num_

**num** equals the number of records returned for each label

**granularity** determines the scope of the data returned
There are four acceptable values:

- days - returns one record for each label for each day , the number of days = _num_
- weeks - returns one record for each label for each week , the number of weeks = _num_
- months - returns one record for each label for each month , the number of months = _num_
- weeks - returns one record for each label for each year , the number of year = _num_

The records returned always start with the _:date_ and then go backwards in time.

##Examples

### API call

```
http://localhost:3001/api/v1/2018-06-26/?granularity=days&num=20
```

### Data

- API GEt returns an bject with Dates for keys grouping each card displayed on the front end
  - Value for each Date key is an object with labels (NYT, Wikepdia, etc) as keys
  - Values for the label keys are an array of event objects
  - Event object contains timestamp, title, text, link, image_link, media_link, and label

```js
{
    "2001-06-08": {
      "New-York-Times": [
        {
          "timestamp": "2001-06-08T00:00:00.000Z",
          "title": "Yo, Adrian, Do 76ers Really Have a Shot?",
          "text":
            "''Rocky'' is playing L.A. this week, rereleased by a bunch of woozy pugs from Broad Street.     Allen Iverson's elbow bursitis, bruised tailbone and general fatigue. Eric Snow's broken foot. Dikembe Mutombo's throbbing shoulder. George Lynch out u...",
          "link":
            "https://www.nytimes.com/2001/06/08/sports/pro-basketball-yo-adrian-do-76ers-really-have-a-shot.html",
          "image_link": null,
          "media_link": null,
          "label": "New-York-Times"
        }
      ],
      "Wikipedia": [
        {
          "timestamp": "2001-06-08T00:00:00.000Z",
          "title":
            "Mamoru Takuma kills eight and injures 15 in a mass stabbing at an elementary school in the Osaka Prefecture of Japan.",
          "text":
            "Learn more: <a href=\"https://en.wikipedia.org/wiki/Mamoru_Takuma\">Mamoru Takuma</a>, <a href=\"https://en.wikipedia.org/wiki/Osaka_school_massacre\">Osaka school massacre</a>, <a href=\"https://en.wikipedia.org/wiki/Osaka_Prefecture\">Osaka Prefecture</a>, <a href=\"https://en.wikipedia.org/wiki/Japan\">Japan</a>",
          "link": "",
          "image_link":
            "https://upload.wikimedia.org/wikipedia/en/5/55/Mamoru_Takuma.jpg",
          "media_link": "",
          "label": "Wikipedia"
        }
      ],
      "Movies": [
        {
          "timestamp": "2001-06-08T00:00:00.000Z",
          "title": "#1 Movie: Swordfish",
          "text": "Swordfish grossed a total of $27,053,729.",
          "link": "https://www.imdb.com/find?q=Swordfish+2001",
          "image_link": "https://i.ytimg.com/vi/lFwtY1bxlNc/hqdefault.jpg",
          "media_link": "https://www.youtube.com/watch?v=lFwtY1bxlNc",
          "label": "Movies"
        }
      ]
    },
    "2001-06-26": {
      "New-York-Times": [
        {
          "timestamp": "2001-06-26T00:00:00.000Z",
          "title":
            "Seen the Ads? Now, Take the Test; Armed With a No. 2 Pencil, and Ready to Join the Police",
          "text":
            "A bumper sticker on a tollbooth on the Triborough Bridge promised work. It read: (212) RECRUIT. The New York Police Department was looking for a few of New York's finest.    Why not? Could be a story. Could be a career. I called the number, and wa...",
          "link":
            "https://www.nytimes.com/2001/06/26/nyregion/seen-ads-now-take-test-armed-with-no-2-pencil-ready-join-police.html",
          "image_link": null,
          "media_link": null,
          "label": "New-York-Times"
        }
      ]
    }
}
```

## GET /api/v1/labels

### API call

```
http://localhost:3001/api/v1/labels
```

### Data

Returns an array with a list of all labels in the database

```
[
"Billboard",
"Movies",
"New-York-Times",
"Wikipedia"
]
```

## GET /api/v1/isLoggedIn

### API call

```
http://localhost:3001/api/v1/isLoggedIn
```

### Data

Return a Boolean denoting if the user is logged into Facebook.

```
true || false
```
