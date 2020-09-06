import {createRenderer} from 'react-test-renderer/shallow';
import {connect} from "../src";
import * as React from "react";

class TestComponent extends React.Component<any, string> {
}

const ConnectedTestComponent = connect(
    (state) => {
        return state
    },
    (actionWrappers) => {
        return actionWrappers
    })(TestComponent)

describe("connect", () => {
    test("should be connected without Error", () => {
        const renderer = createRenderer();

        expect(() => {
            renderer.render(
                <ConnectedTestComponent />
            )
        }).not.toThrow()
    })
})
