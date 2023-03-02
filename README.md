# Global Session

Hi! This mini library was created with the purpose of extracting and inserting any sessions stored in the browser's localStorage. So you can log in once and keep that session alive.

## Installation steps
- ### Dependencies
	- Puppeteer -> We use the page object from which we want to extract the session.
	- [Node-persist](https://github.com/simonlast/node-persist) -> Stores data locally, using JSON.

- ### How to install
	1. Clone this repo in your machine `git clone https://github.com/ChrisPrzR/global-session.git`
	2. Run `npm install path/to/global-session`
	3. That's it :)

## Usage
`await extractSession(puppeteerPage)` Extracts the localStorage object from the current page

`await storeSession(stateKey, sessionData, config = { ttl:1000*60*5 })` Will store the browser localStorage locally.

`await getSession(stateKey, config = { ttl:1000*60*5 })` Will redeem stored data.

`await insertSession(puppeteerPage, sessionData)` Will replace any data in the browser's localStorage with your own data.

`await updateSession(stateKey, sessionData, config = { ttl:1000*60*5 })` Updates any data existing locally and updates it's expiration time.


	
## Future for the project
We'd like to implement some type of cloud microservice so the data can be retrieved by multiple users as well as supporting Cookie-stored sessions. Thanks for trying it out!
