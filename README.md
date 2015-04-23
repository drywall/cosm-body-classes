# Salsa Cosm Body Classer

Pages rendered by [Salsa Labs'](https://www.salsalabs.com) venerable platform, now known as Cosm, often need significant styling for particular clients. While traditional templates offered by the platform allow for significant customization, often styling needs to be present that targets a particular page type: just action alerts, or just donation forms, for example.

Targeting elements that live on just these pages can be difficult, but adding a CSS class to the <body> element can make it much easier. The challenge? Figuring out the page type in order to insert the proper body class.

That's what this script does.

## How to use it

Cosm Body Classer requires jQuery in order to work; thankfully, Salsa loads jQuery by default so you shouldn't need to add it. Yes, Salsa's version of jQuery is ancient, but it's all this script needs.

I'd recommend uploading this script to your Salsa instance and then putting a reference to it in your template just before the closing `</body>` tag:

```html
<script src="/path/to/cosm-body-classes.min.js"></script>
```

Even better: reduce the number of HTTP connections in your template by inlining the code or at least appending it to some other JS file the template's already loading.

The script mostly works by parsing the URL and setting a body class based on what it's found. There is, however, some extra complexity present for trying to identify the specific type of action page being displayed. 

## What it identifies

Here's the complete list of classes this script *might* add to the `<body>` element depending on what it found:

```
lookup
unsubscribe
profile
blasts
letter-to-editor
event
my-salsa
shop
signup
tellafriend
thankyou
questionnaire
action
action-petition
action-targeted
action-multi
action-targeted-or-multi
action-unknown
shop-cart
shop-item
```

If you've got a page type you need identified that's not listed here, please submit an issue and I'll try to add it.

## Configuration

For the simpler "add a class based on the URL string" logic, you can define your own mappings to extend or override what's already present. Simply declare a global object named salsaClasses, and use property/value pairs to set the string to look for in the URL and the class name to add to the body. Like so:

```javascript
salsaClasses = {
	'/c/533': 'california-chapter',
	'public/content': 'content-page'
}
```

Note that this script looks just at the path, so things like the domain name and querystring (anything after the question mark) it ignores. If you need to set behaviors based on the querystring, I recommend using SalsaScript directly.