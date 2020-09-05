import {createPresenter} from "../src/Presenter";

const test_reducer = () => {
    return {}
}

const test_effect = () => {
    return null
}

describe("createPresenter", () => {
    test("should throw Error when invalid params has been passed", () => {
        expect(() => createPresenter(null as unknown, {
            t: () => {
                return {}
            }
        }, undefined)).toThrow()

        expect(() => createPresenter(test_reducer as unknown, {
            t: () => {
                return {}
            }
        }, undefined)).toThrow()

        expect(() => createPresenter(1, {}, undefined)).toThrow()

        expect(() => createPresenter(1, undefined, undefined)).toThrow()

        expect(() => createPresenter(1, {t: 1 as any}, undefined)).toThrow()


        // there must not be any duplicate keys in reducers and effects
        expect(() => createPresenter(1, {
            duplicate_key: test_reducer
        }, {
            duplicate_key: test_effect
        })).toThrow()

    });

    test("should create presenter correctly", () => {
        expect(createPresenter(1, {
            t: test_reducer
        }, undefined)).toEqual({
            state: 1, reducers: {
                t: test_reducer
            }, effects: {}
        });

        expect(createPresenter({test}, {
            t: test_reducer
        }, undefined)).toEqual({
            state: {test}, reducers: {
                t: test_reducer
            }, effects: {}
        });

        expect(createPresenter({test}, {
            t: test_reducer
        }, {
            e: test_effect
        })).toEqual({
            state: {test}, reducers: {
                t: test_reducer
            }, effects: {
                e: test_effect
            }
        });
    })
});
