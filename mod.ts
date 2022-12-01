#!/usr/bin/env -S deno run --allow-read=input.bf

import * as asserts from "https://deno.land/std@0.167.0/testing/asserts.ts";

function parse(code: string, input?: string) {
  const memo = [0];
  let memoPos = 0;

  let programPos = 0;

  let output = "";

  while (programPos < code.length) {
    const operator = code[programPos];

    switch (operator) {
      case ">": {
        memoPos++;
        if (memoPos > memo.length - 1) memo.push(0);
        break;
      }
      case "<": {
        if (memoPos === 0) {
          throw new Error("Can't move left while on position 0.");
        }
        memoPos--;
        break;
      }
      case "+": {
        memo[memoPos]++;
        if (memo[memoPos] > 255) memo[memoPos] = 0;
        break;
      }
      case "-": {
        memo[memoPos]--;
        if (memo[memoPos] < 0) memo[memoPos] = 255;
        break;
      }
      case ".": {
        output += String.fromCharCode(memo[memoPos]);
        break;
      }
      case ",": {
        if (!input) throw new Error("No input.");
        memo[memoPos] = input[0].charCodeAt(0);
        input = input.slice(1, input.length);
        break;
      }
      case "[": {
        if (memo[memoPos] === 0) {
          let openBrackets = 0;
          programPos++;

          while (programPos < code.length) {
            const loopOperator = code[programPos];
            if (loopOperator === "]" && openBrackets === 0) break;
            else if (loopOperator === "[") openBrackets++;
            else if (loopOperator === "]") openBrackets--;

            programPos++;
          }
        }

        break;
      }
      case "]": {
        if (memo[memoPos] !== 0) {
          let openBrackets = 0;
          programPos--;

          while (programPos > -1) {
            const loopOperator = code[programPos];
            if (loopOperator === "[" && openBrackets === 0) break;
            else if (loopOperator === "]") openBrackets--;
            else if (loopOperator === "[") openBrackets++;

            programPos--;
          }
        }

        break;
      }
      default: {
        break;
      }
    }

    programPos++;
  }

  return output;
}

Deno.test("Inc correctly and get output.", () => {
  asserts.assertEquals(
    parse(
      "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.",
    ),
    "H",
  );
});

Deno.test("Could handle inputs.", () => {
  asserts.assertEquals(parse(",+.", "H"), "I");
  asserts.assertEquals(parse(",+.>,+.", "He"), "If");
});

Deno.test("Could handle loops", () => {
  asserts.assertEquals(parse(">++++++++[<+++++++++>-]<."), "H");
});

Deno.test("Get Hello, World!", () => {
  asserts.assertEquals(
    parse(`
      >++++++++[<+++++++++>-]<.
      >++++[<+++++++>-]<+.
      +++++++..
      +++.
      >>++++++[<+++++++>-]<++.
      ------------.
      >++++++[<+++++++++>-]<+.
      <.
      +++.
      ------.
      --------.
      >>>++++[<++++++++>-]<+.
    `),
    "Hello, World!",
  );
});

Deno.test("Two numbers multiplier (includes nested loops)", () => {
  asserts.assertEquals(
    parse(",>,<[>[->+>+<<]>>[-<<+>>]<<<-]>>.", String.fromCharCode(8, 9)),
    String.fromCharCode(72),
  );
});

if (import.meta.main) {
  const content = await Deno.readTextFile("./input.bf");
  console.log(parse(content));
}
