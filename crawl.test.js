const { normalizeURL, getURLsFromHTML } = require("./crawl.js")
const { test, expect } = require("@jest/globals")


test("normalizeURL strip protocol", () => {
    const input = "https://blog.boot.dev/path/"
    const actual = normalizeURL(input)
    const expected = "blog.boot.dev/path"
    expect(actual).toEqual(expected)
})
test("normalizeURL capitals", () => {
    const input = "httpS://BLOG.boot.dev/path"
    const actual = normalizeURL(input)
    const expected = "blog.boot.dev/path"
    expect(actual).toEqual(expected)
})
test("normalizeURL strip http", () => {
    const input = "http://blog.boot.dev/path/"
    const actual = normalizeURL(input)
    const expected = "blog.boot.dev/path"
    expect(actual).toEqual(expected)
})
test("getURLsFromHTML absolute", () => {
    const inputHTMLbody = `
    <html>
        <body>
            <a href = "https://blog.boot.dev/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    
    `
    const inputBaseURL = "https://blog.boot.dev/path/"
    const actual = getURLsFromHTML(inputHTMLbody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})
test("getURLsFromHTML relative", () => {
    const inputHTMLbody = `
    <html>
        <body>
            <a href = "/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLbody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})
test("getURLsFromHTML both", () => {
    const inputHTMLbody = `
    <html>
        <body>
            <a href = "https://blog.boot.dev/path1/">
                Boot.dev Blog One
            </a>
            <a href = "/path2/">
                Boot.dev Blog Path Two
            </a>
        </body>
    </html>
    
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLbody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
})