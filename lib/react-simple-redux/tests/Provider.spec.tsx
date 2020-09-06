import {createPresenter, createStore} from "simple-redux";
import {createRenderer} from 'react-test-renderer/shallow';
import {ProviderComponent} from "../src";
import * as React from "react";

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
            actionWrapper.increase(payload);
        }
    }
)

describe("Provider", () => {
    test("should Provider create without Error", () => {
        const store = createStore({testPresenter1});
        const renderer = createRenderer();

        expect(() => {
            renderer.render(<ProviderComponent store={store}/>)
        }).not.toThrow()
    })
})
