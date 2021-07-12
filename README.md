## Zombie Apocalypse

#### Zombie Apocalypse Simulator

Nodejs application that simulates zombie apocalypse in a 2 x 2 matrix world.

## Project Status

This project is a personal project and currently in development. Users can predict how zombies would take over the world by providing some initial parameters. Validations, Unit tests and other imporvements are ongoing.

## Installation and Setup Instructions

You will need `node` and `npm` installed globally on your machine.
(Tested using npm 7x, Node 14x)

- Installation: `npm install`

- Check Lint `npm run lint`

- To Start the application: `npm start`

- Please provide paramters as requested in prompt

- Output will be displayed in the terminal

## Reflection

This was a sample project I decided to undertake as an assignment.
Project utilises `prettier` for formatting and `eslint` for linting options.
Project uses prompt to take user inputs. These user inputs are matched against a schema in `/lib/schema.js`
Project uses `Logger.js` that has been sourced from an open source project and modified for this project.

## TODOs

- In the next iteration I plan on adding validations on inputs prompts
- Additionally, I plan on adding unit tests for the functions used