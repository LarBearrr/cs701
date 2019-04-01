(function (window, document) {

    let senators = [];
    var msg, sourceId, democrats, republicans;
    window.onload = init();

    function init() {

        democrats = document.getElementById('democrats');
        republicans = document.getElementById('republicans');

        democrats.ondragenter = dragEnterHandler;
        democrats.ondragover = dragOverHandler;
        democrats.ondrop = dropHandler;

        republicans.ondragenter = dragEnterHandler;
        republicans.ondragover = dragOverHandler;
        republicans.ondrop = dropHandler;

        msg = document.getElementById("msg");
        if(!window.localStorage.getItem('senators')) {
            loadXml();
            msg.innerHTML = "Loaded from AJAX " + senators.length + " senators"
        } else {
            senators = JSON.parse(window.localStorage.getItem('senators'));
            msg.innerHTML = "Loaded from storage " + senators.length + " senators"
        }

        var ul = document.getElementById("members");

        for (var i = 0; i < senators.length; i++) {
            var li = document.createElement("li");

            li.setAttribute('id', senators[i].id)

            if (senators[i].voted == true) {
                li.classList.add('voted');
                addToPartyList(senators[i])
            } else {
                li.setAttribute('draggable', true);
            }

            li.ondragstart = dragStartHandler;
            li.ondragend   = dragEndHandler;
            li.ondrag      = dragHandler;
            li.appendChild(document.createTextNode(senators[i].name));
            ul.appendChild(li);
        }
    }

    function loadXml() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                setLocalStorage(this);
            }
        };
        xhttp.open("GET", "partyList.xml", false);
        xhttp.send();
    }

    function setLocalStorage(xml) {
        var senatorsArray = [];
        var xmlDoc = xml.responseXML;
        var x = xmlDoc.getElementsByTagName("senator");
        for (var i = 0; i < x.length; i++) {
            let name = x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
            let party = x[i].getElementsByTagName("party")[0].childNodes[0].nodeValue;
            let senator = {
                "id": i + 1,
                "name": name,
                "party": party,
                "voted": false,
            }
            senatorsArray.push(senator);
        }

        window.localStorage.setItem('senators', JSON.stringify(senatorsArray));

        senators = senatorsArray;
    }

    function dragStartHandler(e) {
        e.dataTransfer.setData("Text", e.target.id);
        sourceId = e.target.id;
        e.target.classList.add("dragged");
        console.log('Drag started for ' + e.target.innerHTML)
    }

    function dragEndHandler(e) {
        msg.innerHTML = "Drag ended";
        var elems = document.querySelectorAll(".dragged");
        for(var i = 0; i < elems.length; i++) {
            elems[i].classList.remove("dragged");
        }
    }

    function dragHandler(e) {
        msg.innerHTML = "Dragging " + e.target.innerHTML;
    }

    function dragEnterHandler(e) {
        console.log("Drag Entering " + e.target.id +
                " source is " + e.dataTransfer.getData("Text") );

        var id = e.dataTransfer.getData("Text") || sourceId;

        e.preventDefault();

    }

    function dragOverHandler(e) {
        console.log("Drag Over " + e.target.id +
                 " source is " + e.dataTransfer.getData("Text")) ;

        var id = e.dataTransfer.getData("Text") || sourceId;

        e.preventDefault();

    }

    function dropHandler(e) {
        console.log("Drop on " + e.target.id +
                 " source is " + e.dataTransfer.getData("Text")) ;
                 e.preventDefault();

        var id = e.dataTransfer.getData("Text") || sourceId;

        attemptVote(id, e.target);

        e.preventDefault();
    }

    function attemptVote(id, party) {
        console.log('Senator ' + id + ' trying to vote for ' + party.id);

        let eligibleSenator = senators.filter((senator) => {
            if (senator.id == id) {

                let inParty = party.id.indexOf(senator.party.toLowerCase()) != -1 ?
                    true : false;

                if (inParty) {
                    senator.voted = true;
                    return inParty;
                }
            }

        });

        if (eligibleSenator.length > 0) {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(eligibleSenator[0].name));
            party.appendChild(li);

            var oldListItem = document.getElementById(eligibleSenator[0].id);
            oldListItem.removeAttribute('draggable');
            oldListItem.classList.add('voted');

            updateLocalStorage();
        }
    }

    function updateLocalStorage() {
        window.localStorage.setItem('senators', JSON.stringify(senators));
    }

    function addToPartyList(senator) {
        let party = senator.party.toLowerCase() + 's';
        var li = document.createElement("li");
            li.appendChild(document.createTextNode(senator.name));
            document.getElementById(party).appendChild(li);
    }

})(window, document);