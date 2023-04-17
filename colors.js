(function listAllColors(
    outputFormat = "print", // or "data"
    exclude = [],
    knownColors = {}
) {

    function toHex(color) {

        const match = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/i);
        if (!match) {
            return color;
        }

        const [r, g, b, a] = match.slice(1).map((n, i) => (i === 3 ? parseFloat(n) : parseInt(n)));
        let hex = "#" + [r, g, b].map((c) => componentToHex(c)).join("");
        if (!isNaN(a)) {
            hex += componentToHex(Math.round(a * 255));
        }

        return hex;
    }

    function componentToHex(c) {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

    function addColor(color, element, where = "") {

        const colors = color.split(')').slice(0, -1).map(item => item.trim() + ')');
        for (const color of colors) {
            if (!color || exclude.includes(color) || exclude.includes(toHex(color))) return;

            const elementsData = colorsData.has(color) ? colorsData.get(color) : new Map();
            const placesData = elementsData.has(element) ? elementsData.get(element) : new Set();

            placesData.add(where);
            elementsData.set(element, placesData);
            colorsData.set(color, elementsData);
        }

    }

    function nameTheColor(color) {
        if (color.includes("rgb(")) color = toHex(color);
        if (Object.keys(knownColors).includes(color)) return knownColors[color] + " - ";
        return "";
    }

    const colorsData = new Map();
    for (const element of document.querySelectorAll("body, body *")) {

        addColor(getComputedStyle(element).color, element, "Font Color");
        addColor(getComputedStyle(element).backgroundColor, element, "Background Color");
        addColor(getComputedStyle(element).borderColor, element, "Border Color");
        addColor(getComputedStyle(element).outlineColor, element, "Outline Color");

    };


    if (outputFormat == "data") return colorsData;

    console.log('\n\n\n%c' + colorsData.size + ' COLOR' + (colorsData.size > 1 ? 'S' : '') + ' FOUND IN THIS PAGE \n', 'font-size: 30px; font-weight: bold;');

    for (const [color, elements] of colorsData) {
        console.groupCollapsed('%c  ', 'background: ' + color + ';', nameTheColor(color) + toHex(color) + ' - ' + color + ' - Found in ' + elements.size + ' element' + (elements.size > 1 ? 's' : ''));
        for (const [element, places] of elements) {
            console.log(Array.from(places).join(", ") + '\n', element);
            console.log('');
        }
        console.groupEnd();
        console.log('');
    }

    return colorsData.size + ' color' + (colorsData.size > 1 ? 's' : '') + ' found in this page';

})(
    "print", // Output format: print | data
    [ // Optional: List the colors you want to exclude
        "rgb(0, 0, 0)",
        "rgba(0, 0, 0, 0)",
        "rgb(255, 255, 255)",
    ],
    { // Optional: Give your known colors names (Shows up with "print" option)
        "#08317e": "Catalina Blue",
        "#1d1c29": "Steel Gray",
    }
);