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
  "stats": {
    "response_time": 0.0034689903259277344
  },
  "results": {
    "message": "Welcome to the Solar Opposites API!",
    "documentation": "https://solaroppositesapi.com/documentation",
    "characters": "https://solaroppositesapi.com/api/character",
    "locations": "https://solaroppositesapi.com/api/location",
    "episodes": "https://solaroppositesapi.com/api/episode",
  }
}
```
### Info, Results, and Pagination
Each request returns `results`, `stats`, and `info`. 

**Results** is either an array of objects that met the criteria of the request, or if you are requesting a single document, it will be a single object.

**Stats** is an object that contains information about the request.
* `response_time`: The time, in miliseconds, it took to process the request. _This is calculated from the time the request is recieved, to the time the request is sent._
  * [View the source]().
* `request_time`: The time, in epoch time, that the request was recieved.
* `request_log`: A url to view the request log - with more detailed information.

**Info** is an object that contains information about the response. _It is ommited when requesting single documents_.
* `count`: The number of results returned
* `pages`: The number of pages of results
* `after`: The url for the next page of results
* `before`: The url for the previous page of results

The default page size is 64. You can adjust this in the query string with the `size` parameter.

```js
GET `https://solaroppositesapi.com/api/charecters?size=100`
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
When using the verbose option, the max page size is 24, and the default is 12.
:::
<script setup>
  import { ref } from 'vue'
  const count = ref(0)
  fetch('https://rickandmortyapi.com/api/character')
  .then(res => res.json())
  .then(res => count.value = res.info.count)
</script>
## Charecters
There are a total of <code>{{ count }}</code> total charecters in the database.

### Charecter Schema
| key        | type           | description  |
| ------------- |:-------------:| -----:|
| `species`      | string | The species of the charecter. |
| `name`      | string | The name of the charecter. |
| `url`      | string | The url of this specific charecter. |
| `image`      | string | The charecter's image url. |
| `alias`      | string or string[] | An alias of the charecter. |
| `id`      | string | The `Reference` id of the charecter. |
| `type`      | string | A category of the charecter in addition to sepcies. |
| `gender`      | string | The gender identification of the charecter. |
| `episodes`      | object | An array of [episodes](/documentation#episode-schmea) that the charecter appeared in. Presents only the urls, unless the `verbose` parameter is set to true. |
| `location`      | object or "unknown" | The [location](/documentation#location-schmea) of the charecter, currently. |
| `origin`      | object or "unknown" | The origin [location](/documentation#location-schmea) of the charecter. |
| `status`      | "alive" or "dead" or "unknown" | The charecter's life/death status. |

### Get All Charecters
You can get a list of all charecters by making a request to `/api/charecters`. Read more about [info](/documentation#info-results-and-pagination) and [pagination](/documentation#info-results-and-pagination) to better understand this request.

```js
GET `https://solaroppositesapi.com/api/charecters`
```

```js
{
  "stats": {
    "response_time": 338.01973700523376,
    "request_time": 1630882779,
    "request_log": "https://solaroppositesapi.com/api/logs/305497645548307010"
  },
  "info": {
    "count": 16,
    "after": null,
    "before": "https://solaroppositesapi.com/api/characters%3F%26before%3D305497645548307010",
    "pages": 1
  },
  "results": [
    {
      "species": "Shlorpian",
      "name": "Korvotron",
      "url": "https://solaroppositesapi.com/api/characters/308773781365588548",
      "image": "https://solaroppositesapi.com/api/images/characters/korvotron",
      "alias": "Korvo",
      "id": "308773781365588548",
      "type": "Alien",
      "gender": "male",
      "episodes": [
        "https://solaroppositesapi.com/api/episodes/308828691528417861",
        ...
      ],
      "location": {
        "name": "Earth",
        "type": "Planet",
        "url": "https://solaroppositesapi.com/api/locations/308829637390107205",
        "image": "https://solaroppositesapi.com/api/images/locations/earth"
      },
      "origin": {
        "name": "Shlorp",
        "type": "Planet",
        "url": "https://solaroppositesapi.com/api/locations/305510516355236419",
        "image": "https://solaroppositesapi.com/api/images/locations/shlorp"
      },
      "status": "Alive"
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
  "stats": {
    "response_time": 192.01973700523376,
    "request_time": 1630882779,
    "request_log": "https://solaroppositesapi.com/api/logs/305497645548307010"
  },
  results: {
    "species": "Shlorpian",
    "name": "Korvotron",
    "url": "https://solaroppositesapi.com/api/characters/308773781365588548",
    "image": "https://solaroppositesapi.com/api/images/characters/korvotron",
    "alias": "Korvo",
    "id": "308773781365588548",
    "type": "Alien",
    "gender": "male",
    "episodes": [
      "https://solaroppositesapi.com/api/episodes/308828691528417861",
      ...
    ],
    "location": {
      "name": "Earth",
      "type": "Planet",
      "url": "https://solaroppositesapi.com/api/locations/308829637390107205",
      "image": "https://solaroppositesapi.com/api/images/locations/earth"
    },
    "origin": {
      "name": "Shlorp",
      "type": "Planet",
      "url": "https://solaroppositesapi.com/api/locations/305510516355236419",
      "image": "https://solaroppositesapi.com/api/images/locations/shlorp"
    },
    "status": "Alive"
  }
}
```

### Filter Characters
You can filter characters by parameters using the query string. Add a `?` followed by `<query>=<value>` at the end of the url to filter for one parameter. And add a `&` in between each parameter to filter by more than one.

When you filter by multiple parameters, you are saying that you want the query to match **ALL** of the parameters.

When you provide an array for `<value>` you are saying that you want the query to match **ANY** of the values in the array for the given field. You can do this with a `<value>, <value>` or `[<value>, <value>]`.

Avaliable parameters:
* `name`: filter by the name of the character.
* `species`: filter by the species of the character.
* `status`: filter by the status of the character, "alive", "dead", or "unknown".
* `id`: filter by the id of the character. _Useful for retrieving a two or more specific characters._
* `gender`: filter by the identified gender of the character.


```js
GET `https://solaroppositesapi.com/api/charecters?name=Korvo`
```

```js
GET `https://solaroppositesapi.com/api/charecters?species=Shlorpian&status=alive,dead`
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