//get all the filenames from the fonts folder and their extensions
var fs = require('fs');
var path = require('path');
var fontDir = path.join(__dirname, '../fonts');
var fontFiles = fs.readdirSync(fontDir);
var fontNames = [];
fontFiles.forEach(function (file) {
    if(file !== "~BROMIUM")
      fontNames.push(file);
}
);
//for each filename create a font-face rule and add it to the css file
var css = '';
var counter = 0;
fontNames.forEach(function (fontName) {
    const fileNameWithOutExt = fontName.split('.')[0];
    css += `@font-face {
              font-family: "${fileNameWithOutExt}";
              src: url("../fonts/${fontName}");
             }`;

    css += `#label-input-tipo-${counter} {
            padding-left: 0.5em;
            font-size: large;
            font-family: "${fileNameWithOutExt}";
            }`

    counter++;
}
);

//minify the css without library
css = css.replace(/\s+/g, ' ').replace(/\s*([:;{}])\s*/g, '$1').replace(/;}/g, '}');

//with the fontname generate a file with the js info to append to a div
var js = '';
js += `var fontNames = [`;
fontNames.forEach(function (fontName) {
    js += `"${fontName.split('.')[0]}",`;
}
);
js += `];`;


fs.writeFileSync(path.join(__dirname, '../css/fonts.css'), css);
