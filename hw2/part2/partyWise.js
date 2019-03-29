(function (global, document) {
    // use global for window
    global.onload = init();

    function init() {
        loadXml();
        // if (!global.localStorage.getItem('senators')) {
        //     console.log('Loading from XML...');
        //     loadXml();
        // }
        // console.log('Loading from storage...');
        // let senators = JSON.parse(global.localStorage.getItem('senators'));1
        // console.log(senators);
    }

    function loadXml() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                setLocalStorage(this);
            }
        };
        xhttp.open("GET", "partyList.xml", true);
        xhttp.send();
    }

    function setLocalStorage(xml) {
        var xmlDoc = xml.responseXML;

        let jsonSenators = JSON.stringify(xml2json(xmlDoc));
        window.localStorage.setItem('senators', jsonSenators);
    }
    /**
     * https://stackoverflow.com/questions/1773550/convert-xml-to-json-and-back-using-javascript
     * @param {*} xml
     */
    function xml2json(xml) {
        try {
            var obj = {};

            if (xml.children.length > 0) {
                for (var i = 0; i < xml.children.length; i++) {

                    var item = xml.children.item(i);
                    var nodeName = item.nodeName;

                    if (typeof (obj[nodeName]) == "undefined") {
                        obj[nodeName] = xml2json(item);
                    } else {
                        if (typeof (obj[nodeName].push) == "undefined") {
                            var old = obj[nodeName];

                            obj[nodeName] = [];
                            obj[nodeName].push(old);
                        }
                        obj[nodeName].push(xml2json(item));

                    }
                }
            } else {
                obj = xml.textContent;
            }
            obj['voted'] = false;
            return obj;
        } catch (e) {
            console.log(e.message);
        }
    }


}(window, document));