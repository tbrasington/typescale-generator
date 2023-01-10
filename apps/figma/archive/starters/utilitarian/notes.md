Styles seems like it is one thing that the plugin would not store, but generate on run.

Why? well the scale property and the values of a type size vary on the platform. Yes, figma needs px values but other platforms may need a string for clamp, rems etc

It does need a file to tell what the scale is, then each style needs to know what step in the scale though

Do we have one stored style token, and a rendered one if needed for a design token export?

### flow

- import json file
- look at config file,
  - generate scale / sizes per breakpoint
  - breakpoint = [BP1, BP3]
  - scale = [17px, 21px]
- loop through styles
  - look up vars
  - how many breakpoints? 1/2/3 etc
    - create additional styles for each breakpoint
      - look up scale and set value per breakpoint
  - what additional decorations are needed?
    - underline, strike-through?
