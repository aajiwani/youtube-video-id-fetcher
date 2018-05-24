"use strict";

import axios_orig from "axios";
import { fetchYoutubeId } from "../src/index";
import { expect } from "chai";
import sinon from "sinon";

function getAxiosResponse(protocol, host, path, statusCode = 200) {
    return {
        request: {
            res: {
                req: {
                    agent: {
                        protocol: protocol
                    }
                },
                connection: {
                    _host: host
                }
            },
            path: path
        },
        status: statusCode
    };
}

describe("Parsing valid youtube URLs", () => {
    it("Test: http://www.youtube.com/user/IngridMichaelsonVEVO#p/a/u/1/KdwsulMb8EQ", () => {
        let url = "http://www.youtube.com/user/IngridMichaelsonVEVO#p/a/u/1/KdwsulMb8EQ";
        return fetchYoutubeId(url).then(youtubeId => {
            expect(youtubeId).to.equal('KdwsulMb8EQ');
        });
    });

    it("Test: http://www.youtube.com/embed/0zM3nApSvMg?rel=0", () => {
        let url = "http://www.youtube.com/embed/0zM3nApSvMg?rel=0";
        return fetchYoutubeId(url).then(youtubeId => {
            expect(youtubeId).to.equal('0zM3nApSvMg');
        });
    });

    it("Test: http://www.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index", () => {
        let url = "http://www.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index";
        return fetchYoutubeId(url).then(youtubeId => {
            expect(youtubeId).to.equal('0zM3nApSvMg');
        });
    });

    it("Test: http://www.youtube.com/watch?v=0zM3nApSvMg", () => {
        let url = "http://www.youtube.com/watch?v=0zM3nApSvMg";
        return fetchYoutubeId(url).then(youtubeId => {
            expect(youtubeId).to.equal('0zM3nApSvMg');
        });
    });

    it("Test: http://www.youtube.com/watch?v=0zM3nApSvMg#t=0m10s", () => {
        let url = "http://www.youtube.com/watch?v=0zM3nApSvMg#t=0m10s";
        return fetchYoutubeId(url).then(youtubeId => {
            expect(youtubeId).to.equal('0zM3nApSvMg');
        });
    });

    it("Test: http://www.youtube.com/embed/dQw4w9WgXcQ", () => {
        let url = "http://www.youtube.com/embed/dQw4w9WgXcQ";
        return fetchYoutubeId(url).then(youtubeId => {
            expect(youtubeId).to.equal('dQw4w9WgXcQ');
        });
    });

    it("Test: http://www.youtube.com/v/dQw4w9WgXcQ", () => {
        let url = "http://www.youtube.com/v/dQw4w9WgXcQ";
        return fetchYoutubeId(url).then(youtubeId => {
            expect(youtubeId).to.equal('dQw4w9WgXcQ');
        });
    });

    it("Test: http://www.youtube.com/e/dQw4w9WgXcQ", () => {
        let url = "http://www.youtube.com/e/dQw4w9WgXcQ";
        return fetchYoutubeId(url).then(youtubeId => {
            expect(youtubeId).to.equal('dQw4w9WgXcQ');
        });
    });

    it("Test: http://www.youtube.com/?v=dQw4w9WgXcQ", () => {
        let url = "http://www.youtube.com/?v=dQw4w9WgXcQ";
        return fetchYoutubeId(url).then(youtubeId => {
            expect(youtubeId).to.equal('dQw4w9WgXcQ');
        });
    });

    it("Test: http://www.youtube.com/watch?feature=player_embedded&v=dQw4w9WgXcQ", () => {
        let url = "http://www.youtube.com/watch?feature=player_embedded&v=dQw4w9WgXcQ";
        return fetchYoutubeId(url).then(youtubeId => {
            expect(youtubeId).to.equal('dQw4w9WgXcQ');
        });
    });

    it("Test: http://www.youtube.com/?feature=player_embedded&v=dQw4w9WgXcQ", () => {
        let url = "http://www.youtube.com/?feature=player_embedded&v=dQw4w9WgXcQ";
        return fetchYoutubeId(url).then(youtubeId => {
            expect(youtubeId).to.equal('dQw4w9WgXcQ');
        });
    });

    it("Test: http://www.youtube.com/user/IngridMichaelsonVEVO#p/u/11/KdwsulMb8EQ", () => {
        let url = "http://www.youtube.com/user/IngridMichaelsonVEVO#p/u/11/KdwsulMb8EQ";
        return fetchYoutubeId(url).then(youtubeId => {
            expect(youtubeId).to.equal('KdwsulMb8EQ');
        });
    });

    describe("Tries to make call to the web, because of non-youtube kind of URL", () => {
        let axios = null;

        beforeEach(() => {
            axios = sinon.stub(axios_orig, "head");
        });

        afterEach(() => {
            axios.restore();
        });

        it("Test: http://www.youtube-nocookie.com/v/6L3ZvIMwZFM?version=3&hl=en_US&rel=0", () => {
            const resolveUrlOne = new Promise((r) => r(getAxiosResponse(
                'http',
                'www.youtube.com',
                '/user/IngridMichaelsonVEVO#p/a/u/1/KdwsulMb8EQ'
            )));

            axios.callsFake(() => {
                return resolveUrlOne;
            });

            let url = "http://www.youtube-nocookie.com/v/6L3ZvIMwZFM?version=3&hl=en_US&rel=0";
            return fetchYoutubeId(url).then(youtubeId => {
                expect(youtubeId).to.equal('KdwsulMb8EQ');
            });
        });

        it("Test: http://youtu.be/0zM3nApSvMg", () => {
            const resolveUrlOne = new Promise((r) => r(getAxiosResponse(
                'http',
                'www.youtube.com',
                '/watch?v=0zM3nApSvMg'
            )));

            axios.callsFake(() => {
                return resolveUrlOne;
            });

            let url = "http://youtu.be/0zM3nApSvMg";
            return fetchYoutubeId(url).then(youtubeId => {
                expect(youtubeId).to.equal('0zM3nApSvMg');
            });
        });
    });
});