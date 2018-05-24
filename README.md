# Youtube Video ID Fetcher

[![Build Status](https://travis-ci.org/aajiwani/youtube-video-id-fetcher.svg?branch=master)](https://travis-ci.org/aajiwani/youtube-video-id-fetcher)
[![Dependency status](https://david-dm.org/aajiwani/youtube-video-id-fetcher.svg)](https://david-dm.org/aajiwani/youtube-video-id-fetcher)
[![Coverage Status](https://coveralls.io/repos/github/aajiwani/youtube-video-id-fetcher/badge.svg?branch=master)](https://coveralls.io/github/aajiwani/youtube-video-id-fetcher?branch=master)

This package can get the Youtube video ID from youtube URL directly, or from the redirected Youtube URL

## Running Guide

### Please install and configure `npm` and `yarn` before proceeding

1.  Install Dependencies `yarn install`
2.  Run Tests `yarn test`
    * After running tests, an interactive report could be found under coverage/index.html

## Dependencies

* Some of the scripts in package.json relies upon system commands listed below

1.  `find`
2.  `xargs`
3.  `cd`

## Test Cases
* Please check the test cases for the covered URLs

## Basic Usage
```
import { fetchYoutubeId } from "youtube-video-id-fetcher";
```

```
fetchYoutubeId(
    "http://y2u.be/j4dMnAPZu70"
).then(youtubeId => console.log(youtubeId));

// This will print out j4dMnAPZu70
```