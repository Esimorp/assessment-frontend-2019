import {createActionCreator} from "../src/Action";

describe("createActionCreator", () => {
    test("should throw Error when invalid params has been passed", () => {
        expect(() => createActionCreator(null as unknown as string, null as unknown as string)).toThrow();

        expect(() => createActionCreator(undefined as unknown as string, undefined as unknown as string)).toThrow();

        expect(() => createActionCreator(1 as unknown as string, 2 as unknown as string)).toThrow();
    });


    test("should create ActionCreator correctly", () => {

        expect(createActionCreator("test-namespace", "test-type")).not.toThrow();

        expect(
            () => createActionCreator("test-namespace", "test-type")("test-payload")
        ).not.toThrow();

        expect(
            createActionCreator("test-namespace", "test-type")("test-payload")
        ).toEqual({
            type: 'test-namespace/test-type',
            payload: 'test-payload'
        });

        expect(
            createActionCreator("test-namespace", "test-type")(null)
        ).toEqual({
            type: 'test-namespace/test-type',
            payload: null
        });

        expect(createActionCreator("test-namespace", "test-type")({key: 'value'})).toEqual({
            type: 'test-namespace/test-type',
            payload: {key: 'value'}
        });
    });
});
