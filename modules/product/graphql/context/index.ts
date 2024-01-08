import { ITodoDocAccess } from '@monorepo-backend-db/api-access';

interface ITodoAuthenticated {
    access: ITodoDocAccess;
}

interface ITodoApolloContext {
    authenticated: () => Promise<ITodoAuthenticated>;
}

class TodoApolloContext implements ITodoApolloContext {
    private _authenticated?: ITodoAuthenticated;

    constructor(private readonly access: ITodoDocAccess) {}

    async authenticated(): Promise<ITodoAuthenticated> {
        if (this._authenticated) return this._authenticated;
        this._authenticated = {
            access: this.access
        };
        return this._authenticated;
    }
}

export { TodoApolloContext };
export type { ITodoApolloContext };
