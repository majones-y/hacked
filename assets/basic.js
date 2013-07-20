//select title, description, link from rss where url="http://feeds.bbci.co.uk/news/rss.xml" limit 5
Y = YUI().use('yql', 'node', 'handlebars', function () {
    var TEMPLATE = "" +
    "<ul>" +
    "{{#video}}" +
    "<li>" +
    "<h3><a href=\"{{url}}\">{{title}}</a></h3>" +
    "<a href=\"{{url}}\">" +
    "<img src=\"{{thumbnails.thumbnail.[1].content}}\">" +
    "</a>" +
    "</li>" +
    "{{/video}}" +
    "</ul>";
    
    Y.one("#youtube-search").on("submit", function (e) {
        var input = this.one("input[name=search_query]");
        Y.YQL('select * from youtube.search where query="' + input.get("value") + '" limit 4', function (qres) {
            var template = Y.Handlebars.compile(TEMPLATE),
                html = template(qres.query.results);

            Y.one(".videos .container").set("innerHTML", html);
        });
        e.preventDefault();
    });
});