var express = require('express');
var router = express.Router();
var https = require('https');
var videos = require('../public/json/videos.json');

/* GET home page. */
router.get('/', function (req, res, next) {
    var host = "api.myjson.com";
    var endpoint = "/bins/58ud8";

    var options = {
        host: host,
        path: endpoint,
        method: "GET",
        headers: null
    };

    var apiReq = https.request(options, function (apiRes) {
        apiRes.setEncoding('utf-8');

        var responseString = '';
        apiRes.on('data', function (data) {
            responseString += data;
        });

        apiRes.on('end', function () {
            var responseObject = JSON.parse(responseString);
            res.render('index', {
                "title": "Video Grid",
                "videos": responseObject.items
            });
        });
    });

    try {
        apiReq.on('error', function (error) {
            renderStatic(apiReq);
        });

        apiReq.on('timeout', function () {
            renderStatic(apiReq);
        });

        apiReq.end();
        //renderStatic(null);
    } catch (ex) {
        renderStatic(apiReq);
    }

    //In case the server is not available, render static view from saved JSON
    function renderStatic(apiReq) {
        res.render('index', {
            "title": "Video Grid",
            "videos": videos.items
        });
        if (apiReq != null) {
            apiReq.abort();
        }
    }
});

router.get('/:id', function(req,res) {
    var videoId = req.params.id;
    var thisVideo = null;
    videos.items.forEach(function(video) {
        if (video.id == videoId) {
            thisVideo = video;
        }
    });

    res.render('video', {
        "title" : "Video View",
        "video": thisVideo
    });
});

module.exports = router;
