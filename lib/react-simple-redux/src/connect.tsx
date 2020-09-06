import React, {Component} from 'react'
import {Consumer} from './Context'

type MapStateToPropsFunction = (state: Record<string, Record<string, unknown>>) => Record<string, unknown>
type MapActionWrapperToPropsFunction = (actionWrappers: Record<string, Record<string, unknown>>) => Record<string, unknown>

interface ProxyProps {
    store: any
}

function connect(mapStateToProps: MapStateToPropsFunction, mapActionWrapperToProps: MapActionWrapperToPropsFunction) {
    return function (WrapComponent: any) {
        class Proxy extends Component<ProxyProps> {
            private unsub: unknown;

            constructor(props: ProxyProps) {
                super(props);
                this.state = props.store.getState();
                this.unsub = props.store.subscribe(function (this: Proxy) {
                    this.setState(this.props.store.getState())
                }.bind(this))
            }

            componentWillUnmount() {
                this.props.store.unsubscribe(this.unsub);
            }

            render() {
                const _props: Record<string, unknown> = Object.assign({}, this.props);
                delete _props['store'];
                return (
                    <WrapComponent {..._props} {...mapStateToProps(this.state)} {...mapActionWrapperToProps(this.props.store.actionWrapper)} />
                )
            }
        }

        return (props: any) => {
            return (
                <Consumer>
                    {
                        value => <Proxy store={value} {...props} />
                    }
                </Consumer>
            )
        }
    }
}

export {connect}
