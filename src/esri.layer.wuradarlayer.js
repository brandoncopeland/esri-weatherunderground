(function (window, dojo, esri) {
    "use strict";
    dojo.declare("esri.layers.WURadarLayer", esri.layers.DynamicMapServiceLayer, {
        var key;
        constructor: function (apiKey) {
            key = apiKey;
            this.spatialReference = new esri.SpatialReference({
                wkid: 4326
            });
            this.loaded = true;
            this.onLoad(this);
        },

        updateTimeout: undefined,

        getImageUrl: function (extent, width, height, callback) {
            window.clearTimeout(this.updateTimeout);
            this.updateTimeout = window.setTimeout(function () {
                var minPoint = esri.geometry.webMercatorToGeographic(new esri.geometry.Point(extent.xmin, extent.ymin, new esri.SpatialReference({
                    wkid: 102100
                })));
                var maxPoint = esri.geometry.webMercatorToGeographic(new esri.geometry.Point(extent.xmax, extent.ymax, new esri.SpatialReference({
                    wkid: 102100
                })));
                var params = {
                    minlat: Math.round(minPoint.y * 10000) / 10000, // may be issues with url length, round to correct
                    maxlat: Math.round(maxPoint.y * 10000) / 10000,
                    minlon: Math.round(minPoint.x * 10000) / 10000,
                    maxlon: Math.round(maxPoint.x * 10000) / 10000,
                    width: width,
                    height: height,
                    rainsow: 1,
                    smooth: 1,
                    timelabel: 1,
                    'timelabel.x': 120,
                    'timelabel.y': height - 15, // bottom of map in line with bing logo
                    num: 15,
                    delay: 20
                };
                callback('http://api.wunderground.com/api/' + key + '/animatedradar/image.gif?' + dojo.objectToQuery(params));
            }, 3000);
        }
    });
}(window, dojo, esri));