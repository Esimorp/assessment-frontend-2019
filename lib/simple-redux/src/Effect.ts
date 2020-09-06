import {DispatchAction} from "./Store";

type Effect = (payload: unknown, actionWrapper: Record<string, Record<string, DispatchAction>>) => void;

export {Effect};
