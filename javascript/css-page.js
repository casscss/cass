
output = {};

document.addEventListener("DOMContentLoaded", function() {
    // readyOneLiner();
});

function luma(color) {
    // color can be a hx string or an array of RGB values 0-255
    var rgb = (typeof color === 'string') ? hexToRgb(color) : color;
    return (0.2126 * rgb.r) + (0.7152 * rgb.g) + (0.0722 * rgb.b); // SMPTE C, Rec. 709 weightings
}

function copyCSS() {
    var textToCopy = document.getElementById("css_textarea");
    textToCopy.select();
    textToCopy.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

function copyOneLiner() {
    var textToCopy = document.getElementById("css_oneline");
    textToCopy.select();
    textToCopy.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

function copyBasicCSS() {
    var textToCopy = document.getElementById("css_textarea");
    textToCopy.select();
    textToCopy.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

function copyHTML() {
    var textToCopy = document.getElementById("html_textarea");
    textToCopy.select();
    textToCopy.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function copyColorString(id) {
    var stringToCopy = document.getElementById(id);
    var theStringItself = stringToCopy.value;
    // console.log(stringToCopy);
    stringToCopy.select();
    stringToCopy.setSelectionRange(0, 99999);
    document.execCommand("copy");
    showMessage("Copied '" + theStringItself + "' to clipboard.");
}

function copyColorStringNoHide(id) {

    // the "NoHide" variant is running in the VS plugin

    var stringToCopy = document.getElementById(id);
    var theStringItself = stringToCopy.value;
    
    if (document.getElementById("color-hex").checked == true) {
        var format_user_wants = "hex";
    }

    if (document.getElementById("color-name").checked == true) {
        var format_user_wants = "name";
    }

    if (format_user_wants == "hex") {
        var copyStyle = getComputedStyle(stringToCopy);

        var bg_color = copyStyle.backgroundColor;

        let sep = bg_color.indexOf(",") > -1 ? "," : " ";
        rgb = bg_color.substr(4).split(")")[0].split(sep);

        let r = (+rgb[0]).toString(16),
            g = (+rgb[1]).toString(16),
            b = (+rgb[2]).toString(16);

        if (r.length == 1)
            r = "0" + r;
        if (g.length == 1)
            g = "0" + g;
        if (b.length == 1)
            b = "0" + b;

        var hex = "#" + r + g + b;

        var text = hex;

        var textArea = document.createElement("textarea");
    
      //
      // *** This styling is an extra step which is likely not required. ***
      //
      // Why is it here? To ensure:
      // 1. the element is able to have focus and selection.
      // 2. if the element was to flash render it has minimal visual impact.
      // 3. less flakyness with selection and copying which **might** occur if
      //    the textarea element is not visible.
      //
      // The likelihood is the element won't even render, not even a
      // flash, so some of these are just precautions. However in
      // Internet Explorer the element is visible whilst the popup
      // box asking the user for permission for the web page to
      // copy to the clipboard.
      //
    
      // Place in the top-left corner of screen regardless of scroll position.
      textArea.style.position = 'fixed';
      textArea.style.top = 0;
      textArea.style.left = 0;
    
      // Ensure it has a small width and height. Setting to 1px / 1em
      // doesn't work as this gives a negative w/h on some browsers.
      textArea.style.width = '2em';
      textArea.style.height = '2em';
    
      // We don't need padding, reducing the size if it does flash render.
      textArea.style.padding = 0;
    
      // Clean up any borders.
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
    
      // Avoid flash of the white box if rendered for any reason.
      textArea.style.background = 'transparent';
    
    
      textArea.value = text;
    
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
    
      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
      } catch (err) {
        // console.log('Oops, unable to copy');
      }
    
      document.body.removeChild(textArea);

      showMessageNoHide("Copied <span class='text-padding rounded " + theStringItself + "'>" + text + "</span> to clipboard.");
    }

    if (format_user_wants == "name") {
        stringToCopy.select();
        stringToCopy.setSelectionRange(0, 99999);
        document.execCommand("copy");
        showMessageNoHide("Copied <span class='text-padding rounded " + theStringItself + "'>'" + theStringItself + "'</span> to clipboard.");
    }
}

function readyLabel() {
    var label = document.getElementById("baseColorLabel");
    var preview = document.getElementById("baseColorPreview");
    label.innerHTML = document.getElementById("baseColor").value;
    preview.style.backgroundColor = document.getElementById("baseColor").value;
}

function readyForm() {
    readyButton();
    readyLabel();
}

// function readyOneLiner() {
//     var the_css = minify(document.getElementById("css_textarea").value);
//     var the_style_tag = '<style>'
//                         + '/* A California Stylesheet (MIT License) */'
//                         + '/* https://github.com/casscss/cass */'
//                          + the_css 
//                          + '</style>';
//     document.getElementById("css_oneline").innerHTML = the_style_tag;
// }

function showMessageNoHide(string) {
    document.getElementById("nav_message_container").classList.remove("hide");
    var messageDiv = document.getElementById("nav_message");
    messageDiv.innerHTML = string;
    messageDiv.classList.remove("hide");
}

function saveTextAsFile(textToWrite, fileNameToSaveAs) {
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'}); 
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}

function updateColor() {
    var h = document.getElementById("baseHue").value;
    var s = document.getElementById("baseSaturation").value;
    var l = document.getElementById("baseLightness").value;    

    var original_css = document.getElementById("css_textarea").innerHTML;

    var css_template = `:root {
    --base-h: ${h};
    --base-s: ${s}%;
    --base-l: ${l}%;
    --base-tone: var(--black);
`;

    var css_template_alt = `:root {
    --base-h: ${h};
    --base-s: ${s}%;
    --base-l: ${l}%;
    --base-tone: var(--white);
`;

    var css_header = `/* A California Stylesheet (MIT License) */
/* https://github.com/casscss/cass */

:root {
    --base-h: ${h};
    --base-s: ${s}%;
    --base-l: ${l}%;
    --base-tone: var(--black);
`;

    var css_header_alt = `/* A California Stylesheet (MIT License) */
/* https://github.com/casscss/cass */

:root {
    --base-h: ${h};
    --base-s: ${s}%;
    --base-l: ${l}%;
    --base-tone: var(--white);
`;

    const deleteLines = (string, n = 1)=>{
        return string.replace(new RegExp(`(?:.*?\n){${n-1}}(?:.*?\n)`), '');
    };

    var rest_css = deleteLines(original_css, 8);

    var rgb_color = hslToRgb((h/360), (s/100), (l/100));

    if (luma(rgb_color) > 165) {
        document.getElementById('added_theme').innerHTML = css_template + '}';
        document.getElementById('css_textarea').innerHTML = css_header + rest_css;

    } else {
        document.getElementById('added_theme').innerHTML = css_template_alt + '}';
        document.getElementById('css_textarea').innerHTML = css_header_alt + rest_css;
    }

    document.getElementById("baseColor").value = rgb_color;

    // readyOneLiner();

}

function updateColorRGB() {
    var rgb_hex = document.getElementById("baseColor").value;
    var rgb_color = hexToRgb(rgb_hex);
    var hsl_color = rgbToHsl(rgb_color.r, rgb_color.g, rgb_color.b);

    var h = hsl_color[0] * 360;
    var s = hsl_color[1] * 100;
    var l = hsl_color[2] * 100;

    document.getElementById("baseHue").value = h;
    document.getElementById("baseSaturation").value = s;
    document.getElementById("baseLightness").value = l;

    document.getElementById("baseHueLabel").innerHTML = Math.round(h);
    document.getElementById("baseSaturationLabel").innerHTML = Math.round(s);
    document.getElementById("baseLightnessLabel").innerHTML = Math.round(l);

    updateColor();
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
 function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
}

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @return  {Array}           The HSL representation
 */
 function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }


function minify(css) {
    return css.replace(/([^0-9a-zA-Z\.#])\s+/g, "$1");
}
  