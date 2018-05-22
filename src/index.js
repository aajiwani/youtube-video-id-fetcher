import axios from "axios";
import { parse } from "querystring";
import _ from "lodash";

/**
 * Tries to parse the youtube id from the provided URL
 * @param {string} youtubeUrl The real youtube URL
 */
function extractYoutubeVideoId(youtubeUrl) {
    var regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?\s]*).*/;
    var match = youtubeUrl.match(regExp);
    return (match && match[2]) ? match[2] : false;
}

/**
 * Fetches the video id of the give youtube URL
 * @param {string} youtubeUrl Supports any URL as far as it is redirected to youtube
 * Supports URLs like:
 * http://www.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index
 * http://www.youtube.com/user/IngridMichaelsonVEVO#p/a/u/1/QdK8U-VIH_o
 * http://www.youtube.com/v/0zM3nApSvMg?fs=1&amp;hl=en_US&amp;rel=0
 * http://www.youtube.com/watch?v=0zM3nApSvMg#t=0m10s
 * http://www.youtube.com/embed/0zM3nApSvMg?rel=0
 * http://www.youtube.com/watch?v=0zM3nApSvMg
 */
export function fetchYoutubeId(youtubeUrl) {
    return axios({
        method: "HEAD",
        url: youtubeUrl,
        cache: "no-cache"
    }).then(response => {
        if (response.status === 200) {
            let pureURL = response.request.res.req.agent.protocol + "//" + response.request.res.connection._host + response.request.path;
            return extractYoutubeVideoId(pureURL);
        }
        return false;
    })
}