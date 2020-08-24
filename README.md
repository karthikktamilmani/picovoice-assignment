# picovoice-assignment

## Problem 1

Given an input string and a pattern, implement regular expressionmatching with support for ‘.’ and ‘\*’.
- '.' Matches any single character
- '\*' Matches zero or more of the preceding element

### Approach

* Preprocessed the pattern given, under the following assumptions:
  * Any character with '\*' after '.\*' is removed,
  * Repeating characters with '\*' is removed.
  * Eg: a\*a\*a\* is converted to a* and abc.\*a* is converted to abc.\*. But abc.\*aa\* remains the same.
* Once the new pattern is found, I have used dynamic programming to solve the problem.
  * Incase of '\*', then all kinds of possible combinations are tried and found for success

## Problem 2

You are tasked to implement a real-time audio processing modulewithin a web browser. You need to record audio from the microphone and visualizethe loudness of the audio signal within a webpage. The implementation needs tosupport the latest releases of Chrome, Safari, and Firefox.

### Approach

* Used Web Audio API with navigator.mediaDevices.getUserMedia to get access of the microphone.
* For fetching the volume from the audio stream, getFloatFrequencyData is used.
* Tested in Firefox, Chrome and Safari.

## Problem 3

Implement a 5-star widget for an eCommerce site for usersto record a product rating. The widget displays a horizontal row of stars that areeither outlined or black, according to the product rating, from left to right. E.g.★★★☆☆ = rating of 3.

Many 5-star widgets can be present on a single page. If a user has not rated aproduct, the widget will have 5 outlined stars (☆☆☆☆☆). Each product on the pagehas a unique ID. Hovering over the Nth star will light up stars 1 to N with a grey colour(e.g. ★★★★☆ ). Clicking a star will record the rating by sending a request to a webserver with enough information to record the product and the rating. After clicking,the widget will then display the rating the user submitted with black stars (e.g.★★★★☆). Submitting the rating is handled without refreshing the page.

You may assume that there is a REST or GraphQL endpoint setup. You may useJavaScript libraries. You do not need to handle authorization or authentication forsubmitting the rating and can assume that the request includes authenticationinformation to identify the customer.

### Approach

* Created a custom element for 5 star rating.
* Ability to set value to the element, which auto-fills the ratings.
* Click or submit callback is provided using the attr thereby, developer can have more control over the event.
* When rating is not submitted, hovering over the Nth star will light up stars 1 to N with a grey colour(e.g. ★★★★☆ ) is provided.
* Incase a rating is provided, hover options are not provided.
* After clicking,the widget will then display the rating the user submitted with black stars (e.g.★★★★☆).
