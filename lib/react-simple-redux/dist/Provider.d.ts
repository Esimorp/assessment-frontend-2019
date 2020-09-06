import { Component } from 'react';
import { Store } from "simple-redux";
interface ProviderProps {
    store: Store;
}
declare class ProviderComponent extends Component<ProviderProps> {
    render(): JSX.Element;
}
export { ProviderComponent };
//# sourceMappingURL=Provider.d.ts.map