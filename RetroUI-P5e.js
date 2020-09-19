
Hooks.once('WhetstoneReady', () => {

    // register a default menu with Whetstone for configuration
    game.Whetstone.settings.registerMenu('RetroUI-P5e', 'RetroUI-P5e', {
        name: game.i18n.localize('P5ESTYLES.Config'),
        label: game.i18n.localize('P5ESTYLES.ConfigTitle'),
        hint: game.i18n.localize('P5ESTYLES.ConfigHint'),
        icon: 'fas fa-paint-brush',
        //type: '', // leave empty to use default WhetstoneThemeConfigDialog
        restricted: false
    });

    // register a theme
    game.Whetstone.themes.register('RetroUI-P5e', {

        // the following keys will be pulled from the module.json
        // name, title, description, version, author/authors, url

        // author/authors will be formattd to fit this format
        authors: [
            { name: 'MajorVictory', contact: 'Github', url: 'https://github.com/MajorVictory' }
        ],

        // will be merged with 'styles' entry in module.json
        // these sheets are considered to be the 'core' styles for this theme
        // these files are always loaded first when the theme is enabed
        // no system specific themes should be defined here
        styles: [
            'modules/RetroUI-P5e/styles/fonts/loadfonts.css',
            'modules/RetroUI-P5e/styles/RetroUI-P5e-1.4.0.css'
        ],

        // here you can specify system specific styles or optional styles
        substyles: {
            'dnd5e': {
                //sybstyle id
                name: 'dnd5e',
                // title used in menu
                title: 'P5ESTYLES.SystemNameDND5e',
                // hint displayed under title
                hint: 'P5ESTYLES.SheetOverrideNotednd5e',
                // (optional) specify system
                system: 'dnd5e',
                // (optional) specify system version minimum
                version: '0.96',
                // if true and system/version are specified, they must match current setup
                // if true and no system/version specified, acts as a global style on by default
                active: true,
                // list of stylesheets to activate with this substyle
                styles: [
                    'modules/RetroUI-P5e/styles/systems/dnd5e-0.96.css'
                ]
            },
            'worldbuilding': {
                name: 'worldbuilding',
                title: 'P5ESTYLES.SystemNameWorldBuilding',
                hint: 'P5ESTYLES.SheetOverrideNote',
                system: 'worldbuilding',
                version: '0.36',
                active: true,
                styles: [
                    'modules/RetroUI-P5e/styles/systems/worldbuilding.css'
                ]
            },
            'pf2e': {
                name: 'pf2e',
                title: 'P5ESTYLES.SystemNamePF2e',
                hint: 'P5ESTYLES.SheetOverrideNote',
                system: 'pf2e',
                version: '1.10.10.1973',
                active: true,
                styles: [
                    'modules/RetroUI-P5e/styles/systems/pf2e.css'
                ]
            },
            'pf2e-colors': {
                //this substyle will activate only on the pf2e system
                name: 'pf2e-colors',
                title: 'P5ESTYLES.PF2EColorOverride',
                hint: 'P5ESTYLES.PF2EColorOverrideNote',
                system: 'pf2e',
                active: true,
                styles: [
                    'modules/RetroUI-P5e/styles/systems/pf2e-sheetcolors.css'
                ]
            }
        },

        variables: [
            // extra types supported: 'shades', 'color'
            // shades: produces color variants with the specified color as a base
            // color: produces one color value only
            {
                name: '--p5e-bg-color',
                title: 'P5ESTYLES.SheetBackgroundColor',
                hint: '<hr>',
                value: '#fffbce', type: 'shades', presets: 'sheetColorPresets'
            },
            {
                name: '--p5e-fg-color',
                title: 'P5ESTYLES.SheetForeroundColor',
                hint: '<hr>',
                value: '#58d0d0', type: 'shades', presets: 'sheetColorPresets'
            },
            {
                name: '--p5e-bg-controldex-color',
                title: 'P5ESTYLES.ControldexColor',
                hint: '<hr>',
                value: '#f20c32', type: 'color', presets: 'controldexPresets'
            },
            {
                name: '--p5e-chatbg-color-public',
                title: 'P5ESTYLES.ChatBoxPublic',
                hint: 'P5ESTYLES.ChatBoxPublicHint',
                value: '#58d0d0', type: 'color', presets: 'sheetColorPresets'
            },
            {
                name: '--p5e-chatborder-public',
                title: 'P5ESTYLES.ChatBorderPublic',
                hint: '<hr>',
                value: "url('../images/chatborders/21.png') 16 round", type: String, presets: 'chatBorders'
            },
            {
                name: '--p5e-chatbg-color-whisper',
                title: 'P5ESTYLES.ChatBoxWhisper',
                hint: 'P5ESTYLES.ChatBoxWhisperHint',
                value: '#c0a5da', type: 'color', presets: 'sheetColorPresets'
            },
            {
                name: '--p5e-chatborder-whisper',
                title: 'P5ESTYLES.ChatBorderWhisper',
                hint: '<hr>',
                value: "url('../images/chatborders/03.png') 16 round", type: String, presets: 'chatBorders'
            },
            {
                name: '--p5e-chatbg-color-blind',
                title: 'P5ESTYLES.ChatBoxBlind',
                hint: 'P5ESTYLES.ChatBoxBlindHint',
                value: '#ff9d9d', type: 'color', presets: 'sheetColorPresets'
            },
            {
                name: '--p5e-chatborder-blind',
                title: 'P5ESTYLES.ChatBorderBlind',
                hint: '<hr>',
                value: "url('../images/chatborders/11.png') 16 round", type: String, presets: 'chatBorders'
            }
        ],

        presets: {
            controldexPresets: {
                '#f20c32': 'Red',
                '#0a2dc9': 'Blue',
                '#0ac92a': 'Green',
                '#f2eb0c': 'Yellow',
                '#f2a20c': 'Gold',
                '#bebebe': 'Silver',
                '#02e2ff': 'Crystal',
                '#91071e': 'Ruby',
                '#072091': 'Sapphire',
                '#ff7700': 'Fire Red',
                '#00fd27': 'Leaf Green',
                '#07911f': 'Emerald',
                '#979ac8': 'Diamond',
                '#ecb2c2': 'Pearl',
                '#959595': 'Platinum',
                '#d8c156': 'HeartGold',
                '#8c95b5': 'SoulSilver',
                '#373737': 'Black',
                '#ffffff': 'White',
                '#202020': 'Black 2',
                '#fbeaee': 'White 2',
                '#3280cf': 'X',
                '#ff465b': 'Y',
                '#d43400': 'Omega Ruby',
                '#3e6aa9': 'Alpha Sapphire',
                '#fe9539': 'Sun',
                '#53a1d9': 'Moon',
                '#e56638': 'Ultra Sun',
                '#1e7bd4': 'Ultra Moon',
                '#e6c300': 'Let\'s Go, Pikachu!',
                '#a88633': 'Let\'s Go, Eevee!',
                '#4dcdff': 'Sword',
                '#ff4ea1': 'Shield'
            },
            sheetColorPresets: {
                "#fffbce": "Standard Tan",
                "#ff9d9d": "Trainer Red",
                "#e4a089": "Rocky Brown",
                "#f4ce88": "Mousy Yellow",
                "#68c098": "Misty Green",
                "#b5dc92": "Buggy Green",
                "#58d0d0": "Trainer Blue",
                "#c0a5da": "Trainer Purple",
                "#eee6dd": "Eggy Shell White",
                "#f0ace6": "Balloon Pink",
                "#c0c0c0": "Steely Grey",
                "#525252": "Edgy Black"
            },
            chatBorders: {
                "url('../images/chatborders/01.png') 16 round": "Chat Border #01",
                "url('../images/chatborders/02.png') 16 round": "Chat Border #02",
                "url('../images/chatborders/03.png') 16 round": "Chat Border #03",
                "url('../images/chatborders/04.png') 16 round": "Chat Border #04",
                "url('../images/chatborders/05.png') 16 round": "Chat Border #05",
                "url('../images/chatborders/06.png') 16 round": "Chat Border #06",
                "url('../images/chatborders/07.png') 16 round": "Chat Border #07",
                "url('../images/chatborders/08.png') 16 round": "Chat Border #08",
                "url('../images/chatborders/09.png') 16 round": "Chat Border #09",
                "url('../images/chatborders/10.png') 16 round": "Chat Border #10",
                "url('../images/chatborders/11.png') 16 round": "Chat Border #11",
                "url('../images/chatborders/12.png') 16 round": "Chat Border #12",
                "url('../images/chatborders/13.png') 16 round": "Chat Border #13",
                "url('../images/chatborders/14.png') 16 round": "Chat Border #14",
                "url('../images/chatborders/15.png') 16 round": "Chat Border #15",
                "url('../images/chatborders/16.png') 16 round": "Chat Border #16",
                "url('../images/chatborders/17.png') 16 round": "Chat Border #17",
                "url('../images/chatborders/18.png') 16 round": "Chat Border #18",
                "url('../images/chatborders/19.png') 16 round": "Chat Border #19",
                "url('../images/chatborders/20.png') 16 round": "Chat Border #20",
                "url('../images/chatborders/21.png') 16 round": "Chat Border #21",
                "url('../images/chatborders/22.png') 16 round": "Chat Border #22",
                "url('../images/chatborders/23.png') 16 round": "Chat Border #23",
                "url('../images/chatborders/24.png') 16 round": "Chat Border #24",
                "url('../images/chatborders/25.png') 16 round": "Chat Border #25",
                "url('../images/chatborders/26.png') 16 round": "Chat Border #26",
                "url('../images/chatborders/27.png') 16 round": "Chat Border #27",
                "url('../images/chatborders/28.png') 16 round": "Chat Border #28",
                "url('../images/chatborders/29.png') 16 round": "Chat Border #29"
            }
        },

        // (optional) FormApplication extended class that creates the options dialog
        // if you register your own dialog menu you can specify it here
        // leaving this blank will use the Whetstone default config dialog
        // >                  This Value ---v   and   ---v  to this ---> 'RetroUI-P5e.RetroUI-P5e'
        // > game.settings.registerMenu('RetroUI-P5e', 'RetroUI-P5e', {...});
        dialog: '',

        // (optional) Thumbnail image
        img: 'modules/RetroUI-P5e/images/p5e-thumb.png',

        // (optional) Large preview image
        preview: 'modules/RetroUI-P5e/readme/Overview-9-4-2020.png',

        // (optional) Ensure the specified module is loaded before registering theme 
        dependencies: {
            'RetroUI-Core': ''
        },

        // (optional) known compatible systems/versions
        // if specified, sheets are attempted to be loaded in the following order
        // 1. /modules/<Module_Name>/styles/systems/<SystemID>.css
        // 2. /modules/<Module_Name>/styles/systems/<SystemID>-<Version>.css
        // 
        // <SystemID> : will be the current active system id
        // <Version> : will be the current active system's version
        // 
        // specified versions are used to indicate to the user if a theme may have issues with their world
        // These are NOT ENFORCED
        systems: {
            'core': '0.6.6',
            'dnd5e': '0.96',
            'worldbuilding': '0.36',
            'pf2e': '1.10.10.1973'
        },

        // (optional) known compatibilities
        compatible: {
            'alt5e': '1.3.4',
            'tidy5e-sheet': '0.2.21',
            'furnace':'',
            'dice-calculator': ''
        },

        // (optional) known conflicts
        conflicts: {
            'darksheet': '',
            'dnd-ui': ''
        },
    });
});

Hooks.on('renderSceneControls', () => {
    // controldex button 1 - opens styles config menu
    $('#controls').append($('<p>', { class: 'dexbutton dexbutton1' }).click(function(event) {
            const menu = game.Whetstone.settings.menus.get('RetroUI-P5e.RetroUI-P5e');
            if ( !menu ) return ui.notifications.error('No submenu found for the provided key');
            const app = new menu.type({theme:'RetroUI-P5e'});
            return app.render(true);
        })
    );
});