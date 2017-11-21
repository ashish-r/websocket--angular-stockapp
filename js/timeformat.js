function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);
    
    var interval = Math.floor(seconds / 31536000);
    
    if (interval > 1) {
        return interval + " Years Ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " Months Ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " Days Ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " Hours Ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " Minutes Ago";
    }
    return " Just Now";
}


