## PRINCIPLES

### SCOPE

This is an opensource prject that aims to build an high level design system by using web components including all is needed to render complex html elements on any web page without any other js library

from the consumer point of view, it needs only to:

- consume basic html web components by cdn

- update the dom attributes of the components to configure their status

- get custom events to intearct with events originating inside the components

These components wants to cover not only "small" components like buttons or badge or avatar etc... but also "high level" of components like an entire layout with sidebar, footer, utilities like cookie law notifier, tables with custom confirm modals, and of course something smaller like pagination and dropdown, that are also nested inside the bigger components.

all packages is published as npm @htmlbricks packages

<!--
## MAIN GOAL

The main goal is to obtain a large set of components to manage all the main aspect of a web site, to be able to build websites on any technology (basic html included) embedding only these components with no other addictions

the only expect to develop on a new app based from that components is the app logic that will be responsable to:
- render the components when needed
- sync slots and attributes on components
- handling events from components -->

### technologies involved

To build the components is choosed to use svelte instead of native web components framework like lit-element. That's because of the good svelte footprint exports, and because of the productivity of svelte/rollup development, even there is some glich that is caused by svelte.

## ONLINE RESOURCES

- [Storybook App](https://htmlbricks.dev.kernel.online/)

- All In One bundle

```
<script src="https://cdn.jsdelivr.net/npm/@htmlbricks/hb-bundle@0.4.0/release/release.js"></script>
```

## HOW TO USE THIS REPO

#### system requirements

nodejs 16 / npm7+

#### development framework

- svelte

#### tools

- lerna
- storybook

#### languages

- typescript
- html
- css/scss

### lerna

this repo is managed by lerna.
To be able to install packages dependency is needed to:

- install all packages dependencies and build the components

to do it, you can do:

install lerna and run on the working dir:

`lerna bootstrap --hoist`

or without installing lerna globally, go to the working dir and run:

`npx lerna bootstrap --hoist`

### storybook

on this repo is present storybook it allows to debug/test the components, you need to install it globally

### bootstrap 5

the main css library involved inside this repo is bootstrap 5, the sole change needed from the official one is update the tag :root with :host on scss files.
To get a different default axpect to default bootstrap 5 template there is an override file to change some default colors for bootstrap scss variables.
The bootstraps scss files needed is imported from the components, then rollup will transpile the bundle alongside html and js.

Bootstrap 5 was choosen because their elasticity and next will be experimented the ability to configure it's variables passing css vars

### HOW TO WORK WITH STORYBOOK TO SHOW/DEBUG COMPONENTS

after bootstrapping the app (that includes the builds for the packages) install storybook globally, then go to the ./storybook/ folder and run:

`npm run storybook`

### RACCOMANDATIONS

when is needed to publish one/more packages version update, is needed to publish ALL packages and not only the one changed, because of the dependencies between packages it self

## COMPONENTS UNDER DEVELOPMENT:

### uncategorized

- dialog
- contact
- cookie law
- downloader
- live video player
- login/register
- pagination
- banner
- range slider
- dropdown
- video card
- video modal
- calendar with clickable notes inside cells

### contents

- calendar
- table
- video gallery
- video editor

### layout

- footer
- navbar
- layout
- offcanvas/sidebar

### form

- text input
- number input
- select
- email input
- checkbox
- textarea input
- date input
- radio input
- file input
- main form by schema
- funnel by form schemes

### pages

- login register page

### graphs

- charts
- gauges

### maps

- map with markers

## PLANNED COMPONENTS:

### uncategorized

- notification menu
- toast notification
- cart dropdown
- search bar with suggestions
- comment box
- chat

### widget/card

- shop item (square card with image)
- shop item (list with small thumbnail)
- contact form for SPA sites
- products comparison with price

### legal

- privacy policy html page by json config

### pages

- blog web page
- article web page
- cart
- item of a shop with images
- contact detail

### maps

- directions
- area selection
