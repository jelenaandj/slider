
START SLIDER
open main.js in browser
start server
json-server --watch db.json

Slider:

 

Custom slider component with an unlimited number of images.
	
Slider hould has three ways to change slides:


1. The current image is just replaced with the next image (basic)

2. The current image fades out, and the next image fades in (fade)

3. Scrolls horizontally from the current image to the next image (scroll)


	
Changing slides can be done either with the arrows on the left and right sides of the component, or with the dots(bullets) at the bottom of the component.
	
The number of dots(bullets) is equal to the total number of slides of one slider
	
Arrows move slide by slide, dots can be used to reach any desired slide
	
The slider can have an infinity option
	
When the infinity option is enabled, the arrows are never hidden/disabled, and with their help it is possible to return from the last to the first slide, as well as from the first to the last
	
When the infinity option is off, you need to hide the left arrow on the first slide, and the right arrow on the last one
	
The slider can have an auto-slide option
	
When this option is enabled, it is necessary to change the slides automatically after a certain time period, which can also be defined at the slider level (add a fallback value for the time period).
	
If the infinity option is also enabled, the slides will rotate in a circle
	
If the infinity option is off, the auto-slide stops when the last slide is reached
	
When there are multiple sliders on one page, each slider should still work properly, without disrupting the work of other sliders on that page.


 

(HTML, CSS and Vanilla JavaScript)

Slider wrapper example:

<!-- <div class="slider js-slider" data-component="Slider" data-autoplay="true" data-interval = "2500" data-infinite="true" data-animation-type="fade" data-bullets="true"></div> -->

