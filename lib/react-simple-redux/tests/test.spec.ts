import {createPresenter} from "simple-redux"

describe("test package working", () => {
    test("test package working", () => {
        expect(() => createPresenter(1, {
            t: () => {
                return {}
            }
        })).not.toThrow()
    })
});
