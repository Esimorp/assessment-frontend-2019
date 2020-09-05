const {test} = require("@jest/globals");

import {T} from "../src/Test"

test('jest working', () => {
    expect(
        T({name: "1"})
    ).toBe("1");
})
