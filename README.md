# Test

> Note: If you’re viewing the README file directly, a more complete version is available at this project’s [web page](http://sathomas.me/test/).

## Status: [![Build Status](https://travis-ci.org/sathomas/test.png)](https://travis-ci.org/sathomas/test)

Any update to this repository triggers an automated execution of all of the project’s unit tests. The status label above shows the result of those unit tests.

## Introduction

This is a simple demonstration application inspired by a [test problem](http://sathomas.me/test/problem/problem.html) The problem itself isn’t complex enough to warrant a full, production-quality web application, but it does provide a useful example to explore all of the tools and components that might make up a real app. Those tools include:

* Javascript MVC framework
* Full lint testing
* Test-Driven Development configuration
* All unit tests reusable from command line
* Continuous integration runs all tests automatically on repository update
* Style sheets developed using CSS preprocessor
* HTML5 with semantic markup but backwards compatible with legacy browsers
* Full accessibility
* Responsive design supporting viewports from smartphone to desktop
* Production-ready builds (concatenated and minified CSS and Javascript)

THe bulk of the project is a simple Javascript web app. An annotated walk-through of the app's [source code](http://sathomas.me/test/src/app.html) is available.

## Project Structure

There are four folders in the project. The `/src` folder holds the project’s source code. That source code include the HTML template, Javascript files, LESS style sheets, and third-party (vendor) libraries. The `/test` folder holds the unit test scaffolding, mostly third-party libraries. The unit tests themselves are contained in the single `app-test.js` file, and `mocha.opts` specifies the test options. The `/docs` folder has project documentation, and the `/build` folder stores the production version of the application. You can load the application directly in your browser via the URL [http://sathomas.me/test/build/index.html](http://sathomas.me/test/build/index.html).

```
/build
/docs
/src
/test
```

There are also a few independent files in the project root folder. These files are mostly project scaffolding and include `.gitignore` to specify local OS files (e.g. `.DS_Store`) not relevant to the project, `.travis.yml` to specify the continuous integration tests and `package.json` to indicate dependencies for those tests, this file (`README.md`), and tool settings (`codekit-config.json` for [CodeKit](http://incident57.com/codekit/) and `testem.json` for [Test’em](https://github.com/airportyh/testem))

```
.gitignore
.travis.yml
README.md
codekit-config.json
package.json
testem.json
```

## The HTML Markup

The basic HTML for the project is a standard, valid HTML5 document. A single `<div>` with an `id` attribute of `thisApps` contains the application.

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Simple Test Application</title>
    
    <!-- All styles in single, minified stylesheet -->
    <link href="css/styles.min.css" rel="stylesheet" type="text/css">
    
</head>
<body>
<!--
    Use an empty <div> as a beacon so Javascript can tell when
    CSS styles are loaded and active.
 -->
    <div id="beacon"></div>
    
    <!-- The app's main view is rendered within the following <div> -->
    <div id="thisApps"><div>
    
    <!-- All scripts in single, minified script file -->
    <script src="js/scripts.min.js"></script>
</body>
</html>
```

The HTML markup generated by the project is clean, semantic, and accessible. In particular, it fundamentally consists of a heading for the date, and an unordered list of events on that date. The resulting page is viewable and usable by text-only browsers and by screen readers for visually impaired users.

```html
<h1>Sunday, June 9th 2013</h1>
<ul class="events">
    <li class="event">9:30 am to 11:30 am: Sample Item at Sample Location</li>
    <li class="event">6:00 pm to 7:00 pm: Sample Item at Sample Location</li>
    <li class="event">6:20 pm to 7:20 pm: Sample Item at Sample Location</li>
    <li class="event">7:10 pm to 8:10 pm: Sample Item at Sample Location</li>
</ul>
```

To further assist screen readers, specific times are wrapped in the HTML5 `<time>` element with full ISO-formatting as an attribute.

```html
<time datetime="2013-06-09 09:30">9:30 am</time>
```

Additional `<span>` tags are wrapped around the elements to assist in styling.

Also, if the Javascript detects that CSS styles are available, it adds a `.legend` `<div>` to the markup that provides additional content when styled appropriately. The Javascript uses a `#beacon` element to test for CSS styling. If CSS styling is not available, the legend is not added so as not to unnecessarily confuse text-only browsers or screen readers. When the legend is inserted, its attributes include the ARIA `role` of `presentation` to ensure that screen readers don’t interpret it as content.

Finally, the Javascript adds `data-` attributes to the list items with relative positioning information. The CSS styles can use that information as appropriate to adjust the elements’ display. There are a couple of notable features about these attributes. First, the attribute values are specified as percentages rather than absolute pixels. This approach fully supports fluid layouts, relieving the Javascript of any concerns related to presentation. Secondly, the positioning information is added to the `<li>` elements as `data-` attributes rather than as properties of the elements. This lets the CSS decide whether or not to use the positioning information and is critical for responsive design.

```html
<li class="event" data-top="4%" data-left="0%" data-height="16%" data-width="100%"></li>
```

## Styles

The project’s styles are defined using [LESS](http://lesscss.org) to augment standard CSS with variables and mixins. The most extensive mixins are in the `layout.less` file, which provides the functionality to style elements based on their data attributes. In the particular, the `layout()` mixin makes use of LESS parameters and guards. If the parameter is one of the four defined values (`height`, `width`, `top`, or `left`), then the mixin looks for `data-` attributes corresponding to the parameter value. If any are present, then it defines the corresponding style using the `data-` attribute value.

```css
.layout(@attr) when (@attr=height) {
    &[data-height="0%"]   { height:   0%; }
    &[data-height="1%"]   { height:   1%; }
    ...
```

The main styles for the project use this mixin simply by including it as a property when desired. For example, the desktop styles for `.event` list items use all four of the layout properties.

```css
.event {
    position: absolute;
    .layout(height);
    .layout(width);
    .layout(top);
    .layout(left);
}
```

The smartphone styles for these same `.event` list items do not use the `data-` attributes for styling.

```css
.event {
    position: static;
    height: auto;
    width: 100% !important;
    top: 0;
    left: 0;
}
```

The primary styles for the project are included in the `events.less` file, which specifies both desktop and smartphone styles. The styles themselves are relatively straightforward and don’t warrant additional commentary.

To see the resulting web application (e.g. in a desktop browser) use <a href="http://sathomas.me/test/build/index.html" target="_blank">this link</a> (in a separate window). The `<iframe>` below contains the smartphone view of the same data. (It simply loads the same URL in an `<iframe>` of fixed height and width.)

> Note: Because of GitHub restrictions, the embedded `<iframe>` is only visible on the [web page](http://sathomas.me/test/) version of this file.

<iframe height="480" width="320" src="http://sathomas.me/test/build/index.html" style="border: 2px #888 solid"></iframe>

## Javascript

The bulk of the project consist of a single Javascript file, `app.js`. That file implements a standard set of [Backbone.js](http://backbonejs.org) models, views, and collections. Although the problem specifies a single, static set of events, the code supports a REST API for server interaction, multiple day support, and dynamic creation or modification of events.

Comments within that file provide extensive documentation. _**That documentation is viewable as a separate [web page](http://sathomas.me/test/src/app.html).**_ The code also relies heavily on [Underscore.js](http://underscorejs.org) to implement a functional programming paradigm. I’ve described Underscore’s support for functional programming in this [blog post](http://blog.sathomas.me/post/making-javascript-functional-with-underscore.js).

The full suite of unit tests for the app are contained in the `app-test.js`. Those tests are self-documenting by design. For a thorough description of my unit testing strategy, tools, and process, you can check out this [blog post](http://blog.sathomas.me/post/unit-testing-backbone.js-applications). A sample unit test output is shown below.

<pre style="color:white; background: #333">

  Application
    <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">creates a global variable for the name space</span>

  Event Model
    Initialization
      <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should default the title to an empty string</span>
      <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should default the location to an empty string</span>
      <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should default the start time to now</span>
      <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should default the end time to now</span>
      <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should default the position to first (e.g. left-most)</span>
      <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should default the overlap to none</span>
    Parsing
      <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should convert minutes since 9:00am to a moment object</span>
      <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should convert Unix seconds to a moment object</span>
      <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should convert Unix milliseconds to a moment object</span>

  Event List Item View
    <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">render() should return the view object</span>
    <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should update automatically on model changes</span>
    Template
      <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should render as a list item</span>
      Event Times
        <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should include times for the event</span>
        Start Time
          <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should include the start time</span>
          <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should have the correct start time</span>
          <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should the ISO-formatted start time as a datetime attribute</span>
        End Time
          <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should include the end time</span>
          <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should have the correct end time</span>
          <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should the ISO-formatted end time as a datetime attribute</span>
      Event Title
        <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should include the event title</span>
        <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should have the correct title</span>
      Event Location
        <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should include the event location</span>
        <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should have the correct title</span>
      Data Attributes
        <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should include the event position</span>
        <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should include the event overlap</span>

  Events Collection
    <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should accept direct initialization of models</span>
    Layout Calculation
      <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should identify overlapping event times</span>
      <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should not overlap back-to-back events</span>
      <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should not overlap different days</span>
      <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should calculate positions</span>
      <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should position earliest starting events first</span>
      <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should fill in position gaps</span>
      <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should calculate event height</span>
      <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should calculate event vertical position</span>
      <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should calculate height for early events</span>
      <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should calculate vertical position for early events</span>
      <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should calculate height for late events</span>
      <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should calculate vertical position for late events</span>

  Events List View
    <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">render() should return the view object</span>
    <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should render as an unordered list</span>
    <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should include list items for all models in collection</span>
    <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should dynamically add list items as events are added to the collection</span>
    <span style="color:#2DBA2B">✓</span> <span style="color:#aaa">should filter models based on date</span>


  <span style="color:#2DBA2B">44 tests complete</span> <span style="color:#aaa">(257 ms)</span>
</pre>
