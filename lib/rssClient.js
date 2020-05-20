import Parser from 'rss-parser'
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'

export default class RssClient {
  constructor() {
    this.rssUrl = CORS_PROXY + 'http://rssblog.ameba.jp/makimabo592/rss20.xml'
  }
  async readRssAsync() {
    const parser = new Parser()
    const feed = await parser.parseURL(this.rssUrl)
    console.log(feed.items)
    return feed.items
  }
}
