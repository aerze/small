import App from './app'

const app = new App()
const port = 8080
app.start(port, () => {
	console.log(`listening on port ${port}`)
})



