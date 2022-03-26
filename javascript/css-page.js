
output = {};

document.addEventListener("DOMContentLoaded", function() {
    var base_color = "#4084dc";

    document.getElementById("baseColorLabel").innerHTML = base_color;
    document.getElementById("baseColor").value = base_color;
    // buildPage();
});

function renderLess() {

    // don't compile if the button is faded
    if (document.getElementById("build_button").classList.contains('fade')) {
        return false;
    }

    if (document.getElementById("headless_less_textarea")) {
        var headlessLessInput = document.getElementById("headless_less_textarea").value;
    } else {
        console.log('missing Less');
    }
    var baseColor = document.getElementById("baseColor").value;

    var lessTheme = "@base-color: " + baseColor + ";\n" + "@lighten-by: 16%;\n";

    var lessInputBasic = lessTheme + headlessLessInput;

    // var less_options = {
    //     env: "production",
    //     async: false,
    //     fileAsync: false,
    //     relativeUrls: true
    // };

    less.render(lessInputBasic)
        .then(function(output) {
            // output.css = string of css
            var theCSS = output.css;
            document.getElementById("css").innerHTML = theCSS;
            document.getElementById("css_textarea").innerHTML = theCSS;

            var buildButton = document.getElementById("build_button");
            buildButton.classList.add("fade");
            buildButton.classList.add("dull");
            buildButton.classList.add("no-press");
        },
        function(error) {
            console.log('something went wrong: ' + error);
        });
}

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

function copyLess() {
    var textToCopy = document.getElementById("less_textarea");
    console.log(textToCopy);
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
    console.log(stringToCopy);
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
        console.log('Oops, unable to copy');
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


// feenix

// document.getElementById('content').innerHTML =
//       marked.parse('# Marked in the browser\n\nRendered by **marked**.');

    // const page = {
    //     title: "A Feenix page",
    //     style: "relative white inner page width padding",
    //     sections: [
    //         {
    //             style: '',
    //             content: ''
    //         }
    //     ]
    // }

    var page = {
        title: "Test page",
        author: "Author name",
        description: "A description of the page",
        style: "relative inner type width padding",
        sections: [
            {
                style: 'very bright accent trim vertical-center golden viewport height reverse',
                content: '# This is the editor.'
            },
            {
                style: 'white bold trim',
                content: 'Add your own content here!'
            },
        ]
    }

    function prepend(value, array) {
      var newArray = array.slice();
      newArray.unshift(value);
      return newArray;
    }

    function editSection(section) {

        let section_id = section;

        let this_section = page.sections[section];

        const edit_view = `<div id="edit${section}" class="draft inner type width very dark base-color no-shadow absolute top left bottom right padding text-left medium no-bold" style="z-index: 100;">
                    
                    <label class="text-padding text-left force full width" for="edit${section}_style">This section has these classes:</label>
                    <input autocomplete="off" id="edit${section}_style" name="edit${section}_style" class="monospace margin-bottom full width force" type="text" value="${this_section.style}"/>
                    <label class="text-padding text-left force full width" for="edit${section}_content">This section has this content:</label>
                    <textarea id="edit${section}_content" class="full width force monospace" name="" style="min-height: 52%" id="">${this_section.content}</textarea>
                    <div class="text-right">
                        <button class="dark complement float-left" onclick="deleteSection(${section_id})">
                            Delete
                        </button>
                        
                        <button class="no-background no-border no-shadow text-margin-right" onclick="cancelEdits(${section_id})">
                            Cancel
                        </button>
                        <button class="accent" onclick="saveSection(${section_id})">
                            Save
                        </button>
                    </div>
                </div>`;

        const whats_there = document.getElementById('section'+section).innerHTML;
        
        document.getElementById('section'+section).innerHTML = edit_view + whats_there;
    }

    function editPage() {

      let this_page = page;

      const edit_view = `<div id="edit_page" class="draft fixed block inner type width very dark base-color border no-shadow absolute top left bottom right padding block vertical-center" style="z-index: 1000;">
                  
                <label class="small text-padding" for="edit_page_style">Each section has these classes:</label>
                <input autocomplete="off" id="edit_page_style" name="edit_page_style" class="monospace margin-bottom full width force" type="text" value="${this_page.style}">

                <hr class="gutter hella light brand-color">
                
                <label class="small text-padding" for="edit_page_title">This is the page's title:</label>
                <input id="edit_page_title" name="edit_page_title" class="full width force monospace margin-bottom" value="${this_page.title}"></input>

                <label class="small text-padding" for="edit_page_description">A brief description of the page:</label>
                <input id="edit_page_description" name="edit_page_description" class="full width force monospace margin-bottom" value="${this_page.description}"></input>
                <label class="small text-padding" for="edit_page_author">A brief author of the page:</label>
                <input id="edit_page_author" name="edit_page_author" class="full width force monospace margin-bottom" value="${this_page.author}"></input>

                  <div class="text-right">
                    <button class="no-background no-shadow no-border margin" onclick="cancelPageEdits()">
                          Cancel
                      </button>
                      <button class="huge padding text-padding-top text-padding-bottom dark brand-color" onclick="savePage()">
                          Save
                      </button>
                      
                  </div>
              </div>`;

      document.getElementById('page_editor').innerHTML = edit_view;
    }

    function cancelPageEdits() {
        document.getElementById("page_editor").innerHTML = '';
    }

    function cancelEdits(section) {
        document.getElementById("edit"+section).remove();
    }

    function whichSection() {
      console.log(document.querySelector("html").scrollTop);
      // this will use scrollTop to figure out which section the user is looking at

    }

    function addSection() {
      whichSection();
      console.log(page.sections);
      var new_page = page.sections;
      page.sections = prepend({ style: 'white', content: `Click "Edit" to edit this.

It's a simple **Markdown**-powered text field.

The field at the top lets you edit the **CASS** classes associated with this section. Click 'Help' to see which classes you can add.

- It
- Supports
- Lists

Use the output at the bottom of this page as a starting point for your own HTML.`}, new_page);
      
      buildPage();
      console.log(page.sections);
    }

    function moveSectionUp(section) {
      if (section > 0) {
        var arr = page.sections;
        var old_index = section;
        var new_index = section - 1;
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        buildPage();
      }
    };

    function moveSectionDown(section) {
      if (section < (page.sections.length - 1)) {
        var arr = page.sections;
        var old_index = section;
        var new_index = section + 1;
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        buildPage();
      }
    };

    function saveSection(section) {
        var sectionString = '';
        var sectionInner = '';

        const style = document.getElementById('edit'+section+'_style').value;
        const pre_content = document.getElementById('edit'+section+'_content').value;
        const markdown_content = marked.parse(pre_content);

        let section_id = section;

        let this_section = {
                style: style,
                content: pre_content
        };

        page.sections[section] = this_section;
        buildPage();

        return false;

    }

    function deleteSection(section) {
      page.sections.splice(section, 1);
      buildPage();
    }

    function savePage() {
        // var sectionString = '';
        // var sectionInner = '';
        // let word1 = document.getElementById('three_word_input1').value;
        // let word2 = document.getElementById('three_word_input2').value;
        // let word3 = document.getElementById('three_word_input3').value;

        // trip = [word1, word2, word3];

        const style = document.getElementById('edit_page_style').value;
        // const pre_content = document.getElementById('edit'+section+'_content').value;
        // const markdown_content = marked.parse(pre_content);

        // if (word1 !== "" && word2 !== "" && word3 !== "") {
        //   console.log(word1);
        //   console.log(word2);
        //   console.log(word3);
        //   console.log('saving...');
        // }

        page.style = style;

        // syncHHS([word1, word2, word3]);
        // getHHS();
        
        buildPage();

        document.getElementById('page_editor').innerHTML = '';

        return false;

    }

    function buildPage() {

      // render function
      // runs after every page change

        let sections = page.sections;
        
        var pageString = '';
        for (const key in sections) {
            if (sections.hasOwnProperty(key)) {
                let section_id = key;
                let this_section = sections[key];

                let section_content = this_section.content;
                let display_content = marked.parse(section_content);


                pageString += `<div id="section${section_id}_container">
    <section id="section${section_id}" class="${page.style} ${this_section.style}">
        ${display_content} 
    </section>
    <div class="small inner page width text-right relative padding-right padding-left" style="height: 0; top: -48px; z-index: 10;">
        <button class="medium sans-serif very dark base-color border no-shadow" onclick="editSection(${section_id})">Edit</button>&nbsp;
        <button class="medium sans-serif very dark base-color border no-shadow" onclick="moveSectionUp(${section_id})">&uarr;</button>&nbsp;
        <button class="medium sans-serif very dark base-color border no-shadow" onclick="moveSectionDown(${section_id})">&darr;</button>
    </div>
</div>
`;

            }
        }
        document.getElementById("output").innerHTML = '';
        document.getElementById("output").innerHTML = pageString;
        buildFinalHTML();

    }

    function buildFinalHTML() {

    // render function just for the product HTML

      let sections = page.sections;
      
      

      var page_title = page.page_title;
      var author_name = page.author_name;
      var page_description = page.page_description;

      var pageString = '';

      pageString += `<!DOCTYPE html>
<html lang="en"><head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <meta charset="utf-8">
  <title>${page_title}</title>
  <meta name="description" content="${page_description}">
  <meta name="author" content="${author_name}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body class="">
`;

      for (const key in sections) {
          if (sections.hasOwnProperty(key)) {
              let section_id = key;
              let this_section = sections[key];

              let section_content = this_section.content;
              let display_content = marked.parse(section_content);


              pageString += `<section id="section${section_id}" class="${page.style} ${this_section.style}">
${display_content}</section>
`;

      }
  }

  pageString += `<style>`;
  pageString += `</style>`;
  pageString += `</body></html>`;
  document.getElementById("textarea_output").innerHTML = pageString;

}