---
title: Charecters
editLink: true
---

## Introduction
This is the documentation on how to use the **Solar Opposites API** - for use in any way you can think of, but great for dummy data in tutorials, or designs, or prototypes, or whatever. :alien:

## REST API

### Base URL
```js
GET `https://solaroppositesapi.com/api`
```

The base url contains information about all available API's resources. All requests are `GET` requests and go over https. All responses will return data in `json`.

```js
{
  "characters": "https://solaroppositesapi.com/api/character",
  "locations": "https://solaroppositesapi.com/api/location",
  "episodes": "https://solaroppositesapi.com/api/episode",
  "devices": "https://solaroppositesapi.com/api/devices",
  "documents": "https://solaroppositesapi.com/api/all"
}
```
### Info and Pagination
Each request, other than those requesting a single document, returns an array of `results` and an `info` object.

Info Object Properties:
* `count`: The number of results returned
* `pages`: The number of pages of results
* `after`: The url for the next page of results
* `before`: The url for the previous page of results

The default page size is 64. You can adjust this in the query string with the `size` parameter.

```js
GET `https://solaroppositesapi.com/api/charecters?size=500`
```

:::warning
The max page size is 100.
:::

To get the next page of results, use the `after` url. Which is just adding the `after` parameter to the query string. Where `after` is the id of the first result in the next page.

To get the previous page of results, use the `before` url. Which is just adding the `before` parameter to the query string. Where `before` is the id of the last result in the previous page.

::: tip
There is currently no way to get a specific page of results. You can only get the next and/or previous page. Feel free to [submit a PR]() if you know of an efficent way to implement this in [FaunaDB]().
:::

### Verbose
Many of the documents returned by the API include some large additons of information. Mainly arrays of documents related to the original document. When this is the case the API returns just the url to the related document rather than the entire document.

If you would like the entire document returned, you can set the `verbose` parameter to the query string to `true`.


:::warning
When using the verbose option, the max page size is 24, and the default is 8.
:::

## Clients

### Javascript Client
There is a **_fully typed_** javascript client available. [View documentation]().

::: tip
If you want to submit a client, please [submit a PR](). :wink:
:::

## Charecters
There are a total of `671` total charecters in the database.

### Charecter Schema
| key        | type           | description  |
| ------------- |:-------------:| -----:|
| `species`      | string | The species of the charecter. |
| `name`      | string | The name of the charecter. |
| `location`      | object or "unknown" | The [location]() of the charecter, currently. |
| `url`      | string | The url of this specific charecter. |
| `image`      | string | The charecter's image url. |
| `alias`      | string or string[] | An alias of the charecter. |
| `id`      | string | The `Reference` id of the charecter. |
| `episodes`      | object | An array of [episodes]() that the charecter appeared in. Presents only the urls, unless the `verbose` parameter is set to true. |
| `type`      | string | A category of the charecter in addition to sepcies. |
| `gender`      | string | The gender identification of the charecter. |
| `origin`      | object or "unknown" | The origin [location]() of the charecter. |
| `status`      | "alive" or "dead" or "unknown" | The charecter's life/death status. |

### Get All Charecters
You can get a list of all charecters by making a request to `/api/charecters`. Read more about [info]() and [pagination]() to better understand this request.

```js
GET `https://solaroppositesapi.com/api/charecters`
```

```js
{
  info: {
    count: 671,
    after: "305497777165566530",
    before: "305497645548307010",
    pages: 11
  },
  results: [
    {
      species: "Shlorpian",
      name: "Terry",
      url: "https://solaroppositesapi.com/api/characters/305497645548307010",
      image: "https://solaroppositesapi.com/api/images/terry",
      alias: "Number 31827",
      id: "305497645548307010",
      type: "Alien",
      gender: "male",
      episodes: [
        "https://solaroppositesapi.com/api/episodes/308828691528417861",
        "https://solaroppositesapi.com/api/episodes/308828844405555780",
        "https://solaroppositesapi.com/api/episodes/308828904655684165",
        "https://solaroppositesapi.com/api/episodes/308828964383621700",
        "https://solaroppositesapi.com/api/episodes/308829025531331140",
        "https://solaroppositesapi.com/api/episodes/308829071667626564",
        "https://solaroppositesapi.com/api/episodes/308829119780487749",
        "https://solaroppositesapi.com/api/episodes/308829190630670915",
        "https://solaroppositesapi.com/api/episodes/308829280239878724",
        "https://solaroppositesapi.com/api/episodes/308829295694840387",
        "https://solaroppositesapi.com/api/episodes/308829307238613571",
        "https://solaroppositesapi.com/api/episodes/308829320101495363",
        "https://solaroppositesapi.com/api/episodes/308829335274390084",
        "https://solaroppositesapi.com/api/episodes/308829347649684037",
        "https://solaroppositesapi.com/api/episodes/308829371662074436",
        "https://solaroppositesapi.com/api/episodes/308829388298781251"
      ],
      location: {
        name: "Earth",
        type: "Planet",
        url: "https://solaroppositesapi.com/api/locations/308829637390107205"
      },
      origin: {
        name: "Shlorp",
        type: "Planet",
        url: "https://solaroppositesapi.com/api/locations/305510516355236419"
      },
      status: "Alive"
    },
    ...
  ]
}
```

### Get A Single Charecter
You can get a single charecter by the `id` of the charecter with the `/api/charecters/:id` endpoint.

```js
GET `https://solaroppositesapi.com/api/charecters/${id}`
```

```js
{
  species: "Shlorpian",
  name: "Korvotron",
  url: "https://solaroppositesapi.com/api/characters/308773781365588548",
  image: "https://solaroppositesapi.com/api/images/korvotron",
  alias: "Korvo",
  id: "308773781365588548",
  type: "Alien",
  gender: "male",
  episodes: [
    "https://solaroppositesapi.com/api/episodes/308828691528417861",
    ...
  ],
  location: {
    name: "Earth",
    type: "Planet",
    url: "https://solaroppositesapi.com/api/locations/308829637390107205"
  },
  origin: {
    name: "Shlorp",
    type: "Planet",
    url: "https://solaroppositesapi.com/api/locations/305510516355236419"
  },
  status: "Alive"
}
```

### Filter Characters
You can filter characters by parameters using the query string. Add a `?` followed by `<query>=<value>` at the end of the url to filter for one parameter. And add a `&` in between each parameter to filter by more than one.

When you filter by multiple parameters, you are saying that you want the query to match **ALL** of the parameters.

When you provide an array for `<value>` you are saying that you want the query to match **ANY** of the values in the array for the given field. You can do this with a `<value>, <value>` or `[<value>, <value>]`.

Avaliable parameters:
* `name`: filter by the name of the character. The alias is acceptable as well. _See example below_
* `species`: filter by the species of the character
* `origin`: filter by the origin location name of the character
* `location`: filter by the current location name of the character
* `status`: filter by the status of the character, "alive", "dead", or "unknown"
* `id`: filter by the id of the character
* `gender`: filter by the identified gender of the character
* `episode`: fitler by the episode name


```js
GET `https://solaroppositesapi.com/api/charecters?name=Korvo`
```

```js
GET `https://solaroppositesapi.com/api/charecters?origin=Shlorp&status=alive,dead`
```

## Locations

### Location Schmea
There are a total of `671` total locations in the database.

| key        | type           | description  |
| ------------- |:-------------:| -----:|
| `type`      | string | The type of the location. ie. "Planet", "City" |
| `name`      | string | The name of the location. |
| `url`      | string | The url of this specific location. |
| `image`      | string | The location's image url. |
| `id`      | string | The `Reference` id of the location. |
| `characters`      | object | An array of [characters]() that the location has ever housed. Presents only the urls, unless the `verbose` parameter is set to true. |

### Get All Locations
You can get a list of all locations by making a request to `/api/locations`. Read more about [info]() and [pagination]() to better understand this request.

```js
GET `https://solaroppositesapi.com/api/locations`
```

### Get A Single Location
You can get a single location by the `id` of the location with the `/api/locations/:id` endpoint.

```js
GET `https://solaroppositesapi.com/api/locations/${id}`
```
### Filter Locations

## Episodes

### Episode Schmea
There are a total of `16` total episodes in the database.

| key        | type           | description  |
| ------------- |:-------------:| -----:|
| `name`      | string | The name of the episode |
| `date`      | string | The date the season aired. `YYYY-MM-DD` |
| `season`      | number | The season the episode aired in. |
| `image`      | string | The episode's image url. |
| `url`      | string | The episode's url. |
| `plot`      | string | The episode's plot. |
| `id`      | string | The `Reference` id of the episode. |
| `characters`      | object | An array of [characters]() that the episode included. Presents only the urls, unless the `verbose` parameter is set to true. |

### Get All Episodes

### Get A Single Episode

### Filter Episodes

## Devices

### Device Schmea

### Get All Devices

### Get A Single Device

### Filter Devices

## All Documents
You can request all documents in the database with the `/api/all` endpoint.

You can fine tune this as well by providing a list of `documents` to return into the query string.

Avaliable documents:
* `charecters`
* `locations`
* `episodes`
* `devices`

You can go even further by adding a filter to each of the documents that you are requesting.

```js
GET `https://solaroppositesapi.com/api/all?documents=[charecters=[species=Shlorpian], locations]`],
```

In this request, the results array will become an object with the key being the document name and the value being the results.

## Cookbook