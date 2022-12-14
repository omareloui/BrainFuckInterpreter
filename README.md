# BrainFuck Interpreter

BrainFuck is an esoteric programming language [read more here](https://en.wikipedia.org/wiki/Brainfuck).

## Language instructions

- `>` increment the data pointer (to point to the next cell to the right).
- `<` decrement the data pointer (to point to the next cell to the left).
- `+` increment (increase by one, truncate overflow: 255 + 1 = 0) the byte at the data pointer.
- `-` decrement (decrease by one, treat as unsigned byte: 0 - 1 = 255 ) the byte at the data pointer.
- `.` output the byte at the data pointer.
- `,` accept one byte of input, storing its value in the byte at the data pointer.
- `[` if the byte at the data pointer is zero, then instead of moving the instruction pointer forward to the next command, jump it forward to the command after the matching ] command.
- `]` if the byte at the data pointer is nonzero, then instead of moving the instruction pointer forward to the next command, jump it back to the command after the matching [ command.

---

**To run the tests**

```bash
deno test mod.ts
```

**To run the interpreter** provide the input in a file named `input.bf` then run

```bash
deno run --allow-read=input.bf mod.ts
# or
chmod +x mod.ts
./mod.ts
```

---

## License

WTFPL.
