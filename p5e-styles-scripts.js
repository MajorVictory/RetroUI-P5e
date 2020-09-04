
function p5eGetBGData(num) {
	let slice = '';
	switch(num) {
		case "01": slice = '16 round'; break;
		default: slice = '16 round';
	}
	return 'url(\'/modules/RetroUI-P5e/images/chatborders/'+num+'.png\') '+slice;
}

function p5eCreateColors(hex, name) {
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
    	let propname = '--p5e-'+name+(colortype != 'value' ? '-'+colortype : '');
    	document.documentElement.style.setProperty(propname, value);
    	
    }
}

Hooks.once('init', () => {

    game.settings.registerMenu("RetroUI-P5e", "RetroUI-P5e", {
        name: game.i18n.localize("P5ESTYLES.Config"),
        label: game.i18n.localize("P5ESTYLES.ConfigTitle"),
        hint: game.i18n.localize("P5ESTYLES.ConfigHint"),
        icon: "fas fa-paint-brush",
        type: RetroUIP5eStylesConfigDialog,
        restricted: false
    });

    game.settings.register("RetroUI-P5e", "settings", {
        name: game.i18n.localize("P5ESTYLES.Config"),
        scope: "client",
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

    // controldex button 1 - opens styles config menu
    $('#controls').append($('<p>', { class: 'dexbutton dexbutton1' }).click(function(event) {
            const menu = game.settings.menus.get("RetroUI-P5e.RetroUI-P5e");
            if ( !menu ) return ui.notifications.error("No submenu found for the provided key");
            const app = new menu.type();
            return app.render(true);
        })
    );
});

// main class to hold default configs and current settings
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
    		ChatBoxBlindBorder: '11'
    	};
	}

	static get getOptions() {
		return mergeObject(RetroUIP5eStylesConfig.getDefaults, game.settings.get("RetroUI-P5e", "settings"));
	}

	static apply(options) {

		p5eCreateColors(options.controldexColor, 'bg-controldex-color');
		p5eCreateColors(options.SheetBackgroundColor, 'bg-color');
		p5eCreateColors(options.SheetForegroundColor, 'fg-color');
		p5eCreateColors(options.ChatBoxPublicBackgroundColor, 'chatbg-color-public');
		p5eCreateColors(options.ChatBoxWhisperBackgroundColor, 'chatbg-color-whisper');
		p5eCreateColors(options.ChatBoxBlindBackgroundColor, 'chatbg-color-blind');

		document.documentElement.style.setProperty('--p5e-chatborder-public', p5eGetBGData(options.ChatBoxPublicBorder));
		document.documentElement.style.setProperty('--p5e-chatborder-whisper', p5eGetBGData(options.ChatBoxWhisperBorder));
		document.documentElement.style.setProperty('--p5e-chatborder-blind', p5eGetBGData(options.ChatBoxBlindBorder));
	}
}

class RetroUIP5eStylesConfigDialog extends FormApplication {

	static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            title: game.i18n.localize("P5ESTYLES.Config"),
            id: "RetroUI-P5e-config",
            template: "modules/RetroUI-P5e/templates/settings.html",
            width: 510,
            height: 795,
            closeOnSubmit: true
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
        html.find('select[name="controldexColorPreset"],input[name="controldexColor"],input[name="controldexColorSelector"]').change(this.updateColor.bind(this));
        html.find('select[name="SheetBackgroundColorPreset"],input[name="SheetBackgroundColor"],input[name="SheetBackgroundColorSelector"]').change(this.updateColor.bind(this));
        html.find('select[name="SheetForegroundColorPreset"],input[name="SheetForegroundColor"],input[name="SheetForegroundColorSelector"]').change(this.updateColor.bind(this));
        html.find('select[name="ChatBoxPublicBackgroundColorPreset"],input[name="ChatBoxPublicBackgroundColor"],input[name="ChatBoxPublicBackgroundColorSelector"]').change(this.updateColor.bind(this));
        html.find('select[name="ChatBoxWhisperBackgroundColorPreset"],input[name="ChatBoxWhisperBackgroundColor"],input[name="ChatBoxWhisperBackgroundColorSelector"]').change(this.updateColor.bind(this));
        html.find('select[name="ChatBoxBlindBackgroundColorPreset"],input[name="ChatBoxBlindBackgroundColor"],input[name="ChatBoxBlindBackgroundColorSelector"]').change(this.updateColor.bind(this));
        html.find('input,select').change(this.onApply.bind(this));
        html.find('button[name="reset"]').click(this.onReset.bind(this));

        $('input[name="controldexColor"], input[name="SheetBackgroundColor"], input[name="SheetForegroundColor"], input[name="ChatBoxPublicBackgroundColor"], input[name="ChatBoxWhisperBackgroundColor"], input[name="ChatBoxBlindBackgroundColor"]').change();

        this.reset = false;
    }

    // updates 'borther' controls to all reflect the same values
    updateColor(event) {
    	let control = $(event.target);

    	// validate manual color
    	if (['controldexColor','SheetBackgroundColor', 'SheetForegroundColor','ChatBoxPublicBackgroundColor',
    		'ChatBoxWhisperBackgroundColor', 'ChatBoxBlindBackgroundColor'].includes(control.prop('name'))) {

    		let colortest = /^#[0-9A-F]{6}$/i.test(control.val());

    		if(!colortest) {
    			ui.notifications.warn(game.i18n.localize("P5ESTYLES.InvalidColorFormat"));
    			control.val('#000000');
    		}
    	}

    	let colorgroups = [
    		['controldexColorPreset', 'controldexColor', 'controldexColorSelector'],
    		['SheetBackgroundColorPreset', 'SheetBackgroundColor', 'SheetBackgroundColorSelector'],
    		['SheetForegroundColorPreset', 'SheetForegroundColor', 'SheetForegroundColorSelector'],
    		['ChatBoxPublicBackgroundColorPreset', 'ChatBoxPublicBackgroundColor', 'ChatBoxPublicBackgroundColorSelector'],
    		['ChatBoxWhisperBackgroundColorPreset', 'ChatBoxWhisperBackgroundColor', 'ChatBoxWhisperBackgroundColorSelector'],
    		['ChatBoxBlindBackgroundColorPreset', 'ChatBoxBlindBackgroundColor', 'ChatBoxBlindBackgroundColorSelector']
    	];

    	for (var group = colorgroups.length - 1; group >= 0; group--) {
    		let colorgroup = colorgroups[group];

    		if (colorgroup.includes(control.prop('name'))) {

    			for (var el = colorgroup.length - 1; el >= 0; el--) {
    				let brother = $('[name="'+colorgroup[el]+'"]');

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
    	}
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