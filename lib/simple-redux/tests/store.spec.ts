import {createStore} from "../src/Store";
import {createPresenter, Presenter} from "../src/Presenter";

function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const testPresenter1 = createPresenter(1,
    {
        increase: (previousState, payload) => {
            return (previousState as number) + (payload as number)
        },
        decrease: (previousState, payload) => {
            return (previousState as number) - (payload as number)
        }
    }, {
        increaseAsync: async (payload, actionWrapper) => {
            await timeout(200);
            actionWrapper.testPresenter1.increase(payload);
        }
    }
)

describe("createStore", () => {
    test("should throw Error when invalid params has been passed", () => {

        expect(() => createStore(undefined as unknown as Record<string, Presenter>)).toThrow();

    });

    test("should create store correctly", () => {
        const store = createStore({testPresenter1});

        expect(store.state).toEqual(
            {testPresenter1: testPresenter1.state}
        );

        expect(store.reducers).toEqual(
            {testPresenter1: testPresenter1.reducers}
        );

        expect(store).toHaveProperty("dispatch");

        expect(store.actionWrapper).toHaveProperty("testPresenter1.increase");
        expect(store.actionWrapper).toHaveProperty("testPresenter1.decrease");

        expect(store.effects).toHaveProperty("testPresenter1.increaseAsync");

    });

    test("should api behave correctly", async () => {
        const store = createStore({testPresenter1});

        expect(store.getState()).toEqual(
            {testPresenter1: testPresenter1.state}
        );
        store.actionWrapper.testPresenter1.increase(2); // 1 + 2
        expect(store.getState().testPresenter1).toEqual(3);

        store.actionWrapper.testPresenter1.decrease(1); // 3 - 1
        expect(store.getState().testPresenter1).toEqual(2);

        store.actionWrapper.testPresenter1.increaseAsync(4); // 2 + 4
        expect(store.getState().testPresenter1).toEqual(2);
        await timeout(250);
        expect(store.getState().testPresenter1).toEqual(6);

    })

});
