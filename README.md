# Déjà View

This app is hosted at https://www.dejaview.cc/.

The data scraping code for this app can be found at https://github.com/xzjia/dejaview-scraper.

## What is Déjà View?

_Déjà View_ is a way to look at the events in your life at a glance. It looks something like this:

<img width="560" alt="deja-view-screenshot" src="https://user-images.githubusercontent.com/535311/41805140-9559113e-76de-11e8-8700-7419f8e02bed.png">

## How to use it

- Choose a date from the date selector.
  - You will see a series of _cards_ from that date.
- Choose a _granularity_ (YEAR, MONTH, WEEK, DAY).
  - Each _card_ represents one YEAR, MONTH, WEEK, or DAY.
- Navigate forward and backward.
  - Use the date selector, or
  - Use the arrow buttons under the _granularity_ selectors.
- Choose what kind of events that you want to see.
  - By default, events from all available data sources are shown.
  - Click on the _data source filters_ (Billboard, Movies, etc.) to hide or show certain data sources.
- Log in to Facebook to show your posts from Facebook.
  - _We are currently in the process of getting approval from Facebook. If you would like to be a *tester* for this app, please [let us know](http://www.dejaview.cc/about)._

## How Does It Work

### Data

The data comes from a variety of sources. Each source has a unique path to a _card_ in _Déjà View_.

In order to maintain current data, we use AWS Lambda to regularly retrieve new data. The code can be found in the above mentioned data-scraping repo.

#### Billboard Hot 100

Billboard Hot 100 publishes a list of the most popular songs at https://www.billboard.com/charts/hot-100.

1.  Make an HTTP request to the list for the week that we want to retrieve.
2.  Store a backup of the raw data in JSON.
3.  Retrieve links to multimedia files by doing a search for the _artist_ and _song title_ on YouTube.
4.  Insert the data that we need into our database.

#### The New York Times

The New York times provides a public API at https://developer.nytimes.com/. They have fairly lenient limits on the rate of API calls. We used the _article_search_ API.

1.  Retrieve _headlines_, _snippets_, and _multimedia links_ for every day that we wanted to include in our application.
2.  Store a backup of the raw data as JSON.
3.  Insert only the data that we need into our own database.
