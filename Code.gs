function doGet() {
  const FEED_URL = "https://medium.com/feed/harvard-open-data-project"
  const xml = UrlFetchApp.fetch(FEED_URL).getContentText();
  var doc = XmlService.parse(xml);
  var root = doc.getRootElement();
  var channel = root.getChild("channel");
  var items = channel.getChildren("item");
  var articles = [];
  for(var i = 0; i < items.length; i++){
    var item = items[i];
    var children = item.getChildren();
    var article = {};
    var content = children[children.length - 1].getText();
    var img = content.match(/https:\/\/cdn-images-1\.medium\.com\/max\/.+?"/)[0].replace('"', '');
    article.title = item.getChild("title").getText();
    article.link = item.getChild("link").getText();
    article.img = img; 
    articles.push(article);
  }
  return ContentService.createTextOutput(JSON.stringify(articles)).setMimeType(ContentService.MimeType.JAVASCRIPT);
}
