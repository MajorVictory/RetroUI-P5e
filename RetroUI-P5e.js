
Hooks.once('init', () => {
    game.settings.registerMenu('RetroUI-P5e', 'RetroUI-P5e', {
        name: game.i18n.localize('P5ESTYLES.Config'),
        label: game.i18n.localize('P5ESTYLES.ConfigTitle'),
        hint: game.i18n.localize('P5ESTYLES.ConfigHint'),
        icon: 'fas fa-paint-brush',
        type: RetroUIP5eStylesConfigDialog,
        restricted: false
    });

    game.settings.register('RetroUI-P5e', 'settings', {
        name: game.i18n.localize('P5ESTYLES.Config'),
        scope: 'client',
        default: RetroUIP5eStylesConfig.getDefaults,
        type: Object,
        config: false,
        onChange: settings => {
			RetroUIP5eStylesConfig.apply(settings);
        }
    });
});

Hooks.once('ready', () => {
    RetroUIP5eStylesConfig.apply(RetroUIP5eStylesConfig.getOptions);

    // adding the style here ensures it is the last entry in the header.
    // this give our stylesheet top-level priority
    // which means we can override selectors just by matching them instead of needing '!important'
    RetroUIUtilities.addStyle('modules/RetroUI-P5e/styles/RetroUI-P5e-1.4.0.css');

    let settings = game.settings.get('RetroUI-P5e', 'settings');

    // enable system-specific sheets if enabled
    if (settings['SheetOverride_'+game.system.id]) {
        RetroUIUtilities.addStyle(RetroUIP5eStylesConfig.getSystemSheet(game.system.id));
    }
});

Hooks.once('renderSceneControls', () => {
    // controldex button 1 - opens styles config menu
    $('#controls').append($('<p>', { class: 'dexbutton dexbutton1' }).click(function(event) {
            const menu = game.settings.menus.get('RetroUI-P5e.RetroUI-P5e');
            if ( !menu ) return ui.notifications.error('No submenu found for the provided key');
            const app = new menu.type();
            return app.render(true);
        })
    );
});

/* Settings Dialog Class */
// This class registers a config dialog with your style's specific settings
class RetroUIP5eStylesConfigDialog extends FormApplication {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            title: game.i18n.localize('P5ESTYLES.Config'),
            id: 'RetroUI-P5e-config',
            template: 'modules/RetroUI-P5e/templates/settings.html',
            width: 510,
            height: 'auto',
            closeOnSubmit: true,
            tabs: [{navSelector: ".tabs", contentSelector: "form", initial: "themecolors"}]
        });
    }

    getData(options) {
        let defaultOptions = RetroUIP5eStylesConfig.getDefaults;
        let currentdata = game.settings.get('RetroUI-P5e', 'settings');
        let returndata = this.reset ? defaultOptions : mergeObject(defaultOptions, currentdata);
        return returndata;
    }

    activateListeners(html) {
        super.activateListeners(html);

        // connect color-pickers to validator
        html.find('.mv-color-value').change(this.updateColor.bind(this));
        html.find('input, select').change(this.onApply.bind(this));
        html.find('button[name="reset"]').click(this.onReset.bind(this));

        // fixe for typed colors not always triggering validation on dialog open
        $('input[type="text"].mv-color-value').change();

        this.reset = false;
    }

    // updates 'brother' controls of the color-picker to all reflect the same values
    updateColor(event) {
        RetroUIUtilities.validateColorPicker(event);
    }

    onApply(event) {
        event.preventDefault();
    }

    onReset() {
        this.reset = true;
        this.render();
    }

    async _updateObject(event, formData) {
        await game.settings.set('RetroUI-P5e', 'settings', formData);
        ui.notifications.info(game.i18n.localize("P5ESTYLES.SaveMessage"));
    }
}

/* Settings Storage Class */
// specify default settings, system sheet locations, and logic for applying settings here
export class RetroUIP5eStylesConfig {

	static get getDefaults() {
		return {
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
				"01": "Chat Border #01",
		        "02": "Chat Border #02",
		        "03": "Chat Border #03",
		        "04": "Chat Border #04",
		        "05": "Chat Border #05",
		        "06": "Chat Border #06",
		        "07": "Chat Border #07",
				"08": "Chat Border #08",
		        "09": "Chat Border #09",
		        "10": "Chat Border #10",
		        "11": "Chat Border #11",
		        "12": "Chat Border #12",
		        "13": "Chat Border #13",
		        "14": "Chat Border #14",
				"15": "Chat Border #15",
		        "16": "Chat Border #16",
		        "17": "Chat Border #17",
		        "18": "Chat Border #18",
		        "19": "Chat Border #19",
		        "20": "Chat Border #20",
		        "21": "Chat Border #21",
		        "22": "Chat Border #22",
		        "23": "Chat Border #23",
		        "24": "Chat Border #24",
		        "25": "Chat Border #25",
		        "26": "Chat Border #26",
		        "27": "Chat Border #27",
		        "28": "Chat Border #28",
		        "29": "Chat Border #29"
			},
    		controldexColor: '#f20c32',
	    	SheetBackgroundColor: '#fffbce',
	    	SheetForegroundColor: '#58d0d0',
    		ChatBoxPublicBackgroundColor: '#58d0d0',
    		ChatBoxPublicBorder: '21',
    		ChatBoxWhisperBackgroundColor: '#c0a5da',
    		ChatBoxWhisperBorder: '03',
    		ChatBoxBlindBackgroundColor: '#ff9d9d',
    		ChatBoxBlindBorder: '11',
            PF2EColorOverride: true,
            SheetOverride_dnd5e: true,
            SheetOverride_worldbuilding: true,
            SheetOverride_pf2e: true
    	};
	}

	static get getOptions() {
		return mergeObject(RetroUIP5eStylesConfig.getDefaults, game.settings.get("RetroUI-P5e", "settings"));
	}

    static getSystemSheet(system) {
        switch (system) {
            case 'dnd5e': return 'modules/RetroUI-P5e/styles/systems/dnd5e-0.96.css';
            case 'worldbuilding': return 'modules/RetroUI-P5e/styles/systems/worldbuilding.css';
            case 'pf2e': return 'modules/RetroUI-P5e/styles/systems/pf2e.css';
            default: return '';
        }
    }

	static apply(options) {
        // creates css variables with slightly different shades
		RetroUIUtilities.generateColors(options.SheetBackgroundColor, 'p5e', 'bg-color');
		RetroUIUtilities.generateColors(options.SheetForegroundColor, 'p5e', 'fg-color');

        // single css variables
        RetroUIUtilities.writeColor('--p5e-bg-controldex-color', options.controldexColor);
        RetroUIUtilities.writeColor('--p5e-chatbg-color-public', options.ChatBoxPublicBackgroundColor);
        RetroUIUtilities.writeColor('--p5e-chatbg-color-whisper', options.ChatBoxPublicBackgroundColor);
        RetroUIUtilities.writeColor('--p5e-chatbg-color-blind', options.ChatBoxPublicBackgroundColor);
		RetroUIUtilities.writeColor('--p5e-chatborder-public', RetroUIP5eStylesConfig.getChatborder(options.ChatBoxPublicBorder));
		RetroUIUtilities.writeColor('--p5e-chatborder-whisper', RetroUIP5eStylesConfig.getChatborder(options.ChatBoxWhisperBorder));
		RetroUIUtilities.writeColor('--p5e-chatborder-blind', RetroUIP5eStylesConfig.getChatborder(options.ChatBoxBlindBorder));

        // pf2e custom sheet color overrides
        RetroUIUtilities.writeColor('--primary-background', (options.PF2EColorOverride ? 'var(--p5e-fg-color-shadow)' : ''));
        RetroUIUtilities.writeColor('--secondary-background', (options.PF2EColorOverride ? 'var(--p5e-fg-color)' : ''));
        RetroUIUtilities.writeColor('--tertiary-background', (options.PF2EColorOverride ? 'var(--p5e-fg-color-shadow)' : ''));
        RetroUIUtilities.writeColor('--alternate-background', (options.PF2EColorOverride ? 'var(--p5e-fg-color-darker)' : ''));

        // load system specific styles
        if (options['SheetOverride_'+game.system.id]) {
            RetroUIUtilities.addStyle(RetroUIP5eStylesConfig.getSystemSheet('dnd5e'));
        } else {
            RetroUIUtilities.removeStyle(RetroUIP5eStylesConfig.getSystemSheet('dnd5e'));
        }
	}

    // p5e specific, makes a chatborder url from just a two-digit number
    static getChatborder(num) {
        let slice = '';
        switch(num) {
            case '01': slice = '16 round'; break;
            default: slice = '16 round';
        }
        return 'url(\'/modules/RetroUI-P5e/images/chatborders/'+num+'.png\') '+slice;
    }
}

/* Core Utilities */
export class RetroUIUtilities {

    static removeStyle(path) {
        let element = $('head link[href="'+path+'"]');
        if (element) element.remove();
    }

    static addStyle(path) {
        RetroUIUtilities.removeStyle(path);
        $('<link href="'+path+'" rel="stylesheet" type="text/css" media="all">').appendTo($('head'));
    }

    // assign to .change() event for color-picker inputs
    static validateColorPicker(event) {
        let control = $(event.target);
        let parentGroup = $(control.parents('.mv-color-input')[0]);

        // validate manual color
        if (control.attr('type') == 'text') {

            let colortest = /^#[0-9A-F]{6}$/i.test(control.val());

            if(!colortest) {
                ui.notifications.warn(game.i18n.localize('P5ESTYLES.InvalidColorFormat'));
                control.val('#000000');
            }
        }

        let colorgroup = parentGroup.find('.mv-color-value');

        for (var el = colorgroup.length - 1; el >= 0; el--) {
            let brother = $(colorgroup[el]);

            //skip if setting myself
            if (brother.name == control.prop('name')) continue;

            // no color matches a preset, set to custom
            if (brother.prop('tagName') == 'SELECT') {
                brother.val(control.val());
                if (brother.val() == null) {
                    brother.val('custom');
                }
            } else if (brother.prop('tagName') == 'INPUT' && brother.prop('type') == 'text') {
                // if custom, set to black at first
                if (control.val() == 'custom') {
                    brother.val('#000000');
                } else {
                    brother.val(control.val());
                }
            } else {
                brother.val(control.val());
            }
        }
    }

    // attempts to create color variants around a given hex value
    static generateColors(hex, prefix, name) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        let r = parseInt(result[1], 16);
        let g = parseInt(result[2], 16);
        let b = parseInt(result[3], 16);

        r /= 255, g /= 255, b /= 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if(max == min){
            h = s = 0; // achromatic
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        s = Math.round(s * 100);
        l = Math.round(l * 100);
        h = Math.round(h * 360);
        let a = 1;

        let colors = {
            value: 'hsla(' + h + ', ' + s + '%, ' + l + '%, ' + a + ')',
            quarter: 'hsla(' + h + ', ' + s + '%, ' + l + '%, 0.25)',
            half: 'hsla(' + h + ', ' + s + '%, ' + l + '%, 0.5)',
            threequarter: 'hsla(' + h + ', ' + s + '%, ' + l + '%, 0.75)',
            shadow: 'hsla(' + h + ', ' + s + '%, 25%, ' + a + ')',
            dark: 'hsla(' + h + ', ' + s + '%, 25%, 0.5)',
            light: 'hsla(' + h + ', 100%, 50%, ' + a + ')',
            darker: 'hsla(' + h + ', ' + s + '%, ' + Math.max(0, (l - 10)) + '%, ' + a + ')',
            lighter: 'hsla(' + h + ', ' + s + '%, ' + Math.min(100, (l + 10)) + '%, ' + a + ')'
        }

        for (let colortype in colors) {
            let value = colors[colortype];
            let propname = '--'+prefix+'-'+name+(colortype != 'value' ? '-'+colortype : '');
            RetroUIUtilities.writeColor(propname, value);
        }
    }

    static writeColor(name, value) {

        if (Array.isArray(name)) {
            for (let i = 0; i < name.length; i++) {
                if (Array.isArray(value)) {
                    RetroUIUtilities.writeColor(name[i], value[i]);
                } else {
                    RetroUIUtilities.writeColor(name[i], value);
                }
            }
            return;
        }

        if (value != null && value != '') {
            document.documentElement.style.setProperty(name, value);
        } else {
            document.documentElement.style.removeProperty(name);
        }
    }
}