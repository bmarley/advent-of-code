# advent-of-code

These are my solutions to the [Advent of Code](http://adventofcode.com) programming puzzles.

## Setup

1. `git clone https://github.com/apazzolini/advent-of-code.git`
1. `cd advent-of-code && rm -rf src/20*`
1. Ensure you're using Node v14+ (for native ESM support)
1. `yarn install`
1. Create a `.env` file in the root of this project directory with
   `SESSION=<your session token from AoC>`, which you can retrieve by inspecting the network
   call when fetching puzzle inputs.

## Workflow

First, generate a skeleton for the day you're solving:

`yarn run generate <yyyy> <dd>` e.g. `yarn run generate 2020 01`

Next, work on your code and tests. Run tests in watch mode with:

`yarn run test:watch <yyyy>.day<dd>` e.g. `yarn run test:watch 2020.day01`

If you need to debug your code, run the following command and then connect your debugger:

`yarn run test:debug <yyyy>.day<dd>` e.g. `yarn run test:debug 2020.day01`

Once you're ready to solve your input, run:

`yarn run solve <yyyy> <dd> <part (1 or 2)>` e.g. `yarn run solve 2020 01 1`

The answer will automatically be copied to your clipboard.
