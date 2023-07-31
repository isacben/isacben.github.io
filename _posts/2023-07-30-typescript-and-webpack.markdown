---
layout: post
title:  "TIL: How to use TypeScript with webpack"
date:   2023-07-30 00:00:00 -0000
categories: javascript
---

I am getting ready for the 13JSKGAMES competition, in which you have to develope a video game in Javascript that fits in 13 kilobytes.

I wanted to learn TypeScript. So, I am using this opportunity to learn about it.

I also need to ship the game in a zip file, no bigger than 13k. So, this is also a good opportunity to learn about webpack, which I have been hearing about for a while.

## Installation

I already had Node.JS.

I installed first TypeScript and webpack in my development directory (which would also be my GitHub repo):

```
% sudo n lts
% sudo npm install -g typescript
% sudo npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin
```

I then created my `package.json` and `webpack.config.js` files:

```
% npm init
```

I wrote the `webpack.config.js` file manually.

Here, you can also install other dependencies. In my case, I needed the game engine Kontra.js

```
% sudo npm install kontra
```

With this configuration, I can now run the following command in the CLI to build in development mode:

```
% npm run webpack
```

I can also run the following command to compile and open a web browser window; every time I update my code, the web page will be refreshed:

```
% npm start
```

My repository can be found here:

[https://github.com/isacben/js13kgames_template](https://github.com/isacben/js13kgames_template)