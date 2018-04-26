# Material-ripple
Material ripple effect

## Demo
[Codepen demo](https://codepen.io/k-ivan/pen/yXvyxq)

## Installation

```html
<link rel="stylesheet" href="dist/css/ripple.css">
```

```html
<button class="md-ripple">Example</button>
<button class="md-ripple" data-ripple-center>Center ripple</button>
<button class="md-ripple" data-ripple-color="rgba(255,255,255,.5)">Custom color</button>
```

If you are using a module bundler
```
npm i @k-ivan/md-ripple
```
```js
import Ripple from '@k-ivan/md-ripple';
Ripple.init('.md-ripple');
// if necessary later destroy
// Ripple.destroy();
```
or manually inject the minified script into your website

```html
<script src="dist/js/ripple.js"></script>
<script>
  Ripple.init('.md-ripple');
</script>
```