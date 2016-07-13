# Checkers
[![Build Status](https://travis-ci.com/Renjuju/Checkers.svg?token=w4e2mxas5XbnReXXPHKx&branch=master)](https://travis-ci.com/Renjuju/Checkers)
# Installation
```bash
git clone https://github.com/Renjuju/Checkers.git
```
Go to the Checkers directory
```bash
npm install
```
Then start up the server
```bash
node server.js
```
The site will be up at localhost:3000

#EC2 instance
*What is an ec2 instance?*

For our purposes, it's a machine running Ubuntu14.04 that's always up. 
Kind of like tux, but we can host our app on it

##Connecting to it
```bash
ssh -i checkeraws.pem ubuntu@ec2-52-40-146-219.us-west-2.compute.amazonaws.com
```
##Deploying the application once connected
```bash
cd Checkers
git pull --rebase
forever start server.js
```

# Due Dates
|Tasks   |Dates   |
|---|---|
|~~Formation of Project Teams~~|6/26/16|
|~~Requirements Document [Draft]~~|7/10/16|
|Requirements Document [Baselined]|7/24/16|
|Design Document|7/24/16|
|Team Evaluation Form [Midterm]|7/24/16|
|Test Case Document|8/21/16   |
|Final Project Submission & Team Eval|8/21/16|
