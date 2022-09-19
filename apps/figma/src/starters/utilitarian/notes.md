Styles seems like it is one thing that the plugin would not store, but generate on run.

Why? well the scale property and the values of a type size vary on the platform. Yes, figma needs px values but other platforms may need a string for clamp, rems etc

It does need a file to tell what the scale is, then each style needs to know what step in the scale though

Do we have one stored style token, and a rendered one if needed for a design token export?
