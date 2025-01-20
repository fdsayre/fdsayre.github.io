---
title: "Ultimaker 3D Printer Statistics Logger"
---

A Python script to automatically collect print statistics from Ultimaker 3D printers on your local network using the built-in API and store them in both a CSV file and in Google Sheets.

## Background

This script was developed to address changes over the past several years that moved detailed Ultimaker printer statistics behind a subscription wall. Basically, they made it so all the data we want (print time, material amount) except for the last 8 prints was deleted from the local copy of the very-long (all the way back to the first print) data file stored on each machine. This is particularly annoying to me because there is no technical reason for doing this (the file contains a lot of other data, and its all text and so takes up very little space). The only possible reason was to force people to subscribe to their online product, which we otherwise will never need. For over a year, this change has forced us to have staff download printer data multiple times a week to ensure we have a somewhat accurate idea of how much our printers are being used. Obviously this is not a very good use of staff time, or a robust way of tracking use. This script uses the printers' local API to collect essential usage data without requiring a subscription.

This is the biggest and most useful piece of code I've written using AI. To give a little bit of background, I'm not a programmer, though I have played with scripting languages for well over a decade and have run Linux at various times in my life. I know enough to waste dozens of hours trying to do something that I could do manually in a few hours, and an actual programmer could probably automate in a couple of minutes. This script probably took me about 10 hours to put together, largely using ChatGPT and Claude. 

See a more detailed description and the code:  [ultimate-3d-printer-stat-logger/README.md at main · fdsayre/ultimate-3d-printer-stat-logger · GitHub](https://github.com/fdsayre/ultimate-3d-printer-stat-logger/blob/main/README.md) 