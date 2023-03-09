const Clarifai = require('clarifai');

const app = new Clarifai.App({
	apiKey: '896f21e898d344baa14bfbcab7ecb2cc'
});

const handleApiCall = (req, res) => {
	app.models
    .predict(
      {
        id: 'face-detection',
        name: 'face-detection',
        version: '6dc7e46bc9124c5c8824be4822abe105',
        type: 'visual-detector',
      }, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}


module.exports = {
	handleApiCall
}