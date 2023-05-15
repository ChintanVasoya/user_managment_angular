export function notifyAlert(type, msg) {
    notif({
        msg: msg,
        type: type,
        position: "center"
    });
}

export function addDownloadBtn(element, downloadButton, i) {
    console.log("ele", element);
    $(element).parent().find('.dz-preview:eq(' + i + ')').append(downloadButton)
}

