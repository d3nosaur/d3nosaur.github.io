const entries = {
    "General": {
        "default":true,
        "entries": [
            {
                "id":"neuralnetwork",
                "title":"Neural Network Number Guesser", 
                "description":"AI Written in Java that guesses the number drawn on the screen. Uses the MNIST dataset for training. At best it was able to get ~50% accuracy.",
                "carousel":[
                    "images/portfolio/neuralnet/neuralnet.gif",
                ],
                "link":{
                    "title":"View on Github",
                    "link":"https://github.com/d3nosaur/neural-network-number-guesser"
                }
            },
            {
                "id":"sortingalg",
                "title":"Sorting Algorithm Visualizer", 
                "description":"A school project written in Javascript to visualize and compare sorting algorithms. After picking the Tick Rate, Number of Cells, and Sorting Algorithm you are able to see how long it takes to sort with the cells moving and comparing.",
                "carousel":[
                    "images/portfolio/sortalg/title.png",
                    "images/portfolio/sortalg/inprogress.png",
                    "images/portfolio/sortalg/done.png"
                ],
            },
        ]
    }, 
    "Minecraft": {
        "default":false,
        "entries": [
            {
                "id":"itembase",
                "title":"Custom Item Base", 
                "description":"Allows the creation of Custom Items. These items can have unique abilities and edits to their attributes. It was also integrated with our RPG system to allow giving strength and mana through items.",
                "carousel":[
                    "images/portfolio/mc-itembase.png"
                ],
            },
            {
                "id":"arenas",
                "title":"Arena System", 
                "description":"Arenas that are placed around the map to summon the bosses. Lots of config options for each arena including bosses that it can summon, loottables, commands to run on kill, etc.",
                "carousel":[
                    "images/portfolio/mc-itembase.png"
                ],
                "link":{
                    "title":"View on Github",
                    "link":"https://github.com/d3nosaur/Minecraft-Arena"
                }
            },
            {
                "id":"quests",
                "title":"Quests", 
                "description":"Questing base that allows quest trees with NPCs and uses MySQL to store the data.",
                "carousel":[
                    "images/portfolio/mc-quests.png"
                ],
                "link":{
                    "title":"View on Github",
                    "link":"https://github.com/d3nosaur/Minecraft-Quests"
                }
            },
        ]
    },
    "Garry's Mod": {
        "default":false,
        "entries": [
            {
                "id":"scp173",
                "title":"SCP-173",
                "description":"Adds SCP-173 into the game as a playable character. Features include: Blinking, Animated Poses, Two Models, and Custom Sounds. Made as a part of my SCP Entity Base.",
                "carousel":[
                    "images/portfolio/gmod-scp173.gif"
                ],
                "link":{
                    "title":"View on Steam Workshop",
                    "link":"https://steamcommunity.com/sharedfiles/filedetails/?id=2819496247"
                }
            },
            {
                "id":"bounties",
                "title":"Bounty System", 
                "description":"System that integrated with DarkRP to allow bounties to be placed. Lots of config options to choose which jobs could place/claim bounties (legal or illegal) to allow maximum configuration.",
                "carousel":[
                    "images/portfolio/gmod-bounty.png"
                ],
            },
            {
                "id":"ricochet",
                "title":"TFA Ricochet Shot", 
                "description":"A TFA Attachment that allows you to shoot a bullet that ricochets after it lands and bounces x times. After hitting an NPC it will jump to nearby NPCs with the same relations towards the player (Friendly/Hostile)",
                "carousel":[
                    "images/portfolio/gmod-ricochet.png"
                ],
            },
            {
                "id":"thermal",
                "title":"TFA Thermal Vision", 
                "description":"A TFA Attachment that changes your vision when scoping to highlight NPCs and Players similar to the Thermal Vision from GTA V.",
                "carousel":[
                    "images/portfolio/gmod-thermal.gif"
                ],
            },
            {
                "id":"rebornscoreboard",
                "title":"Reborn Gaming Scoreboard", 
                "description":"Custom scoreboard made for Reborn Gaming JvS. Includes DarkRP functionality such as coloring the user's entry in the color of their job.",
                "carousel":[
                    "images/portfolio/gmod-reborn-scoreboard.png"
                ],
            },
            {
                "id":"drodeka",
                "title":"Droideka Rig",
                "description":"A custom rig made for the Battlefront 2 Droideka. Has support for procedural walking and 360 degrees of movement",
                "carousel":[
                    "images/portfolio/droideka.gif"
                ]
            },
        ]
    }
};

var buttonContainer = document.createElement("div");
buttonContainer.setAttribute("class", "button_container");
document.body.appendChild(buttonContainer);

// Sets button state for button, including colors and entryContainer
function setButtonState(button, active) {
    button.active = active;

    if(active) {
        button.style.backgroundColor = "#e84b43";
        button.style.color = "#423d44";
        button.entryContainer.style.display = "block";
        
        // sets all other buttons off (needs to be done before starting animation, everything breaks if not)
        if(active) {
            for(var i in buttons) {
                if(buttons[i] == button) continue;
                setButtonState(buttons[i], false);
            }
        }

        const entryChildren = button.entryContainer.children;
        for(let i=0; i<entryChildren.length; i++) {
            const entryContent = entryChildren[i].children;
            for(let j=0; j<entryContent.length; j++) {
                var objLimit = $(entryContent[j]).position().top + ($(entryContent[j]).outerHeight()/4);
                var winLimit = $(window).scrollTop() + $(window).height();

                $(entryContent[j]).css('opacity', '0');

                if( winLimit > objLimit  ){    
                    if($(entryContent[j]).is(':animated')) return;
                    
                    $(entryContent[j]).animate({
                        'opacity':'1'
                    }, {duration: 500, queue: true}); 
                }
            }
        }

        var dark = (button.entryContainer.children.length/2) % 2 == 0;
        document.querySelector("footer").style.backgroundColor = dark ? "#423d44" : "#272122";
    } else {
        button.style.backgroundColor = "#423d44";
        button.style.color = "#e84b43";
        button.entryContainer.style.display = "none";
    }
}

// Returns current state of button (Active or Not Active), if the button for some reason didn't have active initialized, defaults to false
function getButtonState(button) {
    if(button.active == undefined)
        button.active = false;
    
    return button.active;
}

var buttons = [];

// Creates a button for the entry groups
function createEntryButton(id) {
    var button = document.createElement("a");
    button.setAttribute("class", "button lightgray");
    button.textContent = id;

    button.onclick = function() {
        var active = getButtonState(button)

        // I don't want to have the option for no buttons selected (Can comment this out without breaking rest of code if change mind)
        if(active) return false;

        // Flips the state
        active = !active;
        setButtonState(button, active);
    }

    // Button array for easy button management
    buttons.push(button);
    return button;
}

// Carousel creation quick function for the entries
function createEntryCarousel(id, entryTable) {
    var carousel = document.createElement("div");
    carousel.setAttribute('id', id);
    carousel.setAttribute('class', 'carousel slide fadescroll');
    carousel.setAttribute('data-ride', 'carousel');

    var indicators = document.createElement("ol");
    indicators.setAttribute('class', 'carousel-indicators');
    carousel.appendChild(indicators);

    var inner = document.createElement("div")
    inner.setAttribute('class', 'carousel-inner');
    carousel.appendChild(inner);

    for(var carouselImage in entryTable["carousel"]) {  
        var item = document.createElement("div");

        if(carouselImage==0)
            item.setAttribute("class", "item active");
        else
            item.setAttribute("class", "item");

        var image = document.createElement("img");
        image.setAttribute("src", entryTable["carousel"][carouselImage]);

        inner.appendChild(item);
        item.appendChild(image);
    }

    // Adds the left and right arrows if there's more than one image in the entry carousel
    if(entryTable["carousel"].length > 1) {
        var leftControl = document.createElement("a");
        leftControl.setAttribute("class", "left carousel-control");
        leftControl.setAttribute("href", "#" + id);
        leftControl.setAttribute("data-slide", "prev");
        carousel.appendChild(leftControl);

        var leftIcon = document.createElement("span");
        leftIcon.setAttribute("class", "glyphicon glyphicon-chevron-left")
        leftControl.appendChild(leftIcon);

        var leftText = document.createElement("span");
        leftText.setAttribute("class", "sr-only");
        leftText.textContent = "Previous";
        leftControl.appendChild(leftText);

        var rightControl = document.createElement("a");
        rightControl.setAttribute("class", "right carousel-control");
        rightControl.setAttribute("href", "#" + id);
        rightControl.setAttribute("data-slide", "next");
        carousel.appendChild(rightControl);

        var rightIcon = document.createElement("span");
        rightIcon.setAttribute("class", "glyphicon glyphicon-chevron-right")
        rightControl.appendChild(rightIcon);

        var rightText = document.createElement("span");
        rightText.setAttribute("class", "sr-only");
        rightText.textContent = "Next";
        rightControl.appendChild(rightText);
    }

    return carousel;
}

// Description create quick function for the entries
function createEntryDescription(id, entryTable) {
    var description = document.createElement("div");
    description.setAttribute("class", "portfolio-description fadescroll");

    var descriptionHeader = document.createElement("h1");
    descriptionHeader.textContent = entryTable["title"];
    description.appendChild(descriptionHeader);

    var descriptionDescription = document.createElement("h2");
    descriptionDescription.textContent = entryTable["description"];
    description.appendChild(descriptionDescription);

    if(entryTable["link"]) {
        var link = document.createElement("a");
        link.setAttribute("href", entryTable["link"]["link"]);
        link.setAttribute("class", "github_button " + (dark ? 'darkgray' : 'lightgray'));
        link.setAttribute("target", "_blank");
        link.textContent = entryTable["link"]["title"];
        description.appendChild(link);
    }

    return description;
}

// Actually create the entries, first loop is for each entry category
for(var globalId in entries) {
    var dark = false;
    var first = true;

    var button = createEntryButton(globalId);
    buttonContainer.appendChild(button);

    var entryContainer = document.createElement("div");
    //entryContainer.style.opacity = 0;
    button.entryContainer = entryContainer;
    entryContainer.style.display = "none";
    document.body.appendChild(entryContainer);

    // Second loop is for each entry in the category
    for(var entryKey in entries[globalId]["entries"]) {
        var entryTable = entries[globalId]["entries"][entryKey];
        var id = entryTable["id"] + "Carousel";

        if(!first) {
            var spacer = document.createElement("div");
            if(dark) {
                spacer.setAttribute("class", "spacer lightdark");
            } else {
                spacer.setAttribute("class", "spacer darklight");
            }
            entryContainer.appendChild(spacer);
        }

        var container = document.createElement("div");
        container.setAttribute('class', 'portfolio-container ' + (dark ? 'darkgray' : 'lightgray'));
        entryContainer.appendChild(container);

        var carousel = createEntryCarousel(id, entryTable);
        var description = createEntryDescription(id, entryTable);

        // This makes it swap between carousel on left and right
        if(dark) {
            container.appendChild(description);
            container.appendChild(carousel);
        } else {
            container.appendChild(carousel);
            container.appendChild(description);
        }

        first = false;
        dark = !dark;
    }

    var spacer = document.createElement("div");
    spacer.setAttribute("class", "spacer " + (dark ? 'lightdark' : 'darklight'));
    entryContainer.appendChild(spacer);
    
    // If the entry is set to default, makes the button active by default
    if(entries[globalId]["default"]) {
        setButtonState(button, true);
    } else {
        setButtonState(button, false);
    }
}