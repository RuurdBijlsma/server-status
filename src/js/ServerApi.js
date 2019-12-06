class ServerApi {
    async getUptime() {
        return await this.json('https://status.ruurd.dev:3000', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    setEndpoint(endPoint) {
        this.endPoint = endPoint;
        this.user = null;
        this.password = null;
        this.status = {state: null};
        this.fetchInterval = -1;
    }

    async startFetching() {
        this.stopFetching();
        this.fetchInterval = setInterval(async () => {
            this.status.state = await this.getStatus();
        }, 3000);
        this.status.state = await this.getStatus();
    }

    stopFetching() {
        clearInterval(this.fetchInterval);
    }

    async getStatus() {
        if (this.user === null || this.password === null)
            return false;

        return await this.json(this.endPoint + '/status', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user: this.user, password: this.password})
        });
    }

    async json(endPoint, options) {
        let response = await fetch(endPoint, options);
        let text = await response.text();
        try {
            return JSON.parse(text);
        } catch (e) {
            console.warn("Could not parse server response", text);
            return false;
        }
    }

    async auth(user, password) {
        let result = await this.json(this.endPoint + '/auth', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user, password})
        });
        if (result === true) {
            this.user = user;
            this.password = password;
            this.startFetching();
        }
        return result;
    }
}

export default new ServerApi();