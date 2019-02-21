export class SRSEvent<ParamType> {
    name: string = "";
    param?: ParamType;
    isSet: boolean = false;
    waiters: ((name: string, param?: ParamType) => void)[] = [];

    set(name: string, param?: ParamType) {
        if(this.isSet) {
            return;
        }

        this.isSet = true;
        this.name = name;
        this.param = param;

        for(let waiter of this.waiters) {
            waiter(this.name, this.param);
        }
        this.waiters = [];
    }

    reset() {
        this.isSet = false;
    }

    waitAsync(cb: (name: string, param?: ParamType) => void) {
        if(this.isSet) {
            cb(this.name, this.param);
        } else {
            this.waiters.push(cb);
        }
    }

    waitProm(): Promise<{name: string, param?: ParamType}> {
        return new Promise((resolve, reject) => {
            this.waitAsync((name, param?) => {
                resolve({name, param});
            });
        });
    }
}