
output = {};

document.addEventListener("DOMContentLoaded", function() {
    // console.log('testing event listener');    
});

function copyCSS() {
    var textToCopy = document.getElementById("css_textarea");
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

function showBuilder() {
    document.getElementById("builder_container").classList.remove("hide");
    document.getElementById("palette").classList.add("hide");
    document.getElementById("css_output_container").classList.add("hide");

    document.getElementById("the_color_menu").classList.add("hide");
    document.getElementById("css_options").classList.add("hide");

    document.getElementById("css_button").classList.add("dim", "fade");
    document.getElementById("palette_button").classList.add("dim", "fade");
    document.getElementById("builder_button").classList.remove("dim", "fade");
}

function showHelp() {
    document.getElementById("css_output_container").classList.remove("hide");
    document.getElementById("palette").classList.add("hide");
    document.getElementById("builder_container").classList.add("hide");

    document.getElementById("the_color_menu").classList.remove("hide");
    document.getElementById("css_options").classList.add("hide");

    document.getElementById("css_button").classList.remove("dim", "fade");
    document.getElementById("palette_button").classList.add("dim", "fade");
    document.getElementById("builder_button").classList.add("dim", "fade");
}

function showCSS() {
    document.getElementById("css_output_container").classList.add("hide");
    document.getElementById("builder_container").classList.add("hide");
    document.getElementById("palette").classList.remove("hide");

    document.getElementById("the_color_menu").classList.remove("hide");
    document.getElementById("css_options").classList.remove("hide");

    document.getElementById("css_button").classList.add("dim", "fade");
    document.getElementById("builder_button").classList.add("dim", "fade");
    document.getElementById("palette_button").classList.remove("dim", "fade");
}

function showMessage(string) {
    document.getElementById("nav_message_container").classList.remove("hide");
    var messageDiv = document.getElementById("nav_message");
    messageDiv.innerText = string;
    messageDiv.classList.remove("hide");

    setTimeout(function() { messageDiv.classList.add("hide"); }, 3000);
}

function hideMessage() {
    var messageDiv = document.getElementById("nav_message_container");
    messageDiv.classList.add("hide");
}

function readyButton() {
    var button = document.getElementById("build_button");
    button.classList.remove("dull");
    button.classList.remove("fade");
    
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
}`;

    var css_template_alt = `:root {
  --base-h: ${h};
  --base-s: ${s}%;
  --base-l: ${l}%;
  --base-tint: var(--white);
}`;

    var css_header = `/* A California Stylesheet (MIT License) */
/* https://github.com/casscss/cass */

:root {
  --base-h: ${h};
  --base-s: ${s}%;
  --base-l: ${l}%;
  --base-tint: var(--black);
`;

    var css_header_alt = `/* A California Stylesheet (MIT License) */
/* https://github.com/casscss/cass */

:root {
  --base-h: ${h};
  --base-s: ${s}%;
  --base-l: ${l}%;
  --base-tint: var(--white);
`;

    const deleteLines = (string, n = 1)=>{
        return string.replace(new RegExp(`(?:.*?\n){${n-1}}(?:.*?\n)`), '');
    };

    var rest_css = deleteLines(original_css, 8);

    if (l > 60) {
        document.getElementById('added_theme').innerHTML = css_template;
        document.getElementById('css_textarea').innerHTML = css_header + rest_css;

    } else {
        document.getElementById('added_theme').innerHTML = css_template_alt;
        document.getElementById('css_textarea').innerHTML = css_header_alt + rest_css;


    }



    

}