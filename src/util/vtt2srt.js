/* eslint-disable */
var vttRemoval = /(WEBVTT\s+)(\d{2}:)/mg;
var itemMatcher = /((\d{0}:)?\d{2}:\d{2})\.(\d{2,3}\s+)-->(\s+(\d{0,2}:)?\d{2}:\d{2})\.(\d{2,3}\s*)/mg;

function vtt2srt (vttString, separator) {
    separator = arguments.length === 2 ? separator : vtt2srt.separator;

    var srtString = vttString.replace(vttRemoval, '$2'); // removes VTT header
    var lineCounter = 0;

    srtString = srtString.replace(itemMatcher, function (match) {
        lineCounter++;
        console.log('lineCounter')

        return lineCounter + separator + match.replace(itemMatcher, '$1:$2$3-->$4:$5$6');
    });

    return srtString;
}

vtt2srt.separator = '\n';

export default vtt2srt
