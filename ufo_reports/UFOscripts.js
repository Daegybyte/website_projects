let selectedTypes = [];
let ufoTypes = []; //
var subset;


noneSelected = true;

window.onload = async function() {
    d3.json('./src/us_ufo_data.geo.json', function(sightings) {

        function reformat(array) {
            var data = [];
            let ufoSet = new Set();
            array.features.map(function(d, i) {
                //console.log(d.properties.description)


                ufoSet.add(d.properties.ufo_description);

                data.push({
                    id: d.properties.date.concat(d.properties.time).concat(),
                    notes: d.properties.description,
                    ufo: d.properties.ufo_description,
                    date: d.properties.date,
                    time: d.properties.time,
                    type: "Feature",
                    geometry: {
                        coordinates: [d.geometry.coordinates[0], d.geometry.coordinates[1]],
                        type: "Point"
                    }
                });
            });

            ufoTypes = Array.from(ufoSet);
            return data;
        }

        var geoData = { type: "FeatureCollection", features: reformat(sightings) };

        var qtree = d3.geom.quadtree(geoData.features.map(function(data, i) {

            return {
                x: data.geometry.coordinates[0],
                y: data.geometry.coordinates[1],
                all: data,
            };
        }));


        // Find the nodes within the specified rectangle.
        function search(quadtree, x0, y0, x3, y3) {
            var pts = [];
            var subPixel = false;
            var subPts = [];
            var scale = getZoomScale();
            console.log(" scale: " + scale);
            var counter = 0;
            quadtree.visit(function(node, x1, y1, x2, y2) {
                var p = node.point;
                var pwidth = node.width * scale;
                var pheight = node.height * scale;

                // -- if this is too small rectangle only count the branch and set opacity
                if ((pwidth * pheight) <= 1) {
                    // start collecting sub Pixel points
                    subPixel = true;
                }
                // -- jumped to super node large than 1 pixel
                else {
                    // end collecting sub Pixel points
                    if (subPixel && subPts && subPts.length > 0) {

                        subPts[0].group = subPts.length;
                        pts.push(subPts[0]); // add only one todo calculate intensity
                        counter += subPts.length - 1;
                        subPts = [];
                    }
                    subPixel = false;
                }

                if ((p) && (p.x >= x0) && (p.x < x3) && (p.y >= y0) && (p.y < y3)) {

                    if (subPixel) {
                        subPts.push(p.all);
                    } else {
                        if (p.all.group) {
                            delete(p.all.group);
                        }
                        pts.push(p.all);
                    }

                }
                // if quad rect is outside of the search rect do nto search in sub nodes (returns true)
                return x1 >= x3 || y1 >= y3 || x2 < x0 || y2 < y0;
            });
            console.log(" Number of removed  points: " + counter);
            return pts;

        }


        function updateNodes(quadtree) {
            var nodes = [];
            quadtree.depth = 0; // root

            quadtree.visit(function(node, x1, y1, x2, y2) {
                var nodeRect = {
                    left: MercatorXofLongitude(x1),
                    right: MercatorXofLongitude(x2),
                    bottom: MercatorYofLatitude(y1),
                    top: MercatorYofLatitude(y2),
                }
                node.width = (nodeRect.right - nodeRect.left);
                node.height = (nodeRect.top - nodeRect.bottom);

                if (node.depth == 0) {
                    //console.log(" width: " + node.width + "height: " + node.height);
                }
                nodes.push(node);
                for (var i = 0; i < 4; i++) {
                    if (node.nodes[i]) node.nodes[i].depth = node.depth + 1;
                }
            });
            return nodes;
        }

        //-------------------------------------------------------------------------------------
        MercatorXofLongitude = function(lon) {
            return lon * 20037508.34 / 180;
        }

        MercatorYofLatitude = function(lat) {
            return (Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180)) * 20037508.34 / 180;
        }

        var leafletMap = L.map('visHolder', {
            zoomSnap: 0.25,
            minZoom: 4.5,
            maxZoom: 8,
            zoomSnap: 0,
            zoomDelta: 0.25
        }).setView([37.8, -96.9], 4);



        var coolLayer = L.tileLayer("http://{s}.sm.mapstack.stamen.com/(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/{z}/{x}/{y}.png", {
                edgeBufferTiles: 5,
            }) //
        coolLayer.addTo(leafletMap);
        L.control.scale().addTo(leafletMap);

        var svg = d3.select(leafletMap.getPanes().overlayPane).append("svg");
        var g = svg.append("g").attr("class", "leaflet-zoom-hide");


        // Use Leaflet to implement a D3 geometric transformation.
        function projectPoint(x, y) {
            var point = leafletMap.latLngToLayerPoint(new L.LatLng(y, x));
            this.stream.point(point.x, point.y);
        }

        var transform = d3.geo.transform({ point: projectPoint });
        var path = d3.geo.path().projection(transform);


        updateNodes(qtree);

        leafletMap.on('moveend', mapmove);

        mapmove();



        function getZoomScale() {
            var mapWidth = leafletMap.getSize().x;
            var bounds = leafletMap.getBounds();
            var planarWidth = MercatorXofLongitude(bounds.getEast()) - MercatorXofLongitude(bounds.getWest());
            var zoomScale = mapWidth / planarWidth;
            return zoomScale;

        }


        function redrawSubset(subset) {


            d3.select("#sideBar").selectAll("p")
                .data(ufoTypes)
                .text(function(d) { return d; })
                .enter()
                .append("p")
                .text(function(d) { return d; })
                .on("click", handleClick);

            var scale = getZoomScale();

            path.pointRadius(5000 * (scale)); // * scale);

            var bounds = path.bounds({ type: "FeatureCollection", features: subset });
            var topLeft = bounds[0];
            var bottomRight = bounds[1];


            svg.attr("width", bottomRight[0] - topLeft[0])
                .attr("height", bottomRight[1] - topLeft[1])
                .style("left", topLeft[0] + "px")
                .style("top", topLeft[1] + "px")

            g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

            var start = new Date();

            var points = g.selectAll("path")
                .data(subset, function(d) {
                    return d.id;
                })
            points.exit().remove();
            points.enter().append("path");

            //update paths again and add some styling
            points.attr("d", path).style("fill", "#000")
                .style("fill-opacity", .2)
                .style("stroke", "#fff")
                .style("stroke-width", "1.0px")
                .style("z-index", "999")
                .attr("class", "leaflet-interactive") //have to do this to make the elements clickable

            points.on("mouseover", function(d) {
                d3.select(this).style("fill", "white").style("fill-opacity", .7)

                let inner = d3.select("#inner")

                inner.append("p").text("Description: " + d.notes)
                    .append("p").text(
                        "X: " + d.geometry.coordinates[1] + " , " +
                        "Y: " + d.geometry.coordinates[0])
                    .append("p").text(
                        "UFO Type: " + d.ufo)
                    .append("p").text(
                        "Date: " + d.date)
                    .append("p").text(
                        "Time: " + d.time);

            })

            points.on("mouseout", function(d) {
                d3.select(this).style("fill", "#000").style("fill-opacity", 1)
                let inner = d3.select("#inner");
                inner.selectAll("p").remove()

                //console.log(d.notes)
            });

            function handleClick(e, d) {


                let elem = d3.select(this); //wrap as a nice D3 object
                elem.classed('selected', !elem.classed('selected'));
                console.log("E  ", e)
                console.log("E", e)
                    //if statement for selected
                if (elem.classed('selected')) {
                    elem.style("color", "red")
                    selectedTypes.push(e);

                    if (selectedTypes.length === 0) {
                        noneSelected = true
                        console.log("FLAG SET TRUE")
                    } else {
                        noneSelected = false;
                        console.log("FLAG SET False")
                    }

                    var mapBounds = leafletMap.getBounds();
                    subset = search(qtree, mapBounds.getWest(), mapBounds.getSouth(), mapBounds.getEast(), mapBounds.getNorth());
                    subset = filterSubset(subset)
                    selectionDraw(subset)
                        //fix it 

                } else { //unselected

                    console.log("BEFORE REMOVAL, ", selectedTypes)
                    elem.style("color", "black")
                    selectedTypes = selectedTypes.filter(x => x != e);
                    console.log("UNSELECTED, ", selectedTypes)

                    if (selectedTypes.length === 0) {
                        noneSelected = true
                        console.log("FLAG SET TRUE")
                    } else {
                        noneSelected = false;
                        console.log("FLAG SET False")
                    }
                    var mapBounds = leafletMap.getBounds();
                    subset = search(qtree, mapBounds.getWest(), mapBounds.getSouth(), mapBounds.getEast(), mapBounds.getNorth());
                    subset = filterSubset(subset)
                    selectionDraw(subset)

                }


            }



            //console.log("updated at  " + new Date().setTime(new Date().getTime() - start.getTime()) + " ms ");

        } //redraw subset end

        function filterSubset(subset) {

            if (noneSelected == false) {
                subset = subset.filter(item => selectedTypes.includes(item.ufo))

            } else {

                subset = subset.filter(item => ufoTypes.includes(item.ufo))
                console.log("FILTERED SUBSET FROM UFO Types, ", subset)
                console.log(ufoTypes)
            }

            return subset
        }

        function selectionDraw(subset) {

            var points = g.selectAll("path")
                .data(subset, function(d) {
                    return d.id;
                })
            points.exit().remove();
            points.enter().append("path");

            //update paths again and add some styling
            points.attr("d", path).style("fill", "#000")
                .style("fill-opacity", .2)
                .style("stroke", "#fff")
                .style("stroke-width", "1.0px")
                .style("z-index", "999")
                .attr("class", "leaflet-interactive") //have to do this to make the elements clickable

        }



        function mapmove(e) {

            var mapBounds = leafletMap.getBounds();

            subset = search(qtree, mapBounds.getWest(), mapBounds.getSouth(), mapBounds.getEast(), mapBounds.getNorth());


            console.log("subset: " + subset.length);

            //filter subset
            subset = filterSubset(subset)

            redrawSubset(subset);
        }
    });
}