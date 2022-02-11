// ==UserScript==
// @name         Yui's slave script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Yui
// @match https://bondageprojects.elementfx.com/*
// @match https://www.bondageprojects.elementfx.com/*
// @match https://bondage-europe.com/*
// @match https://www.bondage-europe.com/*
// @grant        none
// @run-at document-end
// ==/UserScript==
/* eslint-disable no-undef */
/* eslint-disable no-implicit-globals */

async function waitFor(func, cancelFunc = () => false) {
    while (!func()) {
        if (cancelFunc()) {
            return false;
        }
        // eslint-disable-next-line no-await-in-loop
        await sleep(10);
    }
    return true;
}
function sleep(ms) {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve) => setTimeout(resolve, ms));
}
async function start() {
    await waitFor(() => ServerSocket && ServerIsConnected);
    ServerSocket.on('ChatRoomMessage', main);
    loadPersonList()
}

await start()

class personDataDef {
    shockGag = false
    shockGagOwnerBlock = false
    shockBells = false
    shockBellsOwnerBlock = false
    level = 0
    process = 0
}

let personData = new personDataDef();

function main(data){
    if ((data != null) &&
        (typeof data === "object") &&
        (data.Content != null) &&
        (typeof data.Content === "string") &&
        (data.Content != "") &&
        (data.Sender != null) &&
        (typeof data.Sender === "number")) {
        if (data.Type === "Hidden") {
            return
        }
        var msg = data.Content;
        msg = msg.toLowerCase()
        console.log(data)
        loadPersonList()
        while (msg.indexOf("<") > -1) msg = msg.replace("<", "&lt;");
        while (msg.indexOf(">") > -1) msg = msg.replace(">", "&gt;");
        let shockrate = 60 - personData.level
        if (data.Sender === Player.MemberNumber&& data.Type == "Chat") {
            if(msg.includes("+" + Player.Name.toLowerCase())) {
                if (msg.includes("shockgag on")&&!personData.shockGagOwnerBlock) {
                    whisper("The shock on "+Player.Name.toLowerCase()+" is activated",data.Sender)
                    personData.shockGag = true;
                } else if (msg.includes("shockgag off")&&!personData.shockGagOwnerBlock) {
                    whisper("The shock on "+Player.Name.toLowerCase()+" is deactivated",data.Sender)
                    personData.shockGag = false;
                }else if (msg.includes("shockbells on")&&!personData.shockBellsOwnerBlock) {
                    whisper("The shock on "+Player.Name.toLowerCase()+" is activated",data.Sender)
                    personData.shockBells = true;
                } else if (msg.includes("shockbells off")&&!personData.shockBellsOwnerBlock) {
                    whisper("The shock on "+Player.Name.toLowerCase()+" is deactivated",data.Sender)
                    personData.shockBells = false;
                }
            }
            storePersonList()
        }else if (Player.Ownership!=null&&Player.Ownership.MemberNumber === data.Sender &&
            msg.includes("+" + Player.Name.toLowerCase()) && data.Type == "Whisper") {
            if (msg.includes("shockgag on")) {
                whisper("The shockGag on "+Player.Name+" is activated",data.Sender)
                personData.shockGag = true;
            } else if (msg.includes("shockgag off")) {
                whisper("The shockGag on "+Player.Name.toLowerCase()+" is deactivated",data.Sender)
                personData.shockGag = false;
            }
            if (msg.includes("shockgag locked")) {
                whisper("The shockGag on "+Player.Name.toLowerCase()+" is locked",data.Sender)
                personData.shockGagOwnerBlock = true;
            } else if (msg.includes("shockgag unlocked")) {
                whisper("The shockGag on "+Player.Name.toLowerCase()+" is unlocked",data.Sender)
                personData.shockGagOwnerBlock = false;
            }
            if (msg.includes("shockbells on")) {
                whisper("The shock bells on "+Player.Name+" is activated",data.Sender)
                personData.shockBells = true;
            } else if (msg.includes("shockbells off")) {
                whisper("The shock bells on "+Player.Name.toLowerCase()+" is deactivated",data.Sender)
                personData.shockBells = false;
            }
            if (msg.includes("shockbells locked")) {
                whisper("The shock bells on "+Player.Name.toLowerCase()+" is locked",data.Sender)
                personData.shockBellsOwnerBlock = true;
            } else if (msg.includes("shockbells unlocked")) {
                whisper("The shock bells on "+Player.Name.toLowerCase()+" is unlocked",data.Sender)
                personData.shockBellsOwnerBlock = false;
            }
            storePersonList()

        }else if(data.Sender === Player.MemberNumber && data.Type == "Activity" && personData.shockBells){
            if((InventoryIsWorn(Player,"BellClitPiercing","ItemVulvaPiercings")||
                InventoryIsWorn(Player,"HeavyWeightClamp","ItemVulva")) &&(
                data.Content.includes("ChatSelf-ItemButt-Wiggle")||
                data.Content.includes("ChatSelf-ItemPelvis-Wiggle")||
                data.Content.includes("ChatSelf-ItemLegs-Wiggle") ||
                data.Content.includes("ChatSelf-ItemTorso-Wiggle") ||

                data.Content.includes("ItemVulva-Slap") ||
                Math.floor(Math.random() * 1000)<shockrate)){
                personData.process +=1
                shock(Player,1,0)
                ServerSend("ChatRoomChat",
                    {Content: "Beep", Type: "Action", Dictionary:
                            [{Tag: "Beep", Text: Player.Name+ " moves to much so that her shock bells" +
                                    " touches her skin she gets a shock on her vulva for that. " }]
                    });

            }
            if((InventoryIsWorn(Player,"BellPiercing","ItemNipplesPiercings")||
                InventoryIsWorn(Player,"BellClamps","ItemNipples")||
                InventoryIsWorn(Player,"NippleWeightClamps","ItemNipples") ) &&
                  (data.Content.includes("ChatSelf-ItemBreast-Wiggle") ||
                   data.Content.includes("ChatSelf-ItemArms-Wiggle")||
                   data.Content.includes("ChatSelf-ItemTorso-Wiggle") ||
                   data.Content.includes("ItemBreast-Slap") ||
                   Math.floor(Math.random() * 1000)<shockrate)){
                personData.process +=1
                shock(Player,1,2)
                ServerSend("ChatRoomChat",
                    {Content: "Beep", Type: "Action", Dictionary:
                            [{Tag: "Beep", Text: Player.Name+ " moves to much so that her shock bells" +
                                    " touches her skin she gets a shock on her nipples for that. "  }]
                    });
            }

        }else if(data.Sender === Player.MemberNumber&& data.Type == "Action"){
            if (data.Content.includes("FuturisticPanelGagMouthSetAutoInflate") && personData.shockGag) {
                shockGag(data)
            }
        }
        if(personData.process>=100 && personData.level <=50){

            personData.process =0;
            personData.level +=1
            ServerSend("ChatRoomChat",
                {Content: "Beep", Type: "Action", Dictionary:
                        [{Tag: "Beep", Text: Player.Name+ " has reached level "+personData.level+"" +
                                "in her Yui script."}]
                });
        }
        storePersonList()
    }
}


function shockGag(data){
    if(data.Content.includes("FuturisticPanelGagMouthSetAutoInflate")) {
        if(data.Content.includes("LightBall")){
            ServerSend("ChatRoomChat",
                {Content: "Beep", Type: "Action", Dictionary:
                        [{Tag: "Beep", Text: Player.Name+ " has triggered  her gag she will be punished for that." }]
                });
            shock(Player, 0, 0);
            shock(Player, 0, 1);
        }else if(data.Content.includes("Ball")){
            ServerSend("ChatRoomChat",
                {Content: "Beep", Type: "Action", Dictionary:
                        [{Tag: "Beep", Text: Player.Name+ " has triggered  her gag she will be punished for that." }]
                });
            shock(Player, 1, 0);
            shock(Player, 1, 1);
        }else if(data.Content.includes("Plug")){
            ServerSend("ChatRoomChat",
                {Content: "Beep", Type: "Action", Dictionary:
                        [{Tag: "Beep", Text: Player.Name+ " has triggered  her gag she will be punished for that." }]
                });
            shock(Player, 2, 0);
            shock(Player, 2, 1);
        }
    }
}

// place 0 = vulva , 1 = butt, 2 = nipples
function shock(player,intensity=0, place=0){
    let item = ""
    if(place===0){
        item="Vulva"
    }else if(place===1){
        item="Butt"
    }else if(place===2){
        item="Nipples"
    }
    var Dictionary = [];
    Dictionary.push({ Tag: "DestinationCharacterName", Text: player.Name, MemberNumber: player.MemberNumber });
    Dictionary.push({ Tag: "DestinationCharacter", Text: player.Name, MemberNumber: player.MemberNumber });
    Dictionary.push({ Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber });
    if(place===0){
        Dictionary.push({Tag: "AssetName", AssetName: "ShockDildo"});
    }else if(place===1){
        Dictionary.push({Tag: "AssetName", AssetName: "ShockPlug"});
    }else if(place===2){
        Dictionary.push({Tag: "AssetName", AssetName: "ShockClamps"});
    }
    Dictionary.push({ Tag: "ActivityName", Text: "ShockItem" });
    Dictionary.push({ Tag: "ActivityGroup", Text: "Item"+item});
    Dictionary.push({ AssetName: "ShockItem" });
    Dictionary.push({ AssetGroupName: "Item"+item});

    ChatRoomPublishCustomAction("TriggerShock" + intensity, true, Dictionary);
}


function whisper(msg, playerNR){
    ServerSend("ChatRoomChat",
        {
            Content: msg,
            Type: "Whisper",
            Target: playerNR
        });
}

function loadPersonList(){
    if(JSON.parse(localStorage.getItem(Player.MemberNumber+"_personList")) !==null){
        personData = JSON.parse(localStorage.getItem(Player.MemberNumber+"_personList"));
    }
}

function storePersonList(){
    localStorage.setItem(Player.MemberNumber+"_personList", JSON.stringify(personData));
}

