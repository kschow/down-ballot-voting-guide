# Overview

The DBVG Data Builder is a small app designed to create valid data files for use in the down ballot voting guide.

This application saves its state locally with each change for ease of use but does NOT save to any cloud storage. As such it is not built to be highly collaborative but there are options to save any progress to a file.

A copy of this app will be made publicly available at https://dbvg-data-builder.vercel.app. If there are any extra changes necessary, please refer to the "How to update/run" section.

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [How to use](#how-to-use)
- [Definitions](#definitions)
  - [Election](#election)
  - [Ballot](#ballot)
  - [Race](#race)
  - [Issue](#issue)
  - [Candidate](#candidate)
- [How to update/run](#how-to-updaterun)
  - [Updating this application](#updating-this-application)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## How to use
Upon accessing the app, a short message about the use of this app as stated above will appear. If you have already started progress there will be a button to continue from your previous progress. Otherwise, there will be a button to start a new election.

Some important points:
* To edit a field press the pencil icon.
* Only one field can be edited at a time, either save or cancel before attempting to edit another field. 
* To save your progress to a file, click on the "Save File" button at the bottom of the work area. 
* That file will download into the "Downloads" folder with a filename of the election's name and an extension of json.

## Definitions

### Election

An election is the highest level object. It can consist of multiple ballots. An example of an election with multiple ballots are the primary elections before major elections. In these cases, there are often multiple ballots for each major party, Democrat/Republican.

As such, the best election name should be descriptive of the date and type of election. E.g. 2022 Primary Election, 2022 Primary Runoff Election, 2022 General Election etc.

#### Fields
* Election name: The name of the election as described above.

### Ballot

A ballot represents the collection of races a voter is allowed to vote on. Like above, the best names should be descriptive of the date and type of ballot. These may be more specific than above. E.g. 2022 Democratic Primary Election.

#### Fields
* Ballot name: The name of the ballot as described above.

### Race

A race represents a specific role that is being voted on. It consists of issues and candidates. When an issue is added to a race, an entry is added to each candidate for what their position on that issue is.

#### Fields
* Name: The name of the role being voted on. E.g. U.S. Senator, Railroad Commissioner, etc.
* Position Description: A description of the role and what its responsibilities may include.

### Issue

An issue represents something a candidate is being asked.

#### Fields
* Name: A descriptive name of what this issue is about. E.g. Immigration, Gun Control, etc.
* Question: The question being asked to candidates.

### Candidate

A candidate is a collection of the candidate's information and their answers to each of the questions about issues asked to them.

#### Fields
* Education: A description of the candidate's education.
* Campaign Website: A link to the candidate's campaign website, if available.
* Facebook Page: A link to the candidate's campaign Facebook page, if available. This is likely NOT the candidate's personal Facebook page.
* Twitter Profile: A link to the candidate's campaign Twitter profile, if available. This is likely NOT the candidate's personal Twitter profile.
* Video Link: A link to an informational campaign video by the candidate, if available.
* Position: The candidate's answer to a particular question.

## How to update/run

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Please refer to that in order to better understand the basics of how to run this app locally.

### Updating this application

If you would like to update this application, first please reach out directly to see what if there is anything I can help out with.

To add a field to an existing object, you would want to do the following:
* Add the desired field to the correct type in the shared-types package in the Data.ts file.
* Make sure to run `yarn build` in the shared-types package to make sure the changes are picked up.
* Add an EditableField for that field to the corresponding Builder, see the builders in the Builder folder for examples.

To add an entirely new object type, you would need to do the following:
* Add a new object type with your desired fields in the shared-types package in the Data.ts file. Update any types that might be dependent on your new object type.
* Make sure to run `yarn build` in the shared-types package to make sure the changes are picked up.
* Add a new builder component to the Builders folder. Connect that component to the dependent builders. See existing builders for examples.
  * If your new type(s) need ids of any sort, use the getNewId function from useIdGenerator.
