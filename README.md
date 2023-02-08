# OpenPost API

## Description

This is an API used by the [openPost web app](https://openpost.adaptable.app/) to obtain data on the latest number of posts in the database as well as fetching new posts (if new posts have been made)

## How the API is used

Here's how it basically works:
![working diagram](/images/working_diagram.png)

Basically:
1) the website (OpenPost) will continuously send HTTP requests asking for the index of the latest post (over 2 second interval)
2) if the index of the latest post is not the same as the current index stored by the website, then it means a new post must've been added
3) in that case, the website will send an HTTP request to fetch the newest three posts.


Here are the HTTP commands:
![HTTP commands](/images/HTTP_commands_pic.png)

